// Variables globales
let childUuid = '';
let notes = [];

// Función para obtener el UUID de la sesión cuando se carga la página
window.onload = function () {
    fetchUuidFromSession();
};

// Obtener el UUID del usuario desde la sesión
function fetchUuidFromSession() {
    fetch('get_uuid.php')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                childUuid = data.uuid;
                console.log("UUID obtenido: ", childUuid);
                fetchNotesFromDatabase();
            } else {
                console.error('Error al obtener el UUID:', data.message);
            }
        })
        .catch(error => console.error('Error al obtener el UUID:', error));
}

// Obtener las notas de la base de datos al cargar la página
function fetchNotesFromDatabase() {
    if (!childUuid) return;

    fetch(`consulta_notas.php?child_uuid=${childUuid}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                notes = data.notes || [];
                notes.forEach(note => {
                    addNoteToUI(note);
                });
            } else {
                console.error('Error al obtener las notas:', data.message);
            }
        })
        .catch(error => console.error('Error en la solicitud:', error));
}

// Agregar una nota a la interfaz
function addNoteToUI(note) {
    const container = document.querySelector('.empty-space');

    const noteSection = document.createElement('div');
    noteSection.classList.add('word-section');

    const noteList = document.createElement('ul');
    const noteItem = document.createElement('li');
    // Mostrar solo mes y día
    const noteDate = new Date(note.note_date);
    const formattedDate = noteDate.toLocaleDateString('es-ES', { month: 'long', day: 'numeric' });
    noteItem.textContent = `${note.note}`;
    noteList.appendChild(noteItem);

    noteSection.appendChild(noteList);
    container.appendChild(noteSection);
}

// Filtrar notas por fechas
function filterNotes() {
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;

    if (!startDate || !endDate) {
        alert('Por favor, selecciona ambas fechas.');
        return;
    }

    const filteredNotes = notes.filter(note => {
        const noteDate = new Date(note.note_date);
        return noteDate >= new Date(startDate) && noteDate <= new Date(endDate);
    });

    const container = document.querySelector('.empty-space');
    container.innerHTML = ''; // Limpiar el contenedor

    filteredNotes.forEach(note => {
        addNoteToUI(note);
    });
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