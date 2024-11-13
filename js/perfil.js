// Función para abrir el popup de foto
function openPhotoPopup() {
    document.getElementById('photoPopup').style.display = 'block';
}

// Función para cerrar el popup de foto
function closePhotoPopup() {
    document.getElementById('photoPopup').style.display = 'none';
}

// Función para previsualizar la imagen seleccionada
function previewPhoto(event) {
    var file = event.target.files[0];
    var reader = new FileReader();

    reader.onload = function () {
        var photoPreview = document.getElementById('photoPreview');
        photoPreview.src = reader.result;
        photoPreview.style.display = 'block'; // Mostrar la imagen
    };
    reader.readAsDataURL(file);
}

// Función para aceptar la imagen
function acceptPhoto() {
    closePhotoPopup();
    alert("Foto de perfil actualizada.");
}

// Función para abrir el popup de eliminar cuenta
function openDeletePopup() {
    document.getElementById('deletePopup').style.display = 'block';
}

// Función para cerrar el popup de eliminar cuenta
function closeDeletePopup() {
    document.getElementById('deletePopup').style.display = 'none';
}

// Función para abrir el popup de contraseña
function openPasswordPopup() {
    document.getElementById('passwordPopup').style.display = 'block';
}

// Función para cerrar el popup de contraseña
function closePasswordPopup() {
    document.getElementById('passwordPopup').style.display = 'none';
}

// Función para confirmar la contraseña
function confirmPassword() {
    var password = document.getElementById('adminPassword').value;
    if (password === "admin123") { // Contraseña de ejemplo
        alert("Cuenta eliminada.");
        closePasswordPopup();
        closeDeletePopup();
    } else {
        alert("Contraseña incorrecta.");
    }
}
