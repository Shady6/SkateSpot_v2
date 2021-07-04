using System;
using System.Linq;

namespace SkateSpot.Api.Extensions
{
	public static class StringExtensions
	{
		public static string FirstCharToUpper(this string input) =>
		input switch
		{
			null => throw new ArgumentNullException(nameof(input)),
			"" => throw new ArgumentException($"{nameof(input)} cannot be empty", nameof(input)),
			_ => input.First().ToString().ToUpper() + input.Substring(1)
		};

		public static string ToCamelCase(this string value)
		{
			if (string.IsNullOrEmpty(value)) return value;
			return char.ToLowerInvariant(value[0]) + value.Substring(1);
		}

	}
}