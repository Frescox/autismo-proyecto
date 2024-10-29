const backgroundImages = [
    '../images/fondo.jpg',
    '../images/fondo1.jpg',
    '../images/fondo2.jpg'
];

let currentImageIndex = 0;
const changeInterval = 5000;

function changeBackgroundImage() {
    currentImageIndex = (currentImageIndex + 1) % backgroundImages.length;
    document.body.style.backgroundImage = `url('${backgroundImages[currentImageIndex]}')`;
}

setInterval(changeBackgroundImage, changeInterval);

