using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace SaludTotalWeb.Models
{
    public class Paciente
    {
        [Key]
        public int Id_paciente { get; set; }

        [Required]
        public string Dni { get; set; }

        [Required]
        public string Nombre { get; set; }

        [Required]
        public string Apellido { get; set; }

        [Required]
        public string Telefono { get; set; }

        [EmailAddress]
        public string Email { get; set; }

        public string Direccion { get; set; }

        public DateTime? Fecha_Nacimiento { get; set; }

        public string Sexo { get; set; }

        // Nuevos campos agregados:
        public string Obra_Social { get; set; }

        public string Numero_Afiliado { get; set; }

        public string Enfermedades { get; set; }

        public string Alergias { get; set; }

        public string Medicacion { get; set; }

        public string Password_Hash { get; set; }

        public ICollection<Turno> Turnos { get; set; }
        [Required]
        [Display(Name = "Usuario")]
        public string Username { get; set; }  // nuevo campo para iniciar sesión

    }
}


