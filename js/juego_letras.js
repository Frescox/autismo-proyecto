let palabras = [];
let palabraActual = "";
let palabraDesordenada = "";
let respuestaUsuario = [];
const presion = new Audio('./images/burbuja.mp3');
const correct = new Audio('./images/correcto1.mp3');
const incorrect = new Audio('./images/incorrect.mp3');
let tiempoTotal = 0; // Tiempo total en segundos
let intervaloTiempo;
let sesionIniciada = false; // Control para verificar si ya se incrementó la sesión
let errores = {}; // Objeto para rastrear los errores por palabra

// Cargar palabras desde el CSV
Papa.parse("./palabras/palabras.csv", {
    download: true,
    header: true,
    complete: function (results) {
        palabras = results.data.map(row => row.Palabra);
        cargarNuevaPalabra();
    }
});

async function cargarNuevaPalabra() {
    document.getElementById("continuar-btn");

    // Incrementar sesión solo si no se ha iniciado
    if (!sesionIniciada) {
        iniciarSesion();
        sesionIniciada = true; // Marcar la sesión como iniciada
    }

    const palabraAleatoria = obtenerPalabraAleatoria();
    palabraActual = palabraAleatoria;
    palabraDesordenada = desordenarPalabra(palabraAleatoria);
    respuestaUsuario = [];
    errores[palabraActual] = errores[palabraActual] || 0; // Inicializar contador de errores para la palabra

    await mostrarImagen(palabraAleatoria);
    mostrarLetrasDesordenadas(palabraDesordenada);
    mostrarEspacios(palabraAleatoria);
}

function iniciarSesion() {
    // Incrementar el contador de sesiones en el backend
    fetch('registro_estadisticas.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            action: 'incrementar_sesion',
        }),
    }).catch(error => console.error('Error al incrementar la sesión:', error));

    // Iniciar el contador de tiempo de juego
    intervaloTiempo = setInterval(() => {
        tiempoTotal += 1;
    }, 1000);
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
    letrasContainer.innerHTML = "";
    const count = palabra.length;
    letrasContainer.style.gridTemplateColumns = `repeat(${count}, 1fr)`;

    palabra.split("").forEach((letra, index) => {
        const div = document.createElement("div");
        div.classList.add("letter");
        div.textContent = letra;
        div.setAttribute("data-index", index);
        div.onclick = () => seleccionarLetra(index);
        letrasContainer.appendChild(div);
    });
}

function mostrarEspacios(palabra) {
    const letrasContainer = document.getElementById("letra-container");
    letrasContainer.innerHTML = "";
    const count = palabra.length;
    letrasContainer.style.gridTemplateColumns = `repeat(${count}, 1fr)`;

    palabra.split("").forEach((letra, index) => {
        const div = document.createElement("div");
        div.classList.add("spaceLetter");
        div.setAttribute("data-index", index);
        letrasContainer.appendChild(div);
    });
}

function seleccionarLetra(index) {
    const letrasContainer = document.getElementById("letras-container");
    const letraContainer = document.getElementById("letra-container");

    const letra = letrasContainer.children[index].textContent;

    const espacioVacioArriba = Array.from(letraContainer.children).find(div => div.textContent === "");
    presion.play();

    if (espacioVacioArriba) {
        espacioVacioArriba.textContent = letra;
        espacioVacioArriba.classList.add("letter");

        respuestaUsuario.push({ letra, index });

        letrasContainer.children[index].style.visibility = "hidden";

        espacioVacioArriba.onclick = () => deseleccionarLetra(espacioVacioArriba, index);

        if (respuestaUsuario.length === palabraActual.length) {
            validarRespuesta();
        }
    }
}

function deseleccionarLetra(espacioVacio, index) {
    const letrasContainer = document.getElementById("letras-container");
    presion.play();
    letrasContainer.children[index].style.visibility = "visible";

    espacioVacio.textContent = "";
    espacioVacio.classList.remove("letter");

    espacioVacio.onclick = null;

    respuestaUsuario = respuestaUsuario.filter(item => item.index !== index);
}

function resetearLetras() {
    respuestaUsuario = [];
    const letrasContainer = document.getElementById("letras-container");
    const letraContainer = document.getElementById("letra-container");

    Array.from(letrasContainer.children).forEach(letra => letra.style.visibility = "visible");

    Array.from(letraContainer.children).forEach(div => div.textContent = "");
}

function validarRespuesta() {
    const palabraUsuario = respuestaUsuario.map(item => item.letra).join("");
    const letrasIncorrectas = document.getElementsByClassName("spaceLetter");

    if (palabraUsuario === palabraActual) {
        correct.play();

        // Marcar como palabra dominada
        fetch('registro_estadisticas.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'palabra_dominada',
                palabra: palabraActual,
            }),
        });

        Array.from(letrasIncorrectas).forEach(letra => {
            letra.style.border = "2px solid green";
        });
        setTimeout(() => {
            document.getElementById("continuar-btn").style.display = "inline";
            Array.from(letrasIncorrectas).forEach(letra => {
                letra.style.border = "2px solid  #9cc6e1";
            });
            cargarNuevaPalabra();
        }, 2000);
    } else {
        errores[palabraActual] = (errores[palabraActual] || 0) + 1; // Incrementar contador de errores

        // Si los errores superan el límite, agregar a palabras difíciles
        if (errores[palabraActual] >= 10) {
            fetch('registro_estadisticas.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'palabra_dificil',
                    palabra: palabraActual,
                }),
            });
        }

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

window.addEventListener('beforeunload', () => {
    clearInterval(intervaloTiempo);
    const tiempoEnJuego = tiempoTotal;

    fetch('registro_estadisticas.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            action: 'guardar_tiempo',
            tiempoEnJuego: tiempoEnJuego,
        }),
    }).catch(error => console.error('Error al guardar el tiempo de juego:', error));
});

function terminarJuego() {
    window.location.href = "interfaz_menu.php";
}
