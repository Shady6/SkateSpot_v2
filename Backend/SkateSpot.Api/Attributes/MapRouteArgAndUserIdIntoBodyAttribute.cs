using Microsoft.AspNetCore.Mvc.Filters;
using SkateSpot.Api.Extensions;
using System;
using System.Linq;
using System.Reflection;

namespace SkateSpot.Api.Attributes
{
	public class MapRouteArgAndUserIdIntoBodyAttribute : ActionFilterAttribute
	{
		public Type ObjectToMapToType { get; set; }

		public MapRouteArgAndUserIdIntoBodyAttribute(Type objectToMapToType)
		{
			ObjectToMapToType = objectToMapToType;
		}

		public override void OnActionExecuting(ActionExecutingContext filterContext)
		{
			var actionArguments = filterContext.ActionArguments;
			var requestCommand = actionArguments.First(a => a.Key == "request");

			foreach (var actionArgument in actionArguments)
			{
				if (actionArgument.Key != requestCommand.Key)
				{
					PropertyInfo prop = ObjectToMapToType.GetProperty(actionArgument.Key.FirstCharToUpper());
					if (prop == null) prop = ObjectToMapToType.GetProperty(actionArgument.Key);
					prop.SetValue(requestCommand.Value, actionArgument.Value, null);
				}
			}
			var userIdProp = ObjectToMapToType.GetProperty("UserId");
			if (userIdProp != null)
				userIdProp.SetValue(requestCommand.Value, filterContext.HttpContext.User.GetId());
			filterContext.ActionArguments["request"] = requestCommand.Value;
		}
	}
}