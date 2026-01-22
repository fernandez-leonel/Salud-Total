const API_URL = "http://localhost:5155/api/turnos";

window.initInformes = () => {
  console.log("📊 Informes cargados");

  const rol = localStorage.getItem("rol");
  const select = document.getElementById("tipoInforme");

  if (rol === "Profesional") {
    // Elimina otras opciones y deja solo la de "atendidos"
    Array.from(select.options).forEach(opt => {
      if (opt.value !== "atendidos") {
        opt.remove();
      }
    });
  }
};


async function consultarInforme() {
  const desde = document.getElementById("fechaDesde").value;
  const hasta = document.getElementById("fechaHasta").value;
  const tipo = document.getElementById("tipoInforme").value;
  const resultadoDiv = document.getElementById("resultadoInforme");

  if (!desde || !hasta) {
    alert("Seleccioná ambas fechas.");
    return;
  }

  let url = "";
const rol = localStorage.getItem("rol");

switch (tipo) {
  case "atendidos":
    if (rol === "Profesional") {
      const idProf = localStorage.getItem("idProfesional");
      url = `${API_URL}/informe/atendidos-por-profesional?idProfesional=${idProf}&desde=${desde}&hasta=${hasta}`;
    } else {
      url = `${API_URL}/informe/atendidos-por-profesional?desde=${desde}&hasta=${hasta}`;
    }
    break;

    case "cancelados":
      url = `${API_URL}/informe/cancelados-reprogramados?desde=${desde}&hasta=${hasta}`;
      break;
    case "especialidades":
      url = `${API_URL}/informe/turnos-por-especialidad?desde=${desde}&hasta=${hasta}`;
      break;
    case "topPacientes":
      url = `${API_URL}/informe/top-pacientes?desde=${desde}&hasta=${hasta}`;
      break;
    default:
      resultadoDiv.innerHTML = "Informe no válido.";
      return;
  }

  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log("📥 Datos informe:", data);

    if (!Array.isArray(data) || data.length === 0) {
      resultadoDiv.innerHTML = "<p>⚠️ No hay resultados para el rango seleccionado.</p>";
      return;
    }

    // Mostrar como tabla
    let tabla = "<table border='1' cellpadding='5'><thead><tr>";
    const keys = Object.keys(data[0]);
    keys.forEach(k => (tabla += `<th>${k}</th>`));
    tabla += "</tr></thead><tbody>";

    data.forEach(row => {
      tabla += "<tr>";
      keys.forEach(k => {
        tabla += `<td>${row[k]}</td>`;
      });
      tabla += "</tr>";
    });

    tabla += "</tbody></table>";
    resultadoDiv.innerHTML = tabla;

  } catch (error) {
    console.error("❌ Error al consultar informe:", error);
    resultadoDiv.innerHTML = "<p style='color: red'>Error al obtener los datos.</p>";
  }
}
