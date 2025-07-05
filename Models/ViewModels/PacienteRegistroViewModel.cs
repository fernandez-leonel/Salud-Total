using System.ComponentModel.DataAnnotations;

namespace SaludTotalWeb.Models.ViewModels
{
    public class PacienteRegistroViewModel
    {
        [Required]
        public string Nombre { get; set; }

        [Required]
        public string Apellido { get; set; }

        [Required]
        public string DNI { get; set; }

        [Required]
        [DataType(DataType.Date)]
        public DateTime FechaNacimiento { get; set; }

        [Required]
        public string Sexo { get; set; }

        [Required]
        public string Direccion { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Telefono { get; set; }

        // Datos de cobertura
        public string Obra_Social { get; set; }
        public string Numero_Afiliado { get; set; }

        // Estado de salud (opcional)
        public string Enfermedades { get; set; }
        public string Alergias { get; set; }
        public string Medicacion { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Contraseña { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Compare("Contraseña", ErrorMessage = "Las contraseñas no coinciden.")]
        public string ConfirmarContraseña { get; set; }

        [Required(ErrorMessage = "El nombre de usuario es obligatorio")]
        [Display(Name = "Usuario")]
        public string Username { get; set; }

    }
}
