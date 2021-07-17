using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;

namespace SkateSpot.Api.Extensions
{
	public static class ObjectExtensions
	{
		public static string JsonStringify(this object obj)
		{
			return JsonConvert.SerializeObject(
				obj,
				new JsonSerializerSettings
				{
					Formatting = Formatting.Indented,
					ContractResolver = new DefaultContractResolver
					{
						NamingStrategy = new CamelCaseNamingStrategy(),
						
					},
					Converters = new JsonConverter[] {new StringEnumConverter()}
				}			
			);
		}
	}
}
