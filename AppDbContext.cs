using HealthCompass.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace HealthCompass
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Admin> Admins { get; set; }
        public DbSet<Patient> Patients { get; set; }
    }
}
