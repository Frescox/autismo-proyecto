// Variable para guardar el UUID del usuario
let childUuid = '';

// Función para obtener el UUID de la sesión cuando se carga la página
window.onload = function () {
    fetchUuidFromSession();
    fetchWordsFromDatabase();
};

// Obtener el UUID del usuario desde la sesión
function fetchUuidFromSession() {
    fetch('get_uuid.php')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                childUuid = data.uuid;
                console.log("UUID obtenido: ", childUuid); // Verificar en la consola
            } else {
                console.error('Error al obtener el UUID:', data.message);
            }
        })
        .catch(error => console.error('Error al obtener el UUID:', error));
}

// Obtener las palabras de la base de datos al cargar la página
function fetchWordsFromDatabase() {
    if (!childUuid) return;  // No continuar si no se tiene el UUID

    fetch(`obtener_palabras.php?child_uuid=${childUuid}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const words = data.words || [];
                words.forEach(word => {
                    addWordToUI(word);
                });
            } else {
                console.error('Error al obtener las palabras:', data.message);
            }
        })
        .catch(error => console.error('Error en la solicitud:', error));
}

// Mostrar el modal para ingresar la palabra
function showModal() {
    const modal = document.getElementById('word-modal');
    modal.style.display = 'flex';
}

// Cerrar el modal sin guardar
function closeModal() {
    const modal = document.getElementById('word-modal');
    modal.style.display = 'none';
}

// Confirmar la palabra ingresada y guardarla
function confirmWord() {
    const wordInput = document.getElementById('word-input');
    const word = wordInput.value.trim();

    if (word) {
        saveWordToDatabase(word);
        addWordToUI(word);
        wordInput.value = ''; // Limpiar el campo de entrada
        closeModal();
    } else {
        alert('Por favor, ingresa una palabra.');
    }
}

// Guardar la palabra en la base de datos
function saveWordToDatabase(word) {
    fetch('guardar_palabra.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `child_uuid=${childUuid}&word=${encodeURIComponent(word)}`,
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Palabra guardada con éxito');
        } else {
            console.error('Error al guardar la palabra:', data.message);
        }
    })
    .catch(error => console.error('Error en la solicitud:', error));
}

// Agregar la palabra a la interfaz
function addWordToUI(word) {
    const section = document.querySelector('.empty-space').lastElementChild;
    const listItem = document.createElement('li');
    listItem.textContent = word;
    section.querySelector('ul').appendChild(listItem);
}

// Crear una nueva sección cuando se agreguen más palabras
function createNewSection() {
    const newSection = document.createElement('div');
    newSection.classList.add('word-section');
    newSection.innerHTML = '<ul></ul>';
    document.getElementById('container').appendChild(newSection);
}
