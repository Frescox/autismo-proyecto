let currentElement = 0;
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
const niño = document.getElementById('text');
let oldNote = '';
let currentNote = ""; 

function createNewElement(content = '') {
    const newElement = document.createElement('div');
    newElement.classList.add('note');

    const textTarea = document.createElement('textarea');
    textTarea.placeholder = `Escribe algo en la nota ${elements.length + 1}`;
    textTarea.id = `textInput${elements.length + 1}`;
    textTarea.className = 'textInput';

    textTarea.value = content;

    textTarea.addEventListener('input', () => showYesNot(textTarea));

    newElement.appendChild(textTarea);
    container.appendChild(newElement);
    elements.push(newElement);

    if (elements.length === 1) {
        currentElement = 0;
        numberNote.innerHTML = "Nota " + (currentElement + 1);
        newElement.classList.add('active');
        label.classList.add('hidden');
        left.style.display = 'none';
        right.style.display = 'none';
    } else {
        if (currentElement < elements.length - 1) {
            for (let i = currentElement; i < elements.length; i++) {
                showNextElement();
            }
            right.style.display = 'none';
        }
    }
}

function showNextElement() {
    if (elements.length > 1 && currentElement < elements.length - 1) {
        elements[currentElement].classList.add('hidden-left');
        elements[currentElement].classList.remove('active');

        currentElement = (currentElement + 1) % elements.length;

        elements[currentElement].classList.remove('hidden-right', 'hidden-left');
        elements[currentElement].classList.add('active');

        oldNote = elements[currentElement].querySelector('.textInput').value;
        console.log('Notas guardadas. Nota anterior: ' + oldNote);

        numberNote.innerHTML = "Nota " + (currentElement + 1);
        left.style.display = 'block';
    }

    if (currentElement == elements.length - 1) {
        right.style.display = 'none';
    }
}

function showPrevElement() {
    if ((elements.length > 1 && currentElement != 0)) {
        elements[currentElement].classList.add('hidden-right');
        elements[currentElement].classList.remove('active');

        currentElement = (currentElement - 1 + elements.length) % elements.length;

        elements[currentElement].classList.remove('hidden-right', 'hidden-left');
        elements[currentElement].classList.add('active');

        oldNote = elements[currentElement].querySelector('.textInput').value;
        console.log('Notas guardadas. Nota anterior: ' + oldNote);

        numberNote.innerHTML = "Nota " + (currentElement + 1);
        right.style.display = 'block';
    }
    if (currentElement == 0) {
        left.style.display = 'none';
    }
}

function saveNotes() {
    const notes = [];
    const allTextTareas = document.querySelectorAll('textarea');

    allTextTareas.forEach((textTarea, index) => {
        notes.push(textTarea.value);

        if (index === currentElement) {
            currentNote = textTarea.value;
        }
    });
    console.log('Nota anterior guardada: ' + oldNote);
    console.log('Nota actual guardada: ' + currentNote);

    localStorage.setItem('notes', JSON.stringify(notes));

    const now = Date.now();
    localStorage.setItem('notesTimestamp', now.toString());

    localStorage.setItem('currentElement', currentElement);

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

    loadNotes();
}


function loadNotes() {
    consultarNombre();
    console.log('Notas cargadas');
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];

    container.innerHTML = '';
    elements.length = 0;

    save.style.display = 'none';
    noSave.style.display = 'none';

    if (storedNotes.length > 0) {
        storedNotes.forEach((note) => {
            createNewElement(note);
        });

        currentElement = parseInt(localStorage.getItem('currentElement')) || 0;
        let cont = 0;

        if (currentElement >= 0 && currentElement < elements.length) {
            elements.forEach((element) => {
                element.classList.remove('active', 'hidden-left', 'hidden-right');

                if (cont < currentElement) {
                    element.classList.add('hidden-left');
                } else if (cont > currentElement) {
                    element.classList.add('hidden-right');
                }

                cont += 1;
            });

            elements[currentElement].classList.add('active');

            oldNote = storedNotes[currentElement];
            console.log('Nota anterior guardada: ' + oldNote);

            numberNote.innerHTML = "Nota " + (currentElement + 1);

            left.style.display = currentElement > 0 ? 'block' : 'none';
            right.style.display = currentElement < elements.length - 1 ? 'block' : 'none';
            newNote.style.opacity = 1;
            newNote.style.pointerEvents = 'auto';
            back.style.pointerEvents = 'auto';
            back.style.opacity = 1;
        } else {
            currentElement = 0;
            numberNote.innerHTML = "No hay notas";
            left.style.display = 'none';
            right.style.display = 'none';
            newNote.style.opacity = 1;
            newNote.style.pointerEvents = 'auto';
            back.style.pointerEvents = 'auto';
            back.style.opacity = 1;
        }
    } else {
        numberNote.innerHTML = "No hay notas";
        right.style.display = 'none';
        left.style.display = 'none';
        newNote.style.opacity = 1;
        newNote.style.pointerEvents = 'auto';
        back.style.pointerEvents = 'auto';
        back.style.opacity = 1;
    }
}

loadNotes();

function saveNotes_DB() {
    console.log('Entra a la función para guardar en DB');
    
    fetch('save_note.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `oldNote=${encodeURIComponent(oldNote)}&currentNote=${encodeURIComponent(currentNote)}`
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        return response.text();
    })
    .then(data => {
        if (data.includes("Notas guardadas con éxito.")) {
            console.log("Notas guardadas con éxito.");
        } else {
            console.log(data);
        }
    })
    .catch(error => {
        console.error('Error al guardar las notas: ', error);
    });
}

function showYesNot(textInput){
    if (textInput.value.trim() !== '') {
        save.style.display = 'block';
        noSave.style.display = 'block';
        left.style.display = 'none';
        right.style.display = 'none';
        newNote.style.opacity = 0.5;
        newNote.style.pointerEvents = 'none';
        back.style.pointerEvents = 'none';
        back.style.opacity = 0.5;
    }
}

function consultarNombre() {
    fetch('getChildName.php')
        .then(response => response.json())
        .then(data => {
            if (data.nombre) {
                document.getElementById('text').textContent = `¡Hola ${data.nombre} !`;
            } else {
                document.getElementById('text').textContent = data.error;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('text').textContent = 'Error al consultar el nombre';
        });
}






document.getElementById('newNote').addEventListener('click', () => createNewElement(''));
document.getElementById('nextNote').addEventListener('click', showNextElement);
document.getElementById('previousNote').addEventListener('click', showPrevElement);
document.getElementById('save').addEventListener('click', saveNotes);
document.getElementById('noSave').addEventListener('click', loadNotes);
