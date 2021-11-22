using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Models;
using PruebaAloe;
using Microsoft.EntityFrameworkCore;

namespace Controllers
{
    [Route("user")]
    public class UsersController:ControllerBase
    {
        private readonly AppContext _context;
        public UsersController(AppContext context)
        {
            this._context = context ?? throw new System.ArgumentNullException(nameof(context));
        }

        // Enlistar usuarios
        [HttpGet]
        public ActionResult<List<User>> Get(){
            List<User> users = _context.Users.Include(user => user.Departamento).ToList();
            return users;
        }

        // Crea usuarios
        [HttpPost]
        public ActionResult Post([FromBody] User user){
            _context.Users.Add(user);
            _context.SaveChanges();
            return Created(nameof(GetUser), user);
        }

        // Busca usuario por ID
        [HttpGet("{id}")]
        public ActionResult GetUser(int id){
            User user = _context.Users.Include(user => user.Departamento).FirstOrDefault(user => user.Id == id);
            if(user is null){
                return NotFound();
            }
            return Ok(user);
        }

        // Actualizar datos de usuario
        [HttpPut("{id}")]
        public ActionResult PutUser(int id, [FromBody] User user){
            if(_context.Users.AsNoTracking().FirstOrDefault(dep => dep.Id == id) is null){
                return NotFound();
            }
            // Trackea el documento encontrado
            _context.Users.Update(user);
            _context.SaveChanges();
            return Ok(user);
        }

    }
}