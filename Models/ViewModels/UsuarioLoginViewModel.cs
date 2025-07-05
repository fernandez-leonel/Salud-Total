using System.ComponentModel.DataAnnotations;

namespace SaludTotalWeb.Models.ViewModels
{
    public class UsuarioLoginViewModel
    {
        [Required]
        [Display(Name = "Usuario o email")]
        public string UsernameOrEmail { get; set; }

        [Required]
        [Display(Name = "Contraseña")]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}



