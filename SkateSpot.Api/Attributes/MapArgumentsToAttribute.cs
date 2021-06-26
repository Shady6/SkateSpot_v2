using System;
using System.Linq;
using System.Reflection;
using MediatR;
using Microsoft.AspNetCore.Mvc.Filters;
using SkateSpot.Api.Extensions;

namespace SkateSpot.Api.Attributes
{
	public class MapArgumentsToAttribute : ActionFilterAttribute
	{
		public Type ObjectToMapToType { get; set; }

		public MapArgumentsToAttribute(Type objectToMapToType)
		{
			ObjectToMapToType = objectToMapToType;
		}

		public override void OnActionExecuting(ActionExecutingContext filterContext)
		{
			var actionArguments = filterContext.ActionArguments;
			var requestCommand = actionArguments.First(a => a.Value is IRequest);

			foreach (var actionArgument in actionArguments)
			{
				if (actionArgument.Key != requestCommand.Key)
				{
					PropertyInfo prop = ObjectToMapToType.GetProperty(actionArgument.Key.FirstCharToUpper());
					prop.SetValue(requestCommand.Value, actionArgument.Value, null);
				}
			}
			filterContext.ActionArguments["request"] = requestCommand.Value;
		}
	}
}