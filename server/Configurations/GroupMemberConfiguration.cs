using BuyTogether.Server.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BuyTogether.Server.Configurations
{
    public class GroupMemberConfiguration : IEntityTypeConfiguration<GroupMember>
    {
        public void Configure(EntityTypeBuilder<GroupMember> builder)
        {
            builder.ToTable("GroupMembers");

            builder.HasKey(g => g.Id);

            builder.HasIndex(g => g.PropertyId);
            builder.HasIndex(g => g.UserId);

            // Prevent duplicate entries for the same user joining the same property group
            builder.HasIndex(g => new { g.PropertyId, g.UserId }).IsUnique();

            builder.HasOne(g => g.User)
                .WithMany()
                .HasForeignKey(g => g.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
