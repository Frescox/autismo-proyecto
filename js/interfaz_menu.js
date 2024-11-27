// Elementos de la interfaz del menú
const header = document.getElementsByTagName("header")[0] || null;
const footer = document.getElementsByTagName("footer")[0] || null;
const colorPicker_hf = document.getElementById('colorPicker') || null;
const colorPicker_title = document.getElementById('colorPicker_title') || null;
const colorPicker_text = document.getElementById('colorPicker_text') || null;
const colorPicker_bg = document.getElementById('colorPicker_bg') || null;
const title = document.getElementsByTagName('h1') || [];
const textos = document.getElementsByTagName('p') || [];
const fondo = document.getElementsByTagName('body')[0] || null;

//Elemento por separado del juego de letras
const lettersTitle = document.getElementsByClassName('letterBreaker')[0] || null;

// Asignar listeners solo si los color pickers existen
if (colorPicker_hf) {
    colorPicker_hf.addEventListener('input', actualizarColores);
    colorPicker_hf.addEventListener('change', register);
}

if (colorPicker_title) {
    colorPicker_title.addEventListener('input', actualizarColores);
    colorPicker_title.addEventListener('change', register);
}

if (colorPicker_text) {
    colorPicker_text.addEventListener('input', actualizarColores);
    colorPicker_text.addEventListener('change', register);
}

if (colorPicker_bg) {
    colorPicker_bg.addEventListener('input', actualizarColores);
    colorPicker_bg.addEventListener('change', register);
}

// Función para actualizar colores con validaciones
function actualizarColores(event) {

    if (event.target === colorPicker_hf) {
        header.style.backgroundColor = event.target.value;
        footer.style.backgroundColor = event.target.value;
    } else if (event.target === colorPicker_title) {
        for (let i = 0; i < title.length; i++) {
            const txt = title[i];
            txt.style.color = event.target.value;
        }
    } else if (event.target === colorPicker_text) {
        for (let i = 0; i < textos.length; i++) {
            const txt = textos[i];
            txt.style.color = event.target.value;
        }
    } else if (event.target === colorPicker_bg && fondo) {
        fondo.style.backgroundColor = event.target.value;
    }
}


// Función para registrar configuración
function register() {
    const colores = {
        header_footer: colorPicker_hf.value,
        title: colorPicker_title.value,
        text: colorPicker_text.value,
        bg: colorPicker_bg.value,
    };

    const jsonData = JSON.stringify(colores);

    // Enviar datos al servidor
    fetch('save_conf.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData
    }).catch(error => console.error('Error al enviar:', error));
}

// Función para inicializar configuraciones al cargar la página
function init() {
    let colorGuardado;
    consultarNombre();
    fetch('get_conf.php')
        .then(respuesta => respuesta.json())
        .then(data => {
            colorGuardado = data;
            if (colorGuardado) {
                header.style.backgroundColor = colorGuardado.header_footer;
                footer.style.backgroundColor = colorGuardado.header_footer;
    
                for (let i = 0; i < title.length; i++) {
                    title[i].style.color = colorGuardado.title;
                }

                if (lettersTitle) {
                    lettersTitle.style.color = colorGuardado.title;
                }
    
                for (let i = 0; i < textos.length; i++) {
                    textos[i].style.color = colorGuardado.text;
                }
                
                if (!fondo.classList.contains('no-change')) {
                    fondo.style.backgroundColor = colorGuardado.bg;
                }
    
                // Actualizar los valores de los color pickers
                colorPicker_hf.value = colorGuardado.header_footer;
                colorPicker_title.value = colorGuardado.title;
                colorPicker_text.value = colorGuardado.text;
                colorPicker_bg.value = colorGuardado.bg;
            }

        })
        .catch(error => console.error('Error:', error));
}

function consultarNombre() {
    fetch('getChildName.php')
        .then(response => response.json())
        .then(data => {
            if (data.nombre) {
                document.getElementById('text').textContent = `¡Bienvenido, ${data.nombre}!`;
            } else {
                document.getElementById('text').textContent = data.error;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('text').textContent = 'Error al consultar el nombre';
        });
}

window.onload = init;
