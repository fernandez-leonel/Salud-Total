using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SaludTotalWeb.Models;

public class PublicoController : Controller
{
    private readonly ApplicationDbContext _context;

    public PublicoController(ApplicationDbContext context)
    {
        _context = context;
    }

    public IActionResult Profesionales()
    {
        var especialidadesConProfesionales = _context.Especialidades
            .Include(e => e.Profesionales)
            .ToList();

        return View(especialidadesConProfesionales);
    }
}

