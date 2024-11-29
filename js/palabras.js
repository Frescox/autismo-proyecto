let childUuid = '';
let wordToDelete = '';
let wordSectionToDelete = null; 

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
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => modal.style.display = 'none');
    hideDeleteButtons();
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

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.classList.add('btnDelete');
    deleteButton.onclick = function() {
        showDeleteModal(word, wordSection);
    };

    wordSection.appendChild(wordList);
    wordSection.appendChild(deleteButton);
    container.appendChild(wordSection);
}

// Mostrar el modal de eliminación de palabra
function showDeleteModal(word, wordSection) {
    wordToDelete = word;
    wordSectionToDelete = wordSection;

    const deleteModal = document.getElementById('word-delete');
    const deleteWordText = document.getElementById('delete-word-text');
    deleteWordText.textContent = `${word}`;
    deleteWordText.style.fontSize = '20px';
    deleteWordText.style.fontWeight = 'bold';
    deleteWordText.style.paddingBottom = "10px";
    deleteModal.style.display = 'flex';

    const confirmDeleteButton = document.getElementById('confirm-delete-button');
    confirmDeleteButton.onclick = confirmDeleteWord;
}

// Confirmar la eliminación de la palabra
function confirmDeleteWord() {
    deleteWordFromDatabase(wordToDelete);
    wordSectionToDelete.remove();
    closeModal();
}

// Eliminar la palabra de la base de datos
function deleteWordFromDatabase(word) {
    if (!childUuid) return;  // No continuar si no se tiene el UUID

    console.log('Eliminando palabra:', word); // Verificar palabra

    fetch('eliminar_palabra.php', {
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
            console.error('Error al eliminar la palabra:', data.message);
        }
    })
    .catch(error => console.error('Error en la solicitud:', error));
}

// Ocultar todos los botones de eliminar
function hideDeleteButtons() {
    const deleteButtons = document.querySelectorAll('.btnDelete');
    deleteButtons.forEach(button => {
        button.style.display = 'none';
    });
}

// Mostrar/ocultar botones de eliminar
function toggleDeleteButtons() {
    const deleteButtons = document.querySelectorAll('.btnDelete');
    deleteButtons.forEach(button => {
        button.style.display = button.style.display === 'none' ? 'inline-block' : 'none';
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

function consultarNombre() {
    fetch('getChildName.php')
        .then(response => response.json())
        .then(data => {
            if (data.nombre) {
                document.getElementById('text').textContent = `Palabras  de ${data.nombre}`;
            } else {
                document.getElementById('text').textContent = data.error;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('text').textContent = 'Error al consultar el nombre';
        });
}
