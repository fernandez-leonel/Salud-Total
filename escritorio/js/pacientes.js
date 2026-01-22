if (typeof window.API_URL_PACIENTES === "undefined")
console.log("🔥 pacientes.js está siendo ejecutado");

const API_URL_PACIENTES = "http://localhost:5155/api/pacientes";
let pacienteEditando = null;

window.initPacientes = function () {
  document.getElementById("formNuevoPaciente").addEventListener("submit", async function (e) {
    e.preventDefault();

    const nuevoPaciente = {
      id: pacienteEditando ?? 0,
      dni: document.getElementById("dni").value,
      nombre: document.getElementById("nombre").value,
      apellido: document.getElementById("apellido").value,
      email: document.getElementById("email").value,
      telefono: document.getElementById("telefono").value,
      direccion: document.getElementById("direccion").value,
      fecha_Nacimiento: document.getElementById("fecha_Nacimiento").value,
      sexo: document.getElementById("sexo").value,
      activo: document.getElementById("activo").checked
    };

    console.log("📤 Enviando paciente:", nuevoPaciente);
    console.log("📌 Modo:", pacienteEditando ? "EDITAR (PUT)" : "CREAR (POST)");
    console.log("✏️ pacienteEditando ID:", pacienteEditando);

    try {
      if (pacienteEditando) {
        const res = await fetch(`${API_URL_PACIENTES}/${pacienteEditando}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(nuevoPaciente)
        });

        if (!res.ok) {
          const errorText = await res.text();
          alert("❌ Error al actualizar paciente:\n" + errorText);
          return;
        }

      } else {
        const res = await fetch(API_URL_PACIENTES, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(nuevoPaciente)
        });

        if (!res.ok) {
          const errorText = await res.text();
          console.error("❌ Error en POST:", res.status, errorText);
        }
      }

      cancelarFormularioPaciente();
      cargarPacientes();
    } catch (error) {
      console.error("❌ Error al guardar paciente:", error);
    }
  });

  // Cargar pacientes al iniciar
  cargarPacientes();
};

window.cargarPacientes = async function () {
  try {
    const response = await fetch(API_URL_PACIENTES);
    const pacientes = await response.json();

    const tabla = document.getElementById("tablaPacientes");
    tabla.innerHTML = "";

    pacientes.forEach(p => {
      const fila = `
        <tr>
          <td>${p.dni}</td>
          <td>${p.nombre}</td>
          <td>${p.apellido}</td>
          <td>${p.email}</td>
          <td>${p.telefono}</td>
          <td>${p.direccion || ''}</td>
          <td>${p.fecha_Nacimiento ? new Date(p.fecha_Nacimiento).toLocaleDateString() : ''}</td>
          <td>
            <button onclick='editarPaciente(${JSON.stringify(p)})'>✏️ Editar</button>
            <button onclick="eliminarPaciente(${p.id})">🗑️ Eliminar</button>
          </td>
        </tr>
      `;
      tabla.innerHTML += fila;
    });
  } catch (error) {
    console.error("❌ Error cargando pacientes:", error);
  }
};

window.mostrarFormularioPaciente = function () {
  pacienteEditando = null;
  document.getElementById("formNuevoPaciente").reset();
  document.getElementById("formularioPaciente").style.display = "block";
};

window.cancelarFormularioPaciente = function () {
  pacienteEditando = null;
  document.getElementById("formNuevoPaciente").reset();
  document.getElementById("formularioPaciente").style.display = "none";
};

window.editarPaciente = function (paciente) {
  document.getElementById("dni").value = paciente.dni || '';
  document.getElementById("nombre").value = paciente.nombre || '';
  document.getElementById("apellido").value = paciente.apellido || '';
  document.getElementById("email").value = paciente.email || '';
  document.getElementById("telefono").value = paciente.telefono || '';
  document.getElementById("direccion").value = paciente.direccion || '';
  document.getElementById("fecha_Nacimiento").value = paciente.fecha_Nacimiento?.split("T")[0] || '';
  document.getElementById("sexo").value = paciente.sexo || '';
  document.getElementById("activo").checked = paciente.activo ?? true;

  pacienteEditando = paciente.id;
  document.getElementById("formularioPaciente").style.display = "block";
};

window.eliminarPaciente = async function (id) {
  if (!confirm("¿Estás seguro de eliminar este paciente?")) return;

  try {
    await fetch(`${API_URL_PACIENTES}/${id}`, { method: "DELETE" });
    cargarPacientes();
  } catch (error) {
    console.error("❌ Error al eliminar paciente:", error);
  }
};
