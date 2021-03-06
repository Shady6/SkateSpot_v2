using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using SkateSpot.Application.DTOs.Identity;
using SkateSpot.Application.DTOs.Settings;
using SkateSpot.Application.Enums;
using SkateSpot.Application.Interfaces;
using SkateSpot.Application.Interfaces.Repositories;
using SkateSpot.Domain.Common;
using SkateSpot.Domain.Models;
using SkateSpot.Infrastructure.Identity.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace SkateSpot.Infrastructure.Identity.Services
{
    public class IdentityService : IIdentityService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly JWTSettings _jwtSettings;
        private readonly IUserRepository _userRepository;
        private readonly ITokenManager _tokenManager;

        public IdentityService(UserManager<ApplicationUser> userManager,
                         RoleManager<IdentityRole> roleManager,
                         IOptions<JWTSettings> jwtSettings,
                         SignInManager<ApplicationUser> signInManager,
                         IUserRepository userRepository, ITokenManager tokenManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _jwtSettings = jwtSettings.Value;
            _signInManager = signInManager;
            _userRepository = userRepository;
            _tokenManager = tokenManager;
        }

        public async Task<TokenResponse> GetTokenAsync(TokenRequest request, string ipAddress)
        {
            var user = await _userManager.FindByEmailAsync(request.Email);
            if (user == null)
                throw new AppException(ErrorCode.BAD_INPUT, $"Email or password wrong.");
            var result = await _signInManager.PasswordSignInAsync(user.UserName, request.Password, false, lockoutOnFailure: false);
            // TODO
            // uncomment this if in production
            //if (!user.EmailConfirmed)
            //	throw new AppException(ErrorCode.EMAIL_NOT_VERIFIED, $"Email is not confirmed for '{request.Email}'.");
            //if (!user.IsActive)
            //	throw new Exception($"Account for '{request.Email}' is not active. Please contact the Administrator.");
            if (!result.Succeeded)
                throw new AppException(ErrorCode.BAD_INPUT, $"Email or password wrong.");
            JwtSecurityToken jwtSecurityToken = await GenerateJWToken(user, ipAddress);
            var response = new TokenResponse();
            response.Id = user.Id;
            response.JWToken = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);
            response.IssuedOn = jwtSecurityToken.ValidFrom.ToLocalTime();
            response.ExpiresOn = jwtSecurityToken.ValidTo.ToLocalTime();
            response.Email = user.Email;
            response.UserName = user.UserName;
            var rolesList = await _userManager.GetRolesAsync(user).ConfigureAwait(false);
            response.Roles = rolesList.ToList();
            response.IsVerified = user.EmailConfirmed;
            var refreshToken = GenerateRefreshToken(ipAddress);
            response.RefreshToken = refreshToken.Token;

            return response;
        }

        public async Task Logout()
        {
            await _tokenManager.DeactivateCurrentAsync();
        }

        private async Task<JwtSecurityToken> GenerateJWToken(ApplicationUser user, string ipAddress)
        {
            var userClaims = await _userManager.GetClaimsAsync(user);
            var roles = await _userManager.GetRolesAsync(user);
            var roleClaims = new List<Claim>();
            for (int i = 0; i < roles.Count; i++)
            {
                roleClaims.Add(new Claim("roles", roles[i]));
            }
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim("uid", user.Id),
                new Claim("ip", ipAddress)
            }
            .Union(userClaims)
            .Union(roleClaims);
            return JWTGeneration(claims);
        }

        private JwtSecurityToken JWTGeneration(IEnumerable<Claim> claims)
        {
            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Key));
            var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);

            var jwtSecurityToken = new JwtSecurityToken(
                issuer: _jwtSettings.Issuer,
                audience: _jwtSettings.Audience,
                claims: claims,
                notBefore: DateTime.UtcNow,
                expires: DateTime.UtcNow.AddMinutes(_jwtSettings.DurationInMinutes),
                signingCredentials: signingCredentials);
            return jwtSecurityToken;
        }

        private string RandomTokenString()
        {
            using var rngCryptoServiceProvider = new RNGCryptoServiceProvider();
            var randomBytes = new byte[40];
            rngCryptoServiceProvider.GetBytes(randomBytes);
            // convert random bytes to hex string
            return BitConverter.ToString(randomBytes).Replace("-", "");
        }

        private RefreshToken GenerateRefreshToken(string ipAddress)
        {
            return new RefreshToken
            {
                Token = RandomTokenString(),
                Expires = DateTime.UtcNow.AddDays(7),
                Created = DateTime.UtcNow,
                CreatedByIp = ipAddress
            };
        }

        public async Task<string> RegisterAsync(RegisterRequest request, string origin)
        {
            ValidateRegisterRequest(request);
            var userWithSameUserName = await _userManager.FindByNameAsync(request.UserName);
            if (userWithSameUserName != null)
            {
                throw new AppException(ErrorCode.BAD_INPUT, $"Username '{request.UserName}' is already taken.");
            }
            var user = new ApplicationUser
            {
                Id = Guid.NewGuid().ToString(),
                Email = request.Email,
                UserName = request.UserName
            };
            var userWithSameEmail = await _userManager.FindByEmailAsync(request.Email);
            if (userWithSameEmail == null)
            {
                var result = await _userManager.CreateAsync(user, request.Password);
                if (result.Succeeded)
                {
                    await _userManager.AddToRoleAsync(user, Roles.Basic.ToString());
                    var verificationUri = await CreateVerificationUri(user, origin);

                    await _userRepository.AddAsync(new User(Guid.Parse(user.Id), user.Email, user.UserName));
                    await _userRepository.SaveChangesAsync();
                    return $"{user.Id} Account Confirmed for {user.Email}. You can now use the /api/identity/token endpoint to generate JWT.";
                    // TODO Uncomment when in production
                    //_mailService.Send(new MailRequest() { To = user.Email, Body = $"Please confirm your account by <a href='{verificationUri}'>clicking here</a>.", Subject = "Confirm Registration" });
                    //return verificationUri;
                }
                else
                {
                    throw new AppException(ErrorCode.BAD_INPUT, $"{string.Join('\n', result.Errors.Select(e => e.Description))}");
                }
            }
            else
            {
                throw new AppException(ErrorCode.BAD_INPUT, $"Email {request.Email } is already registered.");
            }
        }

        public void ValidateRegisterRequest(RegisterRequest req)
        {
            if (!IsValidEmail(req.Email)) throw new AppException(ErrorCode.BAD_INPUT, "Incorrect email");
            if (req.Password != req.ConfirmPassword) throw new AppException(ErrorCode.BAD_INPUT, "Passwords don't match");
            if (req.Password == null || req.Password.Length < 6) throw new AppException(ErrorCode.BAD_INPUT, "Password has to be at least 6 characters long");
            if (req.UserName == null || req.UserName.Length < 3) throw new AppException(ErrorCode.BAD_INPUT, "Username has to be at least 3 characters long");
        }

        private bool IsValidEmail(string email)
        {
            if (email.Trim().EndsWith(".")) return false;
            try
            {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }
        }

        private async Task<string> CreateVerificationUri(ApplicationUser user, string origin)
        {
            var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            code = WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(code));
            var route = "api/identity/confirm-email/";
            var _enpointUri = new Uri(string.Concat($"localhost:44309/", route));
            var verificationUri = QueryHelpers.AddQueryString(_enpointUri.ToString(), "userId", user.Id);
            verificationUri = QueryHelpers.AddQueryString(verificationUri, "code", code);
            //Email Service Call Here
            return verificationUri;
        }

        public async Task<string> ConfirmEmailAsync(string userId, string code)
        {
            var user = await _userManager.FindByIdAsync(userId);
            code = Encoding.UTF8.GetString(WebEncoders.Base64UrlDecode(code));
            var result = await _userManager.ConfirmEmailAsync(user, code);
            if (result.Succeeded)
            {
                await _userRepository.AddAsync(new User(Guid.Parse(user.Id), user.Email, user.UserName));
                await _userRepository.SaveChangesAsync();
                return $"{user.Id} Account Confirmed for {user.Email}. You can now use the /api/identity/token endpoint to generate JWT.";
            }
            else
            {
                throw new Exception($"An error occured while confirming {user.Email}.");
            }
        }

        public async Task ForgotPassword(ForgotPasswordRequest model, string origin)
        {
            var account = await _userManager.FindByEmailAsync(model.Email);

            // always return ok response to prevent email enumeration
            if (account == null) return;

            var code = await _userManager.GeneratePasswordResetTokenAsync(account);
            var route = "api/identity/reset-password/";
            var _enpointUri = new Uri(string.Concat($"{origin}/", route));
            //var emailRequest = new MailRequest()
            //{
            //    Body = $"You reset token is - {code}",
            //    To = model.Email,
            //    Subject = "Reset Password",
            //};
            //_mailService.Send(emailRequest);
        }

        public async Task<string> ResetPassword(ResetPasswordRequest model)
        {
            var account = await _userManager.FindByEmailAsync(model.Email);
            if (account == null) throw new Exception($"No Accounts Registered with {model.Email}.");
            var result = await _userManager.ResetPasswordAsync(account, model.Token, model.Password);
            if (result.Succeeded)
            {
                //return Result<string>.Success(model.Email, message: $"Password Resetted.");
                return $"{model.Email} Password Resetted.";
            }
            else
            {
                throw new Exception($"Error occured while reseting the password.");
            }
        }
    }
}