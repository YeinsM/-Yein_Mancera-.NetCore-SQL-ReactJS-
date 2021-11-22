using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    public class Department
    {
        public int Id { get; set; }

        [Required]
        [Display(Name = "Nombre")]
        [Column("Nombre")]
        public string Nombre { get; set; }

        [Required]
        [Display(Name = "Código")]
        [Column("Codigo")]
        public string Codigo { get; set; }
    }
} 