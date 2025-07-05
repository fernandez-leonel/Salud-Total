// Controllers/TurnoController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SaludTotalWeb.Models;
using SaludTotalWeb.Models.ViewModels;

namespace SaludTotalWeb.Controllers
{
    public class TurnoController : Controller
    {
        private readonly ApplicationDbContext _context;

        public TurnoController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Solicitar()
        {
            ViewBag.Profesionales = _context.Profesionales.Include(p => p.Especialidad).ToList();
            return View();
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Solicitar(TurnoViewModel model)
        {
            if (!ModelState.IsValid)
            {
                ViewBag.Profesionales = _context.Profesionales.Include(p => p.Especialidad).ToList();
                return View(model);
            }

            // Crear nuevo paciente
            var paciente = new Paciente
            {
                Nombre = model.Nombre,
                Apellido = model.Apellido,
                Dni = model.DNI,
                Email = model.Email,
                Telefono = model.Telefono
            };

            _context.Pacientes.Add(paciente);
            _context.SaveChanges();

            // Crear nuevo turno
            var turno = new Turno
            {
                Id_Paciente = paciente.Id_paciente,
                Id_Profesional = model.Id_Profesional,
                Fecha_Hora = model.Fecha_Hora,
                Estado = "En espera",
                Motivo_Consulta = model.Motivo_Consulta
            };

            _context.Turnos.Add(turno);
            _context.SaveChanges();

            return RedirectToAction("Confirmacion");
        }

        public IActionResult Confirmacion()
        {
            return View();
        }
        // GET: Turno/Consultar
        [HttpGet]
        public IActionResult Consultar()
        {
            return View();
        }

        // POST: Turno/Consultar
        [HttpPost]
        public IActionResult Consultar(string dni)
        {
            if (string.IsNullOrEmpty(dni))
            {
                ViewBag.Error = "Debe ingresar un DNI válido.";
                return View();
            }

            var paciente = _context.Pacientes
            .Where(p => p.Dni == dni)
            .Select(p => new Paciente
            {
              Id_paciente = p.Id_paciente,
              Dni = p.Dni ?? "",
              Nombre = p.Nombre ?? "",
              Apellido = p.Apellido ?? "",
              Email = p.Email ?? "",
              Telefono = p.Telefono ?? ""
            })
              .FirstOrDefault();


            if (paciente == null)
            {
                ViewBag.Error = "No se encontró un paciente con ese DNI.";
                return View();
            }

            // Traer los turnos relacionados y luego manejar nulos
            var turnos = _context.Turnos
                .Include(t => t.Profesional)
                .ThenInclude(p => p.Especialidad)
                .Where(t => t.Id_Paciente == paciente.Id_paciente)
                .OrderByDescending(t => t.Fecha_Hora)
                .ToList(); // ← ya en memoria

            // Rellenar valores nulos ya en memoria
            foreach (var t in turnos)
            {
                t.Estado = t.Estado ?? "En espera";
                t.Motivo_Consulta = t.Motivo_Consulta ?? "No especificado";
                t.Motivo_Cancelacion = t.Motivo_Cancelacion ?? "No especificado";
            }

            return View("ResultadoConsulta", turnos);
        }
    }
}