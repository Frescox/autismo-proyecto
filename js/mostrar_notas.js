// Variables globales
let childUuid = '';
let notes = [];

// Función para obtener el UUID de la sesión cuando se carga la página
window.onload = function () {
    fetchUuidFromSession();
    init();
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

function filterNotes() {
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;

    if (!startDate || !endDate) {
        alert('Por favor, selecciona ambas fechas.');
        return;
    }

    // Convertir las fechas en formato yyyy-mm-dd
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    
    startDateObj.setHours(0, 0, 0, 0);
    endDateObj.setHours(23, 59, 59, 999);

    const filteredNotes = notes.filter(note => {
        const noteDate = new Date(note.note_date);
        noteDate.setHours(0, 0, 0, 0); 
        return noteDate >= startDateObj && noteDate <= endDateObj;
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
                document.getElementById('text').textContent = `Notas de ${data.nombre}`;
            } else {
                document.getElementById('text').textContent = data.error;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('text').textContent = 'Error al consultar el nombre';
        });
}

function init() {
    consultarNombre();
    fetch('get_user_data.php')
        .then(response => response.json())
        .then(data => {
            const userProfilePic = document.getElementById('userProfilePic');
            if (data.success && data.profile_pic) {
                userProfilePic.src = data.profile_pic;
            } else {
                // Si no hay foto, usar la imagen predeterminada
                userProfilePic.src = './images/qqq.png';
            }
            userProfilePic.style.display = 'inline-block';
        })
        .catch(error => {
            console.error('Error al cargar datos:', error);
            // En caso de error, usa la imagen predeterminada
            document.getElementById('userProfilePic').src = './images/qqq.png';
        });
}