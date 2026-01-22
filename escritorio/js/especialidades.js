const API_URL_ESPECIALIDADES = "http://localhost:5155/api/especialidades/con-profesionales";

window.initEspecialidades = async function () {
  console.log("🔎 Cargando especialidades...");
  await cargarEspecialidades();
};

async function cargarEspecialidades() {
  try {
    const res = await fetch(API_URL_ESPECIALIDADES);
    const especialidades = await res.json();
    console.log("📥 Especialidades recibidas:", especialidades);

    const contenedor = document.getElementById("contenedorEspecialidades");
    contenedor.innerHTML = "";

    especialidades.forEach(e => {
      const bloque = document.createElement("div");
      bloque.className = "especialidad";

      const titulo = document.createElement("h3");
      titulo.textContent = e.nombre;

      const lista = document.createElement("ul");
      e.profesionales.forEach(p => {
        const li = document.createElement("li");
        li.textContent = `${p.nombre} ${p.apellido}`;
        lista.appendChild(li);
      });

      bloque.appendChild(titulo);
      bloque.appendChild(lista);
      contenedor.appendChild(bloque);
    });

  } catch (error) {
    console.error("❌ Error al cargar especialidades:", error);
  }
}
