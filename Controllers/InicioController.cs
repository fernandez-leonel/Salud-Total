using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace SaludTotalWeb.Controllers
{
    [Authorize]  
    public class InicioController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
