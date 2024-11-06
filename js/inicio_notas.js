let currentElement = 0; // No hay elementos al principio
const elements = [];
const container = document.getElementById('containerNotes');
const label = document.getElementById('label');
let numberNote = document.getElementById('numberNote');
const left = document.getElementById('previousNote');
const right = document.getElementById('nextNote');
const yes = document.getElementById('save');
const not = document.getElementById('noSave');
const newNote = document.getElementById('newNote');
const back = document.getElementById('BtnGoBack1');

// Función para crear un nuevo elemento con un textTarea dentro
function createNewElement(content = '') {
    const newElement = document.createElement('div');
    newElement.classList.add('note'); // Añade clase de la nota

    // Crea el textTarea dentro del nuevo div
    const textTarea = document.createElement('textarea');
    textTarea.placeholder = `Escribe algo en la nota ${elements.length + 1}`;
    textTarea.id = `textInput${elements.length + 1}`;
    textTarea.className = 'textInput';

    // Asigna contenido previo si hay
    textTarea.value = content;

    textTarea.addEventListener('input', () => showYesNot(textTarea));

    newElement.appendChild(textTarea); // Añade el textTarea al div
    container.appendChild(newElement); // Añade el div al contenedor
    elements.push(newElement);

    // Si es el primer elemento, lo muestra inmediatamente
    if (elements.length === 1) {
        currentElement = 0;
        numberNote.innerHTML = "Nota " + (currentElement + 1);
        newElement.classList.add('active');
        label.classList.add('hidden');
        left.style.display = 'none';
        right.style.display = 'none';
    } else {
        // Si no está en el último elemento
        if (currentElement < elements.length - 1) {
            // Recorremos hasta el último elemento
            for (let i = currentElement; i < elements.length; i++) {
                showNextElement();
            }
            right.style.display = 'none';
        }
    }
}

// Función para mostrar el siguiente elemento con transición
function showNextElement() {
    if (elements.length > 1 && currentElement < elements.length - 1) {
        // Oculta el actual hacia la izquierda
        elements[currentElement].classList.add('hidden-left');
        elements[currentElement].classList.remove('active');

        // Actualiza el índice del siguiente elemento
        currentElement = (currentElement + 1) % elements.length;

        // Mueve el siguiente elemento al centro
        elements[currentElement].classList.remove('hidden-right', 'hidden-left');
        elements[currentElement].classList.add('active');

        numberNote.innerHTML = "Nota " + (currentElement + 1);
        left.style.display = 'block';
    }
    if (currentElement == elements.length - 1) {
        right.style.display = 'none';
    }
}

// Función para mostrar el elemento anterior con transición
function showPrevElement() {
    if ((elements.length > 1 && currentElement != 0)) {
        // Oculta el actual hacia la derecha
        elements[currentElement].classList.add('hidden-right');
        elements[currentElement].classList.remove('active');

        // Actualiza el índice del elemento anterior
        currentElement = (currentElement - 1 + elements.length) % elements.length;

        // Mueve el elemento anterior al centro
        elements[currentElement].classList.remove('hidden-right', 'hidden-left');
        elements[currentElement].classList.add('active');

        numberNote.innerHTML = "Nota " + (currentElement + 1);
        right.style.display = 'block';
    }
    if (currentElement == 0) {
        left.style.display = 'none';
    }
}

function saveNotes() {
    console.log('Notas guardadas');
    const notes = [];
    const allTextTareas = document.querySelectorAll('textarea');

    allTextTareas.forEach(textTarea => {
        notes.push(textTarea.value); // Agrega el valor del textarea al array
    });

    localStorage.setItem('notes', JSON.stringify(notes)); // Guarda el array en localStorage
    
    // Cambia el formato del timestamp a milisegundos
    const now = Date.now(); 
    localStorage.setItem('notesTimestamp', now.toString()); // Guarda en milisegundos

    localStorage.setItem('currentElement', currentElement); // Guarda el índice actual
    saveNotes_DB();

    save.style.display = 'none';
    noSave.style.display = 'none';
    newNote.style.display = 'block';
    back.style.display = 'block';
    right.style.display = 'block';
    if (currentElement == elements.length - 1) {
        right.style.display = 'none';
    }
    if (currentElement == 0) {
        left.style.display = 'none';
    } else {
        left.style.display = 'block';
    }
}


// Función para cargar las notas al iniciar
function loadNotes() {
    console.log('Notas cargadas');
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];

    container.innerHTML = '';
    elements.length = 0; 

    save.style.display = 'none';
    noSave.style.display = 'none';

    if (storedNotes.length > 0) {
        storedNotes.forEach((note) => {
            createNewElement(note); // Crea cada nota desde localStorage
        });

        currentElement = parseInt(localStorage.getItem('currentElement')) || 0;
        let cont = 0; 

        if (currentElement >= 0 && currentElement < elements.length) {
            // Desactiva todas las notas primero
            elements.forEach((element) => {
                element.classList.remove('active', 'hidden-left', 'hidden-right'); // Limpiar clases previas

                // Posiciona las notas en relación a currentElement
                if (cont < currentElement) {
                    element.classList.add('hidden-left');
                } else if (cont > currentElement) {
                    element.classList.add('hidden-right');
                }

                cont += 1;
            });

            // Activa solo la nota actual almacenada en currentElement
            elements[currentElement].classList.add('active');

            // Actualiza el número de nota
            numberNote.innerHTML = "Nota " + (currentElement + 1);

            //visibilidad de botones
            left.style.display = currentElement > 0 ? 'block' : 'none';
            right.style.display = currentElement < elements.length - 1 ? 'block' : 'none';
            newNote.style.display = 'block';
            back.style.display = 'block';
        } else {
            // En caso de que currentElement esté fuera de rango
            currentElement = 0;
            numberNote.innerHTML = "No hay notas disponibles";
            left.style.display = 'none';
            right.style.display = 'none';
            newNote.style.display = 'block';
            back.style.display = 'block';
        }
    } else {
        // Si no hay notas guardadas
        numberNote.innerHTML = "No hay notas disponibles";
        right.style.display = 'none';
        left.style.display = 'none';
        newNote.style.display = 'block';
        back.style.display = 'block';
    }
}

// Llama a la función para cargar las notas al iniciar
loadNotes();

function saveNotes_DB() {
    const notes = [];
    const allTextTareas = document.querySelectorAll('textarea');

    allTextTareas.forEach(textTarea => {
        notes.push(textTarea.value); // Agrega el valor del textarea al array
    });

    localStorage.setItem('notes', JSON.stringify(notes)); // Guarda el array en localStorage

    // Enviar las notas a la base de datos
    fetch('save_note.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `notes=${encodeURIComponent(JSON.stringify(notes))}`
    })
    .then(response => {
        // Verificar si la respuesta fue exitosa
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        // Intentar convertir la respuesta a JSON
        return response.text().then(text => {
            try {
                return JSON.parse(text); // Intentar parsear como JSON
            } catch (e) {
                throw new Error('No es un JSON válido: ' + text); // Si no es JSON, mostrar el texto de respuesta
            }
        });
    })
    .then(data => {
        // Comprobar si la respuesta JSON contiene éxito o error
        if (data.success) {
            console.log(data.success);  // Mostrar éxito
        } else if (data.error) {
            console.log(data.error);  // Mostrar error
        }
    })
    .catch(error => {
        console.error('Error al guardar las notas: ', error);
    });
}

window.addEventListener('beforeunload', function (event) {
    saveNotes_DB(); // Guarda en la base de datos al cerrar
    console.log("Se ha guardado en la base de datos");

    container.innerHTML = '';
    elements.length = 0; 
    numberNote.innerHTML = "No hay notas disponibles";
});

function showYesNot(textInput){

    if (textInput.value.trim() !== '') {
        save.style.display = 'block';
        noSave.style.display = 'block';
        left.style.display = 'none';
        right.style.display = 'none';
        newNote.style.display = 'none';
        back.style.display = 'none';
    }
}


// Listeners para los botones
document.getElementById('newNote').addEventListener('click', () => createNewElement(''));
document.getElementById('nextNote').addEventListener('click', showNextElement);
document.getElementById('previousNote').addEventListener('click', showPrevElement);
document.getElementById('save').addEventListener('click', saveNotes);
document.getElementById('noSave').addEventListener('click', loadNotes);
