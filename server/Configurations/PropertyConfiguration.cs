using BuyTogether.Server.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BuyTogether.Server.Configurations
{
    public class PropertyConfiguration : IEntityTypeConfiguration<Property>
    {
        public void Configure(EntityTypeBuilder<Property> builder)
        {
            builder.ToTable("Properties");

            builder.HasKey(p => p.Id);

            builder.Property(p => p.Title)
                .IsRequired()
                .HasMaxLength(200);

            builder.Property(p => p.Location)
                .IsRequired()
                .HasMaxLength(150);

            builder.Property(p => p.Price)
                .HasPrecision(18, 2);

            // Indexes for performance
            builder.HasIndex(p => p.Location);
            builder.HasIndex(p => p.Price);
            builder.HasIndex(p => p.CreatedAt);

            // Configure relationship: Property -> GroupMembers (One-to-Many)
            builder.HasMany(p => p.GroupMembers)
                .WithOne(g => g.Property)
                .HasForeignKey(g => g.PropertyId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
