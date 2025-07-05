using System;

namespace SaludTotalWeb.Utils
{
    public static class GeneradorHash
    {
        public static void MostrarHash()
        {
            string passwordPlano = "1234";
            string passwordHash = BCrypt.Net.BCrypt.HashPassword(passwordPlano);
            Console.WriteLine("Hash generado: " + passwordHash);
        }
    }
}
