using System;
using System.Timers;
using Microsoft.Extensions.DependencyInjection;

namespace SkateSpot.Application.Utility
{
	public class VerificationTimer : Timer
	{
		public Guid OwnerId { get; set; }
		public IServiceScopeFactory ScopeFactory { get; set; }
		public Action<IServiceScope, Guid> OnTimerElapsed { get; set; }

		public static void StartNewVerificationTimer(double startAfterMs, Guid spotId, Action<IServiceScope, Guid> onTimerElapsed, IServiceScopeFactory scopeFactory)
		{
			var spotVerificationTimer = new VerificationTimer
			{
				Interval = startAfterMs,
				AutoReset = false,
				OwnerId = spotId,
				ScopeFactory = scopeFactory,
				OnTimerElapsed = onTimerElapsed
			};
			spotVerificationTimer.Elapsed += (source, args) =>
			spotVerificationTimer.Start();
		}

		private void OnTimerElapsedWrapper(object source, ElapsedEventArgs e)
		{
			var verificationTimer = (VerificationTimer)source;

			using (var scope = verificationTimer.ScopeFactory.CreateScope())
			{
				verificationTimer.OnTimerElapsed(scope, verificationTimer.OwnerId);
			}

			verificationTimer.Stop();
			verificationTimer.Dispose();
		}
	}
}