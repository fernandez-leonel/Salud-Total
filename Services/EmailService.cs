using System.Net;
using System.Net.Mail;

namespace SaludTotalWeb.Services
{
    public class EmailService
    {
        private readonly string _correoOrigen = "leeoofernandez54@gmail.com";
        private readonly string _contraseña = "azheyzjhsxuipzmn";

        public void EnviarCorreo(string destino, string asunto, string cuerpo)
        {
            var mensaje = new MailMessage();
            mensaje.From = new MailAddress(_correoOrigen);
            mensaje.To.Add(destino);
            mensaje.Subject = asunto;
            mensaje.Body = cuerpo;
            mensaje.IsBodyHtml = true;

            using (var smtp = new SmtpClient("smtp.gmail.com", 587))
            {
                smtp.Credentials = new NetworkCredential(_correoOrigen, _contraseña);
                smtp.EnableSsl = true;
                smtp.Send(mensaje);
            }
        }
    }
}

