async function cargarEstadisticas() {
    try {
        // Realizar la solicitud al backend
        const response = await fetch("estadisticas.php");
        const data = await response.json();

        if (data.error) {
            console.error(data.error);
            return;
        }

        // Actualizar el tiempo promedio
        const tiempoPromedioElement = document.getElementById("tiempoPromedio");
        if (tiempoPromedioElement) {
            tiempoPromedioElement.textContent = convertirSegundosAHHMMSS(data.tiempoPromedio || 0);
        } else {
            console.error("No se encontró el elemento con ID 'tiempoPromedio'.");
        }

        // Actualizar las palabras complicadas
        const palabrasComplicadasElement = document.getElementById("palabrasComplicadas");
        if (palabrasComplicadasElement) {
            palabrasComplicadasElement.innerHTML = ""; // Limpiar la lista actual
            (data.palabrasComplicadas || []).forEach(palabra => {
                const li = document.createElement("li");
                li.textContent = palabra;
                li.style.color = "red"; // Opcional: Color rojo para palabras complicadas
                palabrasComplicadasElement.appendChild(li);
            });
        } else {
            console.error("No se encontró el elemento con ID 'palabrasComplicadas'.");
        }

        // Actualizar las palabras aprendidas
        const palabrasAprendidasElement = document.getElementById("palabrasAprendidas");
        if (palabrasAprendidasElement) {
            palabrasAprendidasElement.innerHTML = ""; // Limpiar la lista actual
            (data.palabrasAprendidas || []).forEach(palabra => {
                const li = document.createElement("li");
                li.textContent = palabra;
                li.style.color = "green"; // Opcional: Color verde para palabras aprendidas
                palabrasAprendidasElement.appendChild(li);
            });
        } else {
            console.error("No se encontró el elemento con ID 'palabrasAprendidas'.");
        }
    } catch (error) {
        console.error("Error al cargar las estadísticas:", error);
    }
}

// Convertir segundos a un formato legible (HH:MM:SS o Minutos:Segundos)
function convertirSegundosAHHMMSS(segundos) {
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const segundosRestantes = segundos % 60;
    const minutosRestantes = minutos % 60;

    if (horas > 0) {
        return `${horas} Horas ${minutosRestantes} Minutos ${segundosRestantes} Segundos`;
    }
    return `${minutos} Minutos ${segundosRestantes} Segundos`;
}

function consultarNombre() {
    fetch('getChildName.php')
        .then(response => response.json())
        .then(data => {
            if (data.nombre) {
                document.getElementById('text').textContent = `Control parental de ${data.nombre}`;
            } else {
                document.getElementById('text').textContent = data.error;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('text').textContent = 'Error al consultar el nombre';
        });
}

// Llamar a la función para cargar estadísticas cuando se cargue la página
document.addEventListener("DOMContentLoaded", cargarEstadisticas);
