using BuyTogether.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace BuyTogether.Server.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Property> Properties { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<GroupMember> GroupMembers { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Ownership> Ownerships { get; set; }
        public DbSet<UserNotification> UserNotifications { get; set; }
        public DbSet<Deal> Deals { get; set; }
        public DbSet<DealGroup> DealGroups { get; set; }
        public DbSet<DealGroupMember> DealGroupMembers { get; set; }
        public DbSet<Order> Orders { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            // Ensures Email uniqueness
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            // Apply specific configurations
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);

            modelBuilder.Entity<Property>()
                .HasOne(property => property.Owner)
                .WithMany()
                .HasForeignKey(property => property.OwnerId);

            // Configure Booking relationships to prevent multiple cascade paths
            modelBuilder.Entity<Booking>()
                .HasOne(b => b.Property)
                .WithMany()
                .HasForeignKey(b => b.PropertyId)
                .OnDelete(DeleteBehavior.Restrict);

            // Configure GroupMember relationships to prevent cycles with User
            modelBuilder.Entity<GroupMember>()
                .HasOne(gm => gm.User)
                .WithMany()
                .HasForeignKey(gm => gm.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<GroupMember>()
                .HasIndex(gm => new { gm.GroupId, gm.UserId })
                .IsUnique();

            // Configure Payment relationships to prevent cycles with User
            modelBuilder.Entity<Payment>()
                .HasOne(p => p.User)
                .WithMany()
                .HasForeignKey(p => p.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Payment>()
                .HasIndex(p => new { p.GroupId, p.UserId })
                .IsUnique();

            modelBuilder.Entity<Ownership>()
                .HasOne(ownership => ownership.Buyer)
                .WithMany()
                .HasForeignKey(ownership => ownership.BuyerId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Ownership>()
                .HasOne(ownership => ownership.Property)
                .WithMany()
                .HasForeignKey(ownership => ownership.PropertyId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Ownership>()
                .HasOne(ownership => ownership.Group)
                .WithMany(group => group.Ownerships)
                .HasForeignKey(ownership => ownership.GroupId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Ownership>()
                .HasIndex(ownership => new { ownership.GroupId, ownership.BuyerId })
                .IsUnique();

            modelBuilder.Entity<UserNotification>()
                .HasOne(notification => notification.User)
                .WithMany()
                .HasForeignKey(notification => notification.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<UserNotification>()
                .HasIndex(notification => new { notification.UserId, notification.CreatedAt });

            // Group Buying Configurations
            modelBuilder.Entity<DealGroupMember>()
                .HasOne(dgm => dgm.User)
                .WithMany()
                .HasForeignKey(dgm => dgm.UserId)
                .OnDelete(DeleteBehavior.Restrict);
            
            modelBuilder.Entity<DealGroupMember>()
                .HasIndex(dgm => new { dgm.DealGroupId, dgm.UserId })
                .IsUnique();

            modelBuilder.Entity<Order>()
                .HasOne(o => o.User)
                .WithMany()
                .HasForeignKey(o => o.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Order>()
                .HasOne(o => o.DealGroup)
                .WithMany()
                .HasForeignKey(o => o.DealGroupId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Order>()
                .HasOne(o => o.Deal)
                .WithMany()
                .HasForeignKey(o => o.DealId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
