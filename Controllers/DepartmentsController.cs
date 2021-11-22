using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Models;
using PruebaAloe;
using Microsoft.EntityFrameworkCore;

namespace Controllers
{
    [Route("department")]
    public class DepartmentsController:ControllerBase
    {
        private readonly AppContext _context;
        public DepartmentsController(AppContext context)
        {
            this._context = context ?? throw new System.ArgumentNullException(nameof(context));
        }

        // Enlistar
        [HttpGet]
        public ActionResult<List<Department>> Get(){
            List<Department> Departments = _context.Departments.ToList();
            return Departments;
        }

        // Crea (Create)
        [HttpPost]
        public ActionResult Post([FromBody] Department department){
            _context.Departments.Add(department);
            _context.SaveChanges();
            return Created(nameof(GetDepartment), department);
        }

        // Busca por ID (Read)
        [HttpGet("{id}")]
        public ActionResult GetDepartment(int id){
            Department department = _context.Departments.Find(id);
            if(department is null){
                return NotFound();
            }
            return Ok(department);
        }

        // Actualizar (Update)
        [HttpPut("{id}")]
        public ActionResult PutDepartment(int id, [FromBody] Department department){
            if(_context.Departments.AsNoTracking().FirstOrDefault(dep => dep.Id == id) is null){
                return NotFound();
            }
            // Trackea el documento encontrado
            _context.Departments.Update(department);
            _context.SaveChanges();
            return Ok(department);
        }

        // Borrar (Delete)
        [HttpDelete("{id}")]
        public ActionResult DeleteDepartment(int id){
            Department department = _context.Departments.Find(id);
            if (department is null){
                return NotFound();
            }else{
                _context.Departments.Remove(department);
                _context.SaveChanges();
            }
            return Ok(department);
        }

    }
}