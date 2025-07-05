using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;
using SaludTotalWeb.Models;
using SaludTotalWeb.Services;
using SaludTotalWeb.Utils;

var builder = WebApplication.CreateBuilder(args);

// Configurar cadena de conexión
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        new MySqlServerVersion(new Version(8, 0, 0))
    )
);

// Agregar servicios MVC
builder.Services.AddControllersWithViews();

// Agregar soporte para sesiones
builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});

// ✅ Agregar autenticación antes del builder.Build()
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.LoginPath = "/Cuenta/Login";
        options.LogoutPath = "/Cuenta/Logout";
    });
builder.Services.AddTransient<EmailService>();



var app = builder.Build();
// Generar hash temporal (solo una vez, después lo sacás)
GeneradorHash.MostrarHash();  // <-- Esto imprime en consola
// Middleware
app.UseSession();
app.UseStaticFiles();
app.UseRouting();

app.UseAuthentication(); //  Primero va autenticación
app.UseAuthorization(); //   Luego autorización

// Rutas
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

string passwordPlano = "1234";
string passwordHash = BCrypt.Net.BCrypt.HashPassword(passwordPlano);
Console.WriteLine(passwordHash); // o usalo como string resultante


app.Run();
