using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SaludTotalWeb.Models
{
    public class Especialidad
    {
        [Key]
        public int Id_Especialidad { get; set; }

        [Required]
        public string Nombre { get; set; }

        public ICollection<Profesional> Profesionales { get; set; }
    }
}

