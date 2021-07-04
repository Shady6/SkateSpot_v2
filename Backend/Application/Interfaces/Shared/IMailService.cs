using SkateSpot.Application.DTOs.Mail;
using System.Threading.Tasks;

namespace SkateSpot.Application.Interfaces.Shared
{
	public interface IMailService
	{
		void Send(MailRequest request);
	}
}