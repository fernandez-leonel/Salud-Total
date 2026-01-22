document.addEventListener('DOMContentLoaded', () => {
  const username = localStorage.getItem('username');
  const rol = localStorage.getItem('rol');

  document.getElementById('userRol').textContent = `Rol: ${rol}`;
  document.getElementById('titulo').textContent = `Bienvenido ${username}`;
 
  if (rol === "Profesional") {
    // Oculta menú que no corresponde
    document.getElementById('menuPacientes').style.display = "none";
    document.getElementById('menuProfesionales').style.display = "none";
    document.getElementById('menuEspecialidades').style.display = "none";
  }
});

async function cargarVista(nombreVista) {
  const response = await fetch(`${nombreVista}.html`);
  const html = await response.text();
  const contenedor = document.getElementById("contenidoDinamico");
  contenedor.innerHTML = html;

  // Eliminar scripts anteriores si hay
  const scriptsPrevios = document.querySelectorAll(`script[data-modulo="${nombreVista}"]`);
  scriptsPrevios.forEach(s => s.remove());

  // Cargar el nuevo JS dinámicamente
    const script = document.createElement("script");
  script.src = `./js/${nombreVista}.js`;
  script.dataset.modulo = nombreVista;
  script.onload = () => {
    console.log(`✅ Script ${nombreVista}.js cargado correctamente`);

    switch (nombreVista) {
      case "profesionales":
        if (typeof initProfesionales === "function") initProfesionales();
        break;
      case "pacientes":
        if (typeof initPacientes === "function") initPacientes();
        break;
      case "turnos":
        if (typeof initTurnos === "function") initTurnos();
        break;
      case "especialidades":
        if (typeof initEspecialidades === "function") initEspecialidades();
        break;
      case "informes":
        if (typeof initInformes === "function") initInformes();
        break;
    }
  };

  document.body.appendChild(script);
}



function cerrarSesion() {
  localStorage.clear();
  window.location.href = "index.html";
}
