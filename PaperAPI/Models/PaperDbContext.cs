using Microsoft.EntityFrameworkCore;

namespace PaperAPI.Models;

public partial class PaperDbContext : DbContext
{
    public PaperDbContext(DbContextOptions<PaperDbContext> options) : base(options) { }

    public virtual DbSet<Customer> Customers { get; set; }
    public virtual DbSet<Order> Orders { get; set; }
    public virtual DbSet<OrderEntry> OrderEntries { get; set; }
    public virtual DbSet<Paper> Papers { get; set; }
    public virtual DbSet<Property> Properties { get; set; }
    public virtual DbSet<PaperProperty> PaperProperties { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Customer>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("customers_pkey");
        });

        modelBuilder.Entity<Paper>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("paper_pkey");
        });

        modelBuilder.Entity<Property>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("properties_pkey");
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("orders_pkey");

            entity.Property(e => e.OrderDate).HasDefaultValueSql("CURRENT_TIMESTAMP");
            entity.Property(e => e.Status).HasDefaultValueSql("'pending'::character varying");

            entity.HasOne(d => d.Customer).WithMany(p => p.Orders)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("orders_customer_id_fkey");
        });

        modelBuilder.Entity<OrderEntry>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("order_entries_pkey");

            entity.HasOne(d => d.Order)
                .WithMany(p => p.OrderEntries)
                .HasConstraintName("order_entries_order_id_fkey");

            entity.HasOne(d => d.Product)
                .WithMany(p => p.OrderEntries)
                .HasConstraintName("order_entries_product_id_fkey");
        });

        modelBuilder.Entity<PaperProperty>(entity =>
        {
            entity.HasKey(e => new { e.PaperId, e.PropertyId }).HasName("paper_properties_pkey");

            entity.HasOne(d => d.Paper)
                .WithMany(p => p.PaperProperties)
                .HasForeignKey(d => d.PaperId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("paper_properties_paper_id_fkey");

            entity.HasOne(d => d.Property)
                .WithMany(p => p.PaperProperties)
                .HasForeignKey(d => d.PropertyId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("paper_properties_property_id_fkey");
        });
    }
}
