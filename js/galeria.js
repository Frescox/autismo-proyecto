const backgroundImages = [
    './images/fondo1.jpeg',
    './images/fondo2.jpeg',
    './images/fondo4.jpeg',
    './images/fondo5.jpeg',
    './images/fondo6.jpeg',
    './images/fondo7.jpeg',
    './images/fondo8.jpeg',
    './images/fondo9.jpeg',
];

let currentImageIndex = 0;
const changeInterval = 5000;

function changeBackgroundImage() {
    currentImageIndex = (currentImageIndex + 1) % backgroundImages.length;
    document.body.style.backgroundImage = `url('${backgroundImages[currentImageIndex]}')`;
}

// Ejecuta la función una vez al cargar la página
changeBackgroundImage();

// Cambia la imagen en intervalos definidos
setInterval(changeBackgroundImage, changeInterval);
