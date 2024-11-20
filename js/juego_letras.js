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
    const apiKey = "47025182-8154449cd611439901ec5a891"; 
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
    const espacioVacioArriba = Array.from(letraContainer.children).find(div => div.textContent === "");

    // Solo continuar si hay un espacio vacío disponible
    if (espacioVacioArriba) {
        // Colocar la letra en el espacio vacío
        espacioVacioArriba.textContent = letra;
        espacioVacioArriba.classList.add("letter");

        // Guardar la letra en la respuesta del usuario junto con su índice
        respuestaUsuario.push({ letra, index });

        // Ocultar la letra en letras-container
        letrasContainer.children[index].style.visibility = "hidden";

        // Añadir un evento al espacio para que se pueda deseleccionar
        espacioVacioArriba.onclick = () => deseleccionarLetra(espacioVacioArriba, index);

        // Validar si se han llenado todos los espacios
        if (respuestaUsuario.length === palabraActual.length) {
            validarRespuesta();
        }
    }
}

function deseleccionarLetra(espacioVacio, index) {
    const letrasContainer = document.getElementById("letras-container");

    // Restaurar la visibilidad de la letra en letras-container
    letrasContainer.children[index].style.visibility = "visible";

    // Limpiar el contenido del espacio vacío
    espacioVacio.textContent = "";
    espacioVacio.classList.remove("letter");

    // Remover el evento de clic del espacio vacío
    espacioVacio.onclick = null;

    // Eliminar la letra del array respuestaUsuario de forma precisa
    respuestaUsuario = respuestaUsuario.filter(item => item.index !== index);
}

function resetearLetras() {
    respuestaUsuario = [];
    
    // Selecciona el contenedor de letras
    const letrasContainer = document.getElementById("letras-container");
    const letraContainer = document.getElementById("letra-container");

    // Resetear la visibilidad de cada letra en letras-container
    Array.from(letrasContainer.children).forEach(letra => letra.style.visibility = "visible");
}



function validarRespuesta() {
    const palabraUsuario = respuestaUsuario.map(item => item.letra).join("");
    const congratulations = document.getElementById("congratulations");
    const letrasIncorrectas = document.getElementsByClassName("spaceLetter");
    const correct = new Audio('./images/correct.mp3');
    const incorrect = new Audio('./images/incorrect.mp3');

    if (palabraUsuario === palabraActual) {
        correct.play();
        congratulations.style.display = "block";
        congratulations.style.animationPlayState = "running";
        Array.from(letrasIncorrectas).forEach(letra => {
            letra.style.border = "2px solid green";
        });
        setTimeout(() => {
            document.getElementById("continuar-btn").style.display = "inline";
            congratulations.style.display = "none"; 
            congratulations.style.animationPlayState = "paused";
            Array.from(letrasIncorrectas).forEach(letra => {
                letra.style.border = "2px solid  #9cc6e1";
            });
            cargarNuevaPalabra();
        }, 2000);
    } else {
        Array.from(letrasIncorrectas).forEach(letra => {
            letra.style.border = "2px solid red";
        });
        incorrect.play();
        setTimeout(() => {
            Array.from(letrasIncorrectas).forEach(letra => {
                letra.style.border = "2px solid #9cc6e1";
            });
            resetearLetras();
        }, 1000);
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
