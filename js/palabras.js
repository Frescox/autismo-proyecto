// Variable para guardar el UUID del usuario
let childUuid = '';

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
                console.log("UUID obtenido: ", childUuid); // Verificar en la consola
                fetchWordsFromDatabase(); // Ahora que tenemos el UUID, obtenemos las palabras
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
    if (!childUuid) return;  // No continuar si no se tiene el UUID

    console.log('Enviando palabra:', word); // Verificar palabra

    fetch('guardar_palabra.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            child_uuid: childUuid,
            word: word
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // Para ver la respuesta del servidor
        if (!data.success) {
            console.error('Error al guardar la palabra:', data.message);
        }
    })
    .catch(error => console.error('Error en la solicitud:', error));
}


// Agregar una palabra a la interfaz
function addWordToUI(word) {
    const container = document.querySelector('.empty-space');

    const wordSection = document.createElement('div');
    wordSection.classList.add('word-section');

    const wordList = document.createElement('ul');
    const wordItem = document.createElement('li');
    wordItem.textContent = word;
    wordList.appendChild(wordItem);

    wordSection.appendChild(wordList);
    container.appendChild(wordSection);
}
