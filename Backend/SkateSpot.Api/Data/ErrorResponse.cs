using Newtonsoft.Json;
using SkateSpot.Domain.Common;
using System.Collections.Generic;

namespace SkateSpot.Api.Data
{
	public class ErrorResponse
	{
		public ErrorCode StatusCode { get; set; }
		public string Message { get; set; }
		public string DeveloperMessage { get; set; }
		public IDictionary<string, string> Data { get; set; }

		public override string ToString()
		{
			return JsonConvert.SerializeObject(
				this,
				Formatting.Indented,
				new Newtonsoft.Json.Converters.StringEnumConverter());
		}
	}
}
