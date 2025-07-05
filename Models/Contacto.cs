using System.ComponentModel.DataAnnotations;

namespace SaludTotalWeb.Models
{
    public class Contacto
    {
        public int Id { get; set; }

        [Required]
        public string Nombre { get; set; }

        [Required, EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Mensaje { get; set; }

        public DateTime Fecha { get; set; } = DateTime.Now;
    }
}

