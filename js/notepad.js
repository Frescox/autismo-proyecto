
const $textInput = document.getElementById('textInput');

class Note {
    constructor(id, content) {
        this.id = id;
        this.content = content;
    }
}

class NoteManager {
    constructor() {
        this.notes = JSON.parse(localStorage.getItem('notes')) || [];
        this.currentNoteId = this.notes.length > 0 ? this.notes[0].id : 1;
    }

    calculateNextId() {
        if (this.notes.length === 0) return 1;
        return Math.max(...this.notes.map(note => note.id)) + 1;
    }

    // Función para cargar el contenido de una nota por su ID
    loadNoteContent(noteId) {
        const note = this.notes.find(n => n.id === noteId);
        if (note) {
            $('#textInput').val(note.content);
            this.saveNotes();
            console.log('Nota ' + note.id + ' cargada.');
        } else {
            console.log(`No se encontró la nota con ID ${noteId}.`);
        }
    }

    // Función para crear una nueva nota
    createNewNote() {
        const newNoteId = 1
        const newNote = { id: newNoteId, content: "" };
        this.notes.push(newNote);
        this.goToNextNote();
        this.saveNotes();
        this.loadNoteContent(newNote.id);
    }

    // Guardar las notas en localStorage
    saveNotes() {
        localStorage.setItem('notes', JSON.stringify(this.notes));
    }

    // Método para actualizar el contenido de la nota actual
    updateCurrentNoteContent(noteId, newContent) {
        const noteIndex = this.notes.findIndex(n => n.id === noteId); // Buscar el índice de la nota con el ID proporcionado
        if (noteIndex !== -1) {
            this.notes[noteIndex].content = newContent; // Actualizar el contenido de la nota
            this.saveNotes();
            console.log(`Nota con ID ${noteId} actualizada.`); 
        } else {
            console.error(`No se encontró la nota con ID ${noteId} para actualizar.`); // Manejo de errores
        }
    }


    goToNextNote() {
        const currentIndex = this.notes.findIndex(n => n.id === this.currentNoteId);
        if (currentIndex !== -1 && currentIndex < this.notes.length - 1) {
            this.currentNoteId = this.notes[currentIndex + 1].id;
            console.log('Nota número ' + this.currentNoteId + ' encontrada.');
            this.loadNoteContent(this.currentNoteId);
        } else {
            console.log("No hay más notas disponibles.");
        }
    }


    // Función para eliminar una nota completa del localStorage
    removeNote(noteId) {
        const noteIndex = this.notes.findIndex(n => n.id === noteId);
        if (noteIndex !== -1) {
            // Eliminar la nota del array de notas
            this.notes.splice(noteIndex, 1);
            this.reassignIds(); // Reasignar los IDs después de eliminar la nota
            this.saveNotes(); // Guardar el array actualizado en localStorage
            console.log(`Nota con ID ${noteId} eliminada del localStorage.`);
        } else {
            console.log(`No se encontró la nota con ID ${noteId}.`);
        }
    }

    // Función para reasignar los IDs de las notas en orden ascendente
    reassignIds() {
        this.notes.forEach((note, index) => {
            note.id = index + 1; // Asignar un nuevo ID basado en el índice
        });
    }

    // Cargar las notas desde localStorage
    loadNotes() {
        this.notes = JSON.parse(localStorage.getItem('notes')) || [];
    }

    
}

    $(document).ready(function() {
        document.getElementById("BtnGoBack2").onclick = function() {
            setTimeout(function() {
                window.location.href = "inicio_notas.html";
            }, 500);
        };
    });

document.addEventListener('DOMContentLoaded', function() {
    const textInput = document.getElementById('textInput');

    // Crear una instancia de NoteManager
    const noteManager = new NoteManager();

    // Cargar el contenido de la nota actual al cargar la página
    console.log('Entrando a la nota:' + noteManager.currentNoteId);
    noteManager.loadNoteContent(noteManager.currentNoteId);

    // Guardar automáticamente cuando el contenido del textarea cambia
    textInput.addEventListener('input', function() {
        const noteContent = textInput.value; // Obtener el contenido actual del textarea
        noteManager.updateCurrentNoteContent(noteManager.currentNoteId, noteContent); // Actualizar el contenido de la nota actual
    });
});

export { NoteManager, Note }; // Exportar las clases
