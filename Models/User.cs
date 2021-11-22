using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        [Display(Name = "Nombres")]
        [Column("Nombres")]
        public string Nombres { get; set; }

        [Required]
        [Display(Name = "Apellidos")]
        [Column("Apellidos")]
        public string Apellidos { get; set; }

        [Required]
        [Display(Name = "Cedula")]
        [Column("Cedula")]
        public string Cedula { get; set; }

        [Required]
        public DateTime FechaNacimiento { get; set; }
        
        [Display(Name = "Departamento")]
        public Department Departamento { get; set; }
        
        [Required]
        [Display(Name = "Departamento")]
        public int DepartamentoId { get; set; }

        [Required]
        [Display(Name = "Cargo")]
        [Column("Cargo")]
        public string Cargo { get; set; }


        public string SupervisorInmediato { get; set; }
    }
} 