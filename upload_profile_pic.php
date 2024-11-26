<?php
session_start();
include("connection.php");

if (!isset($_SESSION['uuid'])) {
    die("Usuario no autenticado");
}

$user_id = $_SESSION['uuid'];

if (isset($_FILES['profile_pic']) && $_FILES['profile_pic']['error'] === UPLOAD_ERR_OK) {
    $uploadDir = 'images/profile_pic/';
    $fileName = uniqid() . '_' . basename($_FILES['profile_pic']['name']);
    $filePath = $uploadDir . $fileName;

    // Validar tipo de archivo
    $allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!in_array($_FILES['profile_pic']['type'], $allowedTypes)) {
        die("Tipo de archivo no permitido.");
    }

    // Validar tamaño del archivo (máximo 2 MB)
    if ($_FILES['profile_pic']['size'] > 2 * 1024 * 1024) {
        die("El archivo supera el tamaño máximo permitido (2 MB).");
    }

    // Mover archivo
    if (move_uploaded_file($_FILES['profile_pic']['tmp_name'], $filePath)) {
        $stmt = $con->prepare("UPDATE child_users SET profile_pic = ? WHERE uuid = ?");
        $stmt->bind_param("ss", $filePath, $user_id);

        if ($stmt->execute()) {
            echo "Foto de perfil actualizada exitosamente.";
        } else {
            echo "Error al actualizar la base de datos: " . $stmt->error;
        }
        $stmt->close();
    } else {
        echo "Error al mover el archivo.";
    }
} else {
    echo "No se recibió una imagen válida.";
}

$con->close();
?>
