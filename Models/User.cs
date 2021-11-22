using System;

namespace Models
{
    public class User
    {
        public int Id { get; set; }
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public string Cedula { get; set; }
        public DateTime FechaNacimiento { get; set; }
        public Department Departamento { get; set; }
        public int DepartamentoId { get; set; }
        public string Cargo { get; set; }
        public string SupervisorInmediato { get; set; }
    }
} 