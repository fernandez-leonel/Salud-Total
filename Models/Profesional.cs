using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SaludTotalWeb.Models
{
    public class Profesional
    {
        [Key]
        public int Id_Profesional { get; set; }

        [Required]
        public string Dni { get; set; }

        [Required]
        public string Matricula { get; set; }

        [Required]
        public string Nombre { get; set; }

        [Required]
        public string Apellido { get; set; }

        [Required]
        public string Telefono { get; set; }

        [Required]
        public string? Email { get; set; }

        public string? Direccion { get; set; }

        public DateTime? Fecha_Nacimiento { get; set; }

        public string? Sexo { get; set; }

        [ForeignKey("Especialidad")]
        public int Id_Especialidad { get; set; }
        public Especialidad Especialidad { get; set; }

        public bool Disponibilidad { get; set; } = true;

        public ICollection<Turno> Turnos { get; set; }
    }
}


