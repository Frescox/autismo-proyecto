let wordCount = 0;
const wordsPerSection = 12;

// Mostrar la ventana emergente
function showModal() {
    const modal = document.getElementById('word-modal');
    modal.style.display = 'flex';
}

// Cerrar la ventana emergente
function closeModal() {
    const modal = document.getElementById('word-modal');
    modal.style.display = 'none';
}

// Confirmar la palabra ingresada
function confirmWord() {
    const wordInput = document.getElementById('word-input');
    const word = wordInput.value;
    if (word) {
        addWord(word);
        wordInput.value = ''; // Limpiar el campo de entrada
        closeModal();
    } else {
        alert('Por favor ingresa una palabra.');
    }
}


// Agregar palabra a la lista
function addWord(word) {
    if (wordCount % wordsPerSection === 0) {
        createNewSection();
    }

    const section = document.querySelector('.empty-space').lastElementChild;
    const listItem = document.createElement('li');
    listItem.textContent = word;
    section.querySelector('ul').appendChild(listItem);

    wordCount++;
}

// Crear una nueva sección cuando se alcance el límite de palabras por sección
function createNewSection() {
    const newSection = document.createElement('div');
    newSection.classList.add('word-section');
    newSection.innerHTML = '<ul></ul>';
    document.getElementById('container').appendChild(newSection);
}

