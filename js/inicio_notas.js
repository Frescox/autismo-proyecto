
// Importar la clase NoteManager
import { NoteManager } from "./notepad.js";

// Crear una instancia de NoteManager
let noteManager = new NoteManager();

try {
    let iframe = document.getElementById('notePreview');
    iframe.onload = function() {
        let iframeDocument = iframe.contentWindow.document;
        let elementsToHide = iframeDocument.querySelectorAll('#footerNote');
        elementsToHide.forEach(el => el.style.display = 'none');
    };
} catch (error) {
    console.error('Error accediendo al iframe:', error);
}

$(document).ready(function() {
    // Crear una instancia de NoteManager
    const noteManager = new NoteManager(); // Asegúrate de tener definida esta instancia

    document.getElementById('upDateNote').onclick = function() {
        // Verifica si la lista de notas está vacía
        if (noteManager.notes.length === 0) {
            // Crea una nueva nota si no hay ninguna
            console.log("No hay notas, creando una nueva nota.");
            noteManager.createNewNote();
            // Redirige a notePad.html si hay notas
            console.log('Contenido de la nota actualizado.');
            setTimeout(function() {
                window.location.href = "notePad.html"; // Redirige a la página notePad.html
            }, 500);
        } else {
            console.log('Contenido de la nota actualizado.');
            setTimeout(function() {
                window.location.href = "notePad.html"; // Redirige a la página notePad.html
            }, 500);
        }
    };
    
    // Botón para eliminar notas
    document.getElementById('removeBtn').onclick = function() {
        console.log('Borrando nota actual.');
        noteManager.removeNote(noteManager.currentNoteId); // Eliminar solo la nota actual
        $('#textInput').val(''); // Limpiar el área de texto
        window.location.reload();
    };

    document.getElementById('BtnGoBack1').onclick = function() {
        console.log('Mostrando contenido de localStorage.');
        noteManager.showLocalStorage(); // Mostrar el contenido del almacenamiento
    };

    // Cargar el contenido de la nota actual al cargar la página
    noteManager.loadNoteContent(noteManager.currentNoteId); 
});

$(document).ready(function() {
    document.getElementById("BtnGoBack1").onclick = function() {
        setTimeout(function() {
            window.location.href = "interfaz_menu.html";
        }, 500);
    };
});
