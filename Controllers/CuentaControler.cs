using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SaludTotalWeb.Models;
using SaludTotalWeb.Models.ViewModels;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using BCrypt.Net;
using SaludTotalWeb.Services;

namespace SaludTotalWeb.Controllers
{
    public class CuentaController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly EmailService _emailService;

        public CuentaController(ApplicationDbContext context, EmailService emailService)
        {
            _context = context;
            _emailService = emailService;
        }


        [HttpGet]
        public IActionResult Login()
        {
            // Si ya está autenticado, no mostrar el login otra vez
            if (User.Identity != null && User.Identity.IsAuthenticated)
                return Redirect("~/Inicio/Index");


            return View();
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(UsuarioLoginViewModel model)
        {
            if (!ModelState.IsValid) return View(model);

            // Recuperar solo los campos necesarios y proteger contra posibles NULL
            var paciente = await _context.Pacientes
                .Where(p => p.Username == model.UsernameOrEmail || p.Email == model.UsernameOrEmail)
                .Select(p => new Paciente
                {
                    Id_paciente = p.Id_paciente,
                    Username = p.Username ?? "",
                    Email = p.Email ?? "",
                    Password_Hash = p.Password_Hash ?? "",
                    Nombre = p.Nombre ?? "",
                    Apellido = p.Apellido ?? ""
                })
                .FirstOrDefaultAsync();

            if (paciente == null || !BCrypt.Net.BCrypt.Verify(model.Password, paciente.Password_Hash))
            {
                ViewBag.Error = "Usuario o contraseña incorrectos.";
                return View(model);
            }

            // Claims
            var claims = new List<Claim>
    {
        new Claim(ClaimTypes.Name, paciente.Username != "" ? paciente.Username : paciente.Email)
    };

            var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
            var principal = new ClaimsPrincipal(identity);

            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal);

            return RedirectToAction("Index", "Inicio");
        }



        [HttpPost]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync();
            return RedirectToAction("Login");
        }

        [HttpGet]
        public IActionResult Registro()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Registro(PacienteRegistroViewModel model)
        {
            if (!ModelState.IsValid)
                return View(model);

            // Validar si el DNI ya existe
            if (_context.Pacientes.Any(p => p.Dni == model.DNI))
            {
                ModelState.AddModelError("DNI", "Ya existe un paciente con ese DNI.");
                return View(model);
            }

            var paciente = new Paciente
            {
                Username = model.Username,
                Dni = model.DNI,
                Nombre = model.Nombre,
                Apellido = model.Apellido,
                Telefono = model.Telefono,
                Email = model.Email,
                Direccion = model.Direccion,
                Fecha_Nacimiento = model.FechaNacimiento,
                Sexo = model.Sexo,
                Obra_Social = model.Obra_Social,
                Numero_Afiliado = model.Numero_Afiliado,
                Enfermedades = model.Enfermedades,
                Alergias = model.Alergias,
                Medicacion = model.Medicacion,
                Password_Hash = BCrypt.Net.BCrypt.HashPassword(model.Contraseña)
            };
            _context.Pacientes.Add(paciente);
            _context.SaveChanges();


            // Enviar correo de bienvenida
            _emailService.EnviarCorreo(
                model.Email,
                "Bienvenido a Salud Total",
                $"Hola {model.Nombre}, tu registro fue exitoso. Ya podés iniciar sesión en el sistema."
            );

            return RedirectToAction("Login");


        }
    }
}

