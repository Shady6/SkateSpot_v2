using System;
using System.Linq;
using System.Reflection;
using Microsoft.AspNetCore.Mvc.Filters;
using SkateSpot.Api.Extensions;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;

namespace SkateSpot.Api.Attributes
{
	public class MapsRouteArgumentsIntoBodyAttribute : ActionFilterAttribute
	{
		public Type ObjectToMapToType { get; set; }

		public MapsRouteArgumentsIntoBodyAttribute(Type objectToMapToType)
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
					prop.SetValue(requestCommand.Value, actionArgument.Value, null);
				}
			}
			var userIdProp = ObjectToMapToType.GetProperty("UserId");
			if (userIdProp != null)
				userIdProp.SetValue(requestCommand.Value, filterContext.HttpContext.User.GetUserId());
			filterContext.ActionArguments["request"] = requestCommand.Value;
		}
	}
}