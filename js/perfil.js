// Cargar la foto de perfil al cargar la página
function init() {
    consultarNombre();
    fetch('get_user_data.php')
        .then(response => response.json())
        .then(data => {
            const userProfilePic = document.getElementById('userProfilePic');
            if (data.success && data.profile_pic) {
                userProfilePic.src = data.profile_pic;
            } else {
                // Si no hay foto, usar la imagen predeterminada
                userProfilePic.src = './images/qqq.png';
            }
            userProfilePic.style.display = 'inline-block';
        })
        .catch(error => {
            console.error('Error al cargar datos:', error);
            // En caso de error, usa la imagen predeterminada
            document.getElementById('userProfilePic').src = './images/qqq.png';
        });
}

function consultarNombre() {
    fetch('getChildName.php')
        .then(response => response.json())
        .then(data => {
            if (data.nombre) {
                document.getElementById('text').textContent = `Control parental de ${data.nombre}`;
            } else {
                document.getElementById('text').textContent = data.error;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('text').textContent = 'Error al consultar el nombre';
        });
}

// Llamada a init() para cargar la imagen de perfil al cargar la página
window.onload = init;


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

// Mostrar el popup para confirmar la contraseña de administrador
function openPasswordPopup() {
    document.getElementById('passwordPopup').style.display = 'block';
}

// Cerrar el popup de confirmación de contraseña
function closePasswordPopup() {
    document.getElementById('passwordPopup').style.display = 'none';
}

// Confirmar la contraseña para eliminar la cuenta
function confirmPassword() {
    const password = document.getElementById('adminPassword').value;

    if (!password) {
        alert("Por favor, ingresa la contraseña.");
        return;
    }
}
