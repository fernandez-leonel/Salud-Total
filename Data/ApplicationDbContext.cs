using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
namespace SaludTotalWeb.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Paciente> Pacientes { get; set; }
        public DbSet<Especialidad> Especialidades { get; set; }
        public DbSet<Profesional> Profesionales { get; set; }
        public DbSet<Turno> Turnos { get; set; }
        public DbSet<Contacto> Contactos { get; set; }
       

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

          

            // Para que no haya problemas con el tipo ENUM de sexo y estado
            modelBuilder.Entity<Paciente>()
                .Property(p => p.Sexo)
                .HasConversion<string>();

            modelBuilder.Entity<Profesional>()
                .Property(p => p.Sexo)
                .HasConversion<string>();

            modelBuilder.Entity<Turno>()
                .Property(t => t.Estado)
                .HasConversion<string>();
        }
    }
}
