using Microsoft.EntityFrameworkCore;
using PBS.Domain;

namespace PBS.Persistence
{
    public class AppDbContext : DbContext
    {
        public DbSet<Availability> Availabilities { get; set; }
        public DbSet<Appointment> Appointments { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        // Optional: configure model further
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // Configure your entities here if needed
        }
    }
}
