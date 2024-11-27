<?php
session_start();

// Verificar si el UUID fue enviado por POST
if (isset($_POST['uuid'])) {
    $_SESSION['uuid'] = $_POST['uuid'];
    
    // Redireccionar a la página de destino
    header("Location: interfaz_menu.php");
    exit();
} else {
    echo "Error: UUID no encontrado.";
}
