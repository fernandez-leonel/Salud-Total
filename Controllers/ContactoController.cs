using Microsoft.AspNetCore.Mvc;
using SaludTotalWeb.Models;

namespace SaludTotalWeb.Controllers
{
    public class ContactoController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ContactoController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Index(Contacto model)
        {
            if (!ModelState.IsValid)
                return View(model);

            _context.Contactos.Add(model);
            _context.SaveChanges();

            ViewBag.Mensaje = "Gracias por contactarnos. Te responderemos pronto.";
            ModelState.Clear();
            return View();
        }
    }
}
