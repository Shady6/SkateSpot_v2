using System;
using System.Collections.Generic;

namespace SkateSpot.Domain.Common
{
	public class AppException : Exception
	{
		public readonly ErrorCode ErrorCode;
		public new readonly IDictionary<string, string> Data;

		public AppException(ErrorCode errorCode, string message, params object[] args)
			: this(errorCode, message, null, args)
		{

		}

		public AppException(ErrorCode errorCode, string message, Exception innerException, params object[] args)
			: base(string.Format(message, args), innerException)
		{
			ErrorCode = errorCode;
		}

		public AppException(ErrorCode errorCode, string message, IDictionary<string, string> data, Exception innerException, params object[] args)
			: this(errorCode, message, innerException, args)
		{
			Data = data;
		}
	}
}