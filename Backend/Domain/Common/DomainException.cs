using System;

namespace SkateSpot.Domain.Common
{
	public class DomainException : Exception
	{
		public readonly DomainErrorCode ErrorCode;

		public DomainException(DomainErrorCode errorCode, string message, params object[] args)
			: this(errorCode, message, null, args)
		{

		}

		public DomainException(DomainErrorCode errorCode, string message, Exception innerException, params object[] args)
			: base(string.Format(message, args), innerException)
		{
			ErrorCode = errorCode;
		}
	}
}