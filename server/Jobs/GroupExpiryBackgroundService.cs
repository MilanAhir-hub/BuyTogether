// BACKGROUND SERVICE: This class runs continuously in the background. 
// It checks the database every minute to see if any deal groups have reached 
// their expiration date and automatically marks them as 'Expired'.
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using BuyTogether.Server.Data;
using Microsoft.AspNetCore.SignalR;
using BuyTogether.Server.Hubs;

namespace BuyTogether.Server.Jobs
{
    public class GroupExpiryBackgroundService : BackgroundService
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly IHubContext<GroupHub> _hubContext;

        public GroupExpiryBackgroundService(IServiceProvider serviceProvider, IHubContext<GroupHub> hubContext)
        {
            _serviceProvider = serviceProvider;
            _hubContext = hubContext;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                await ProcessExpiredGroupsAsync();
                
                // Run every minute
                await Task.Delay(TimeSpan.FromMinutes(1), stoppingToken);
            }
        }

        private async Task ProcessExpiredGroupsAsync()
        {
            // Since DbContext is scoped, we must create a scope in a BackgroundService
            using var scope = _serviceProvider.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

            var now = DateTime.UtcNow;

            // Find groups that are still "waiting" but their expiry time has passed
            var expiredGroups = await context.DealGroups
                .Where(g => g.Status == "waiting" && g.ExpiresAt <= now)
                .ToListAsync();

            if (!expiredGroups.Any())
                return;

            foreach (var group in expiredGroups)
            {
                group.Status = "expired";
                // E.g., cancel related pending reservations if we added them

                _ = _hubContext.Clients.Group(group.DealId.ToString())
                   .SendAsync("GroupExpired", new { dealId = group.DealId });
            }

            await context.SaveChangesAsync();
        }
    }
}
