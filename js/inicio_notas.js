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
    localStorage.setItem('notesTimestamp', Date.now()); // Guarda la fecha actual
    localStorage.setItem('currentElement', currentElement); // Guarda el índice actual

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
    }else{
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

        // Asegura que currentElement esté dentro del rango de notas
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
checkAndSaveNotesToDB();

function saveNotes_DB() {
    const notes = [];
    const allTextTareas = document.querySelectorAll('textarea');

    allTextTareas.forEach(textTarea => {
            notes.push(textTarea.value); // Agrega el valor del textarea al array
    });

    localStorage.setItem('notes', JSON.stringify(notes)); // Guarda el array en localStorage

    // Envia las notas a la base de datos
    const currentDate = new Date().toISOString().slice(0, 10);//Obtine la fecha

    fetch('save_note.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `user_id=1&notes=${encodeURIComponent(JSON.stringify(notes))}&date=${currentDate}`
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error al guardar las notas: ', error);
    });

}


function checkAndSaveNotesToDB() {
    const lastSavedTimestamp = localStorage.getItem('notesTimestamp');
    const currentTime = Date.now();

    // Se verifica si ya se guardaron notas antes
    if (lastSavedTimestamp) {
        // Se calcula el tiempo transcurrido en horas
        const hoursSinceLastSave = (currentTime - lastSavedTimestamp) / (1000 * 60 * 60);
        
        // Si han pasado más de 6 horas, se procede a guardar en la base de datos
        if (hoursSinceLastSave >= 6) {
            saveNotes_DB(); // Se llama a la función para guardar en la base de datos

            localStorage.clear();
        }
    }
}


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
