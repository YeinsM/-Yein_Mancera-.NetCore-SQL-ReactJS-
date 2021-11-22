using Microsoft.EntityFrameworkCore;
using Models;

namespace PruebaAloe 
{
    public class AppContext : DbContext
    {
        // Creo DbSet
        public DbSet<User> Users {get; set;}
        public DbSet<Department> Departments {get; set;}

        // Pasar parametros al constructor de la clase base
        public AppContext(DbContextOptions<AppContext> options):base(options)
        {

        }
    }
} 