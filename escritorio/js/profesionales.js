if (typeof window.API_URL_PROFESIONALES === "undefined")
console.log("📘 profesionales.js cargado");

const API_URL_PROFESIONALES = "http://localhost:5155/api/profesionales";
let profesionalEditando = null;

window.initProfesionales = async function () {
  await cargarEspecialidades();
  await cargarProfesionales();

  document.getElementById("formNuevoProfesional").addEventListener("submit", async (e) => {
    e.preventDefault();
    if (profesionalEditando) {
      await actualizarProfesional();
    } else {
      await guardarProfesional();
    }
  });
};

async function cargarEspecialidades() {
  try {
    const res = await fetch("http://localhost:5155/api/especialidades");
    const especialidades = await res.json();
    const select = document.getElementById("especialidadId");
    select.innerHTML = '<option value="">Seleccione especialidad</option>';

    especialidades.forEach(e => {
      console.log("📦 Especialidad cargada:", e); // 👈 AGREGÁ ESTO
      const option = document.createElement("option");
      // VERIFICÁ QUÉ CAMPO USAR: e.id o e.id_Especialidad
      option.value = e.id_especialidad; // o e.id si fuera así en tu JSON
      option.textContent = e.nombre;
      select.appendChild(option);
    });
  } catch (error) {
    console.error("❌ Error al cargar especialidades:", error);
  }
}

async function cargarProfesionales() {
  try {
    const res = await fetch(API_URL_PROFESIONALES);
    const lista = await res.json();
    const tabla = document.getElementById("tablaProfesionales");
    tabla.innerHTML = "";
    lista.forEach(p => {
      const fila = `
        <tr>
          <td>${p.dni}</td>
          <td>${p.nombre}</td>
          <td>${p.apellido}</td>
          <td>${p.matricula}</td>
          <td>${p.email}</td>
          <td>${p.telefono}</td>
          <td>${p.especialidad?.nombre || '-'}</td>
          <td>
            <button onclick="editarProfesional(${p.id_Profesional})">✏️ Editar</button>
            <button onclick="eliminarProfesional(${p.id_Profesional})">🗑️ Eliminar</button>
          </td>
        </tr>
      `;
      tabla.innerHTML += fila;
    });
  } catch (error) {
    console.error("❌ Error al cargar profesionales:", error);
  }
}

window.mostrarFormularioProfesional = function () {
  profesionalEditando = null;
  document.getElementById("formNuevoProfesional").reset();
  document.getElementById("disponibilidad").checked = true;
  document.getElementById("formularioProfesional").style.display = "block";
};

window.cancelarFormularioProfesional = function () {
  document.getElementById("formularioProfesional").style.display = "none";
  profesionalEditando = null;
};

async function guardarProfesional() {
  const profesional = obtenerDatosFormulario();
  try {
    const res = await fetch(API_URL_PROFESIONALES, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profesional)
    });
    if (res.ok) {
      await cargarProfesionales();
      cancelarFormularioProfesional();
    } else {
      alert("❌ Error al guardar");
    }
  } catch (error) {
    console.error("❌ Error al guardar profesional:", error);
  }
}

async function editarProfesional(id) {
  try {
    const res = await fetch(`${API_URL_PROFESIONALES}/${id}`);
    const p = await res.json();
    profesionalEditando = p.id_Profesional;

    document.getElementById("dni").value = p.dni;
    document.getElementById("nombre").value = p.nombre;
    document.getElementById("apellido").value = p.apellido;
    document.getElementById("matricula").value = p.matricula;
    document.getElementById("email").value = p.email;
    document.getElementById("telefono").value = p.telefono;
    document.getElementById("direccion").value = p.direccion || '';
    document.getElementById("fechaNacimiento").value = p.fechaNacimiento?.split('T')[0] || '';
    document.getElementById("sexo").value = p.sexo || '';
    document.getElementById("disponibilidad").checked = p.disponibilidad ?? true;
    document.getElementById("especialidadId").value = p.id_Especialidad;

    document.getElementById("formularioProfesional").style.display = "block";
  } catch (error) {
    console.error("❌ Error al cargar profesional para edición:", error);
  }
}

async function actualizarProfesional() {
  const profesional = obtenerDatosFormulario();
  const id = profesionalEditando;
   console.log("📤 Enviando a API:", JSON.stringify(profesional));
   console.log("Tipo especialidad:", typeof profesional.Id_Especialidad);

  try {
    const res = await fetch(`${API_URL_PROFESIONALES}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profesional)
    });

    if (res.ok) {
      await cargarProfesionales();
      cancelarFormularioProfesional();
    } else {
      const errorText = await res.text();
      console.error("❌ Error PUT:", errorText);
      alert("❌ Error al actualizar profesional");
    }
  } catch (error) {
    console.error("❌ Error al actualizar profesional:", error);
  }
}

async function eliminarProfesional(id) {
  if (!confirm("¿Eliminar este profesional?")) return;

  try {
    const res = await fetch(`${API_URL_PROFESIONALES}/${id}`, {
      method: "DELETE"
    });
    if (res.ok) await cargarProfesionales();
    else console.error("❌ Error al eliminar profesional. Puede tener turnos asignados.");
  } catch (error) {
    console.error("❌ Error al eliminar profesional:", error);
  }
}

function obtenerDatosFormulario() {
  const especialidadIdRaw = document.getElementById("especialidadId").value;

  if (!especialidadIdRaw || isNaN(especialidadIdRaw)) {
    throw new Error("Especialidad no seleccionada.");
  }

  const especialidadId = parseInt(especialidadIdRaw);

  return {
    Dni: document.getElementById("dni").value,
    Nombre: document.getElementById("nombre").value,
    Apellido: document.getElementById("apellido").value,
    Matricula: document.getElementById("matricula").value,
    Email: document.getElementById("email").value,
    Telefono: document.getElementById("telefono").value,
    Direccion: document.getElementById("direccion").value,
    FechaNacimiento: document.getElementById("fechaNacimiento").value,
    Sexo: document.getElementById("sexo").value,
    Disponibilidad: document.getElementById("disponibilidad").checked,
    Id_Especialidad: especialidadId
  };
}



