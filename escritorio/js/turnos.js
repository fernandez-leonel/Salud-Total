console.log("👀 Verificando si se ejecuta initTurnos");

const API_URL_TURNOS = "http://localhost:5155/api/turnos";

window.initTurnos = async function () {
  console.log("✅ initTurnos se ejecutó");
  await cargarTurnos();
};

async function cargarTurnos() {
  try {
    const rol = localStorage.getItem('rol');
    const idProfesional = localStorage.getItem('idProfesional');

    let url = API_URL_TURNOS;

    if (rol === 'Profesional' && idProfesional) {
      url = `${API_URL_TURNOS}/por-profesional/${idProfesional}`;
    }

    const res = await fetch(url);
    const lista = await res.json();

    const tabla = document.getElementById("tablaTurnos");
    tabla.innerHTML = "";

    lista.forEach(t => {
      const fila = `
        <tr>
          <td>${t.paciente?.nombre || 'N/D'} ${t.paciente?.apellido || ''}</td>
          <td>${t.profesional?.nombre || 'N/D'} ${t.profesional?.apellido || ''}</td>
          <td>${t.profesional?.especialidad?.nombre || '-'}</td>
          <td>${new Date(t.fechaHora).toLocaleString()}</td>
          <td>${t.estado}</td>
          <td>${t.motivoConsulta}</td>
          <td>
            <button onclick="aceptarTurno(${t.id})">✅ Aceptar</button>
            <button onclick="cancelarTurno(${t.id})">❌ Cancelar</button>
            <button onclick="mostrarModalReprogramar(${t.id})">🔁 Reprogramar</button>
          </td>
        </tr>
      `;
      tabla.innerHTML += fila;
    });

  } catch (error) {
    console.error("❌ Error al cargar turnos:", error);
  }
}


async function aceptarTurno(id) {
  try {
    const res = await fetch(`${API_URL_TURNOS}/aceptar/${id}`, {
      method: "PUT"
    });

    if (res.ok) {
      alert("✅ Turno aceptado.");
      cargarTurnos();
    } else {
      alert("❌ No se pudo aceptar el turno.");
    }
  } catch (error) {
    console.error("❌ Error al aceptar turno:", error);
  }
}

function mostrarFormularioCancelar(id) {
  document.getElementById("formCancelar").style.display = "block";
  document.getElementById("idTurnoCancelar").value = id;
}

function cancelarFormularioCancelar() {
  document.getElementById("formCancelar").style.display = "none";
}

async function confirmarCancelacion() {
  const id = document.getElementById("idTurnoCancelar").value;
  const motivo = document.getElementById("motivoCancelacion").value;
  if (!motivo) return;

  try {
    const res = await fetch(`${API_URL_TURNOS}/cancelar/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ motivo })
    });

    if (res.ok) {
      alert("❌ Turno cancelado.");
      cargarTurnos();
    } else {
      alert("❌ No se pudo cancelar el turno.");
    }
  } catch (error) {
    console.error("❌ Error al cancelar turno:", error);
  }

  cancelarFormularioCancelar();
}

function mostrarModalReprogramar(id) {
  document.getElementById("formReprogramar").style.display = "block";
  document.getElementById("idTurnoReprogramar").value = id;
}

function cancelarReprogramacion() {
  document.getElementById("formReprogramar").style.display = "none";
}

async function confirmarReprogramacion() {
  const id = document.getElementById("idTurnoReprogramar").value;
  const fecha = document.getElementById("nuevaFechaInput").value;
  if (!fecha) return;

  try {
    const res = await fetch(`${API_URL_TURNOS}/reprogramar/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fechaHora: fecha })
    });

    if (res.ok) {
      alert("🔁 Turno reprogramado.");
      cargarTurnos();
    } else {
      alert("❌ No se pudo reprogramar el turno.");
    }
  } catch (error) {
    console.error("❌ Error al reprogramar turno:", error);
  }

  cancelarReprogramacion();
}

function mostrarFormularioNuevoTurno() {
  document.getElementById("formNuevoTurno").style.display = "block";
}

function ocultarFormularioNuevoTurno() {
  document.getElementById("formNuevoTurno").style.display = "none";
}

async function crearTurno(event) {
  event.preventDefault();
  const idPaciente = document.getElementById("idPaciente").value;
  const idProfesional = document.getElementById("idProfesional").value;
  const fechaHora = document.getElementById("fechaHoraTurno").value;
  const motivo = document.getElementById("motivoConsulta").value;

  try {
    const res = await fetch(API_URL_TURNOS, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_Paciente: parseInt(idPaciente),
        id_Profesional: parseInt(idProfesional),
        fecha_Hora: fechaHora,
        motivo_Consulta: motivo
      })
    });

    if (res.ok) {
      alert("✅ Turno creado.");
      ocultarFormularioNuevoTurno();
      cargarTurnos();
    } else {
      alert("❌ Error al crear turno.");
    }
  } catch (error) {
    console.error("❌ Error creando turno:", error);
  }
}


