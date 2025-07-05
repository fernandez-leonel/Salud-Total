using System;
using System.ComponentModel.DataAnnotations;

namespace SaludTotalWeb.Models.ViewModels
{
    public class TurnoViewModel
    {
        // Datos del paciente
        [Required]
        public string Nombre { get; set; }

        [Required]
        public string Apellido { get; set; }

        [Required]
        public string DNI { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Telefono { get; set; }

        // Datos del turno
        [Required]
        public int Id_Profesional { get; set; }

        [Required]
        [DataType(DataType.DateTime)]
        [Display(Name = "Fecha y Hora del Turno")]
        public DateTime Fecha_Hora { get; set; }

        public string Motivo_Consulta { get; set; }
    }
}
