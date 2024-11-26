// Cargar la foto de perfil al cargar la página
function init() {
    fetch('get_user_data.php')
        .then(response => response.json())
        .then(data => {
            if (data.success && data.profile_pic) {
                const userProfilePic = document.getElementById('userProfilePic');
                userProfilePic.src = data.profile_pic; // Usar la ruta de la imagen
                userProfilePic.style.display = 'inline-block'; // Asegurarse de que se muestre la imagen
            }
        })
        .catch(error => console.error('Error al cargar datos:', error));
}

// Mostrar el popup para seleccionar una foto
function openPhotoPopup() {
    document.getElementById('photoPopup').style.display = 'block';
}

// Cerrar el popup de la foto
function closePhotoPopup() {
    document.getElementById('photoPopup').style.display = 'none';
}

// Vista previa de la foto seleccionada
function previewPhoto(event) {
    const photoPreview = document.getElementById('photoPreview');
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
        photoPreview.src = e.target.result;
        photoPreview.style.display = 'block';
    };
    
    reader.readAsDataURL(file);
}

// Aceptar la foto seleccionada y subirla al servidor
function acceptPhoto() {
    const formData = new FormData();
    const fileInput = document.getElementById('fileInput');
    
    if (fileInput.files.length === 0) {
        alert("No se ha seleccionado ninguna foto.");
        return;
    }

    formData.append('profile_pic', fileInput.files[0]);

    fetch('upload_profile_pic.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        closePhotoPopup();
        init();
    })
    .catch(error => console.error('Error al subir la foto:', error));
}

// Mostrar el popup de eliminar cuenta
function openDeletePopup() {
    document.getElementById('deletePopup').style.display = 'block';
}

// Cerrar el popup de eliminar cuenta
function closeDeletePopup() {
    document.getElementById('deletePopup').style.display = 'none';
}

// Mostrar el popup para confirmar la contraseña de administrador (sin funcionalidad)
function openPasswordPopup() {
    document.getElementById('passwordPopup').style.display = 'block';
}

// Cerrar el popup de confirmación de contraseña
function closePasswordPopup() {
    document.getElementById('passwordPopup').style.display = 'none';
}

// Confirmar la contraseña para eliminar la cuenta (sin funcionalidad)
function confirmPassword() {
    const password = document.getElementById('adminPassword').value;

    if (!password) {
        alert("Por favor, ingresa la contraseña.");
        return;
    }
}
