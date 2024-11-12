let palabras = [];
let palabraActual = "";
let palabraDesordenada = "";
let respuestaUsuario = [];

// Cargar el archivo .csv
Papa.parse("./palabras/palabras.csv", {
    download: true,
    header: true,
    complete: function(results) {
        palabras = results.data.map(row => row.Palabra);
        cargarNuevaPalabra();
    }
});

async function cargarNuevaPalabra() {
    document.getElementById("continuar-btn");
    const palabraAleatoria = obtenerPalabraAleatoria();
    palabraActual = palabraAleatoria;
    palabraDesordenada = desordenarPalabra(palabraAleatoria);
    respuestaUsuario = [];

    await mostrarImagen(palabraAleatoria);
    mostrarLetrasDesordenadas(palabraDesordenada);
    mostrarEspacios(palabraAleatoria);
}

function obtenerPalabraAleatoria() {
    const indiceAleatorio = Math.floor(Math.random() * palabras.length);
    return palabras[indiceAleatorio];
}

function desordenarPalabra(palabra) {
    const letras = palabra.split("");
    for (let i = letras.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [letras[i], letras[j]] = [letras[j], letras[i]];
    }
    return letras.join("");
}

async function mostrarImagen(palabra) {
    const apiKey = "47025182-8154449cd611439901ec5a891"; // Agrega tu clave de Pixabay aquí
    const response = await fetch(`https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(palabra)}&image_type=photo&per_page=3`);
    const data = await response.json();

    if (data.hits.length > 0) {
        const imagenAleatoria = data.hits[Math.floor(Math.random() * data.hits.length)];
        const imagenContainer = document.getElementById("imagen-container");
        imagenContainer.innerHTML = `
            <img src="${imagenAleatoria.webformatURL}" alt="${palabra}" />
        `;
    } else {
        console.log("No se encontraron imágenes para la palabra:", palabra);
    }
}

function mostrarLetrasDesordenadas(palabra) {
    const letrasContainer = document.getElementById("letras-container");
    letrasContainer.innerHTML = "";  // Limpiar el contenedor antes de agregar nuevas letras
    const count = palabra.length;
    letrasContainer.style.gridTemplateColumns = `repeat(${count}, 1fr)`;

    palabra.split("").forEach((letra, index) => {
        const div = document.createElement("div");
        div.classList.add("letter");  // Agregar clase "letter" a cada div
        div.textContent = letra;  // Establecer la letra como contenido de texto
        div.setAttribute("data-index", index);  // Asignar un índice para identificar la letra
        div.onclick = () => seleccionarLetra(index);  // Asociar un evento onclick para seleccionar la letra
        letrasContainer.appendChild(div);  // Añadir el div al contenedor
    });
}

function mostrarEspacios(palabra) {
    const letrasContainer = document.getElementById("letra-container");
    letrasContainer.innerHTML = "";  // Limpiar el contenedor antes de agregar nuevas letras
    const count = palabra.length;
    letrasContainer.style.gridTemplateColumns = `repeat(${count}, 1fr)`;

    palabra.split("").forEach((letra, index) => {
        const div = document.createElement("div");
        div.classList.add("spaceLetter");  // Agregar clase "letter" a cada div
        div.setAttribute("data-index", index);  // Asignar un índice para identificar la letra
        letrasContainer.appendChild(div);  // Añadir el div al contenedor
    });
}


function seleccionarLetra(index) {
    const letrasContainer = document.getElementById("letras-container");
    const letraContainer = document.getElementById("letra-container");

    // Obtener la letra seleccionada
    const letra = letrasContainer.children[index].textContent;

    // Encontrar el primer espacio vacío en letra-container
    const espacioVacio = Array.from(letraContainer.children).find(div => div.textContent === "");

    // Solo continuar si hay un espacio vacío disponible
    if (espacioVacio) {
        // Colocar la letra en el espacio vacío
        espacioVacio.textContent = letra;
        espacioVacio.classList.add("letter");

        // Guardar la letra en la respuesta del usuario
        respuestaUsuario.push(letra);

        // Ocultar la letra en letras-container
        letrasContainer.children[index].style.visibility = "hidden";

        // Validar si se han llenado todos los espacios
        if (respuestaUsuario.length === palabraActual.length) {
            validarRespuesta();
        }
    }
}

function resetearLetras() {
    // Vaciar la respuesta del usuario
    respuestaUsuario = [];
    
    // Selecciona el contenedor de letras
    const letrasContainer = document.getElementById("letras-container");
    const letraContainer = document.getElementById("letra-container");

    // Resetear la visibilidad de cada letra en letras-container
    Array.from(letrasContainer.children).forEach(letra => letra.style.visibility = "visible");

    // Selecciona todos los elementos con la clase 'espacio-vacio'
    const espaciosVacios = document.querySelectorAll(".espacio-vacio");
    
    // Recorre cada espacio vacío y restablece el estilo original
    espaciosVacios.forEach(espacio => {
        espacio.style.backgroundColor = "lightgray";  // Cambia el color de fondo al original
        espacio.textContent = "";                    // Limpia el contenido del espacio
    });
}



function validarRespuesta() {
    const palabraUsuario = respuestaUsuario.join("");
    if (palabraUsuario === palabraActual) {
        setTimeout(() => {
            alert("¡Correcto! Has acomodado la palabra correctamente.");
            document.getElementById("continuar-btn").style.display = "inline";
            resetearLetras();
        }, 200);
    } else {
        setTimeout(() => {
            alert("Incorrecto, intenta de nuevo.");
            resetearLetras();
        }, 200);
    }
}

function resetearLetras() {
    respuestaUsuario = [];
    const letrasContainer = document.getElementById("letras-container");
    const letraContainer = document.getElementById("letra-container");

    // Resetear las letras visibles en letras-container
    Array.from(letrasContainer.children).forEach(letra => letra.style.visibility = "visible");

    // Limpiar los espacios en letra-container
    Array.from(letraContainer.children).forEach(div => div.textContent = "");
}

function terminarJuego() {
    window.location.href = "interfaz_menu.html";
}
