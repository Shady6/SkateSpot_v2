using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using SkateSpot.Application.DTOs.Mail;
using SkateSpot.Application.DTOs.Settings;
using System.Net;
using System.Net.Mail;

namespace SkateSpot.Infrastructure.Shared.Services
{
	public class SMTPMailService : Application.Interfaces.Shared.IMailService
	{
		public MailSettings _mailSettings { get; }
		public ILogger<SMTPMailService> _logger { get; }

		public SMTPMailService(IOptions<MailSettings> mailSettings, ILogger<SMTPMailService> logger)
		{
			_mailSettings = mailSettings.Value;
			_logger = logger;
		}

		public void Send(MailRequest request)
		{
			try
			{
				SmtpClient smtp = new SmtpClient
				{
					Host = _mailSettings.Host,
					Port = 587,
					EnableSsl = true,
					DeliveryMethod = SmtpDeliveryMethod.Network,
					UseDefaultCredentials = false,
					Credentials = new NetworkCredential(_mailSettings.From, _mailSettings.Password)
				};

				var fromAddress = new MailAddress(_mailSettings.From, _mailSettings.DisplayName);
				var toAddress = new MailAddress(request.To, request.To);
				using (var message = new MailMessage(fromAddress, toAddress)
				{
					Subject = request.Subject,
					Body = request.Body,
				})
				{
					smtp.Send(message);
				}
			}
			catch (System.Exception ex)
			{
				_logger.LogError(ex.Message, ex);
			}
		}
	}
}