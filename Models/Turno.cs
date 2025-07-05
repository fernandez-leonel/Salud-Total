using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SaludTotalWeb.Models
{
    public class Turno
    {
        [Key]
        public int Id_Turno { get; set; }

        [ForeignKey("Paciente")]
        public int Id_Paciente { get; set; }
        public Paciente Paciente { get; set; }

        [ForeignKey("Profesional")]
        public int Id_Profesional { get; set; }
        public Profesional Profesional { get; set; }

        [Required]
        [Display(Name = "Fecha y Hora del Turno")]
        public DateTime Fecha_Hora { get; set; }

        [Required]
        public string? Estado { get; set; } = "En espera";  // Default

        [Display(Name = "Motivo de la Consulta")]
        public string? Motivo_Consulta { get; set; }

        [Display(Name = "Motivo de Cancelación")]
        public string? Motivo_Cancelacion { get; set; }

        
    }
}

