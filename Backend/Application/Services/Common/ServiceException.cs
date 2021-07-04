using System;

namespace SkateSpot.Application.Services.Common
{
	public class ServiceException : Exception
	{
		public readonly ServiceErrorCode ErrorCode;

		public ServiceException(ServiceErrorCode errorCode, string message, params object[] args)
			: this(errorCode, message, null, args)
		{
		}

		public ServiceException(ServiceErrorCode errorCode, string message, Exception innerException, params object[] args)
			: base(string.Format(message, args), innerException)
		{
			ErrorCode = errorCode;
		}
	}
}