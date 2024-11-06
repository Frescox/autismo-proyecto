<?php
// save_note.php
session_start();

include('connection.php');
include('functions.php');

// verifica que el ID del usuario esté disponible en la sesión
if (!isset($_SESSION['user_id'])) {
    echo "No se ha encontrado el ID de usuario.";
    exit;
}

$user_id = $_SESSION['user_id'];
$notes = json_decode($_POST['notes'], true); // Decodifica el JSON enviado desde JavaScript

if (!empty($user_id) && !empty($notes)) {
    foreach ($notes as $note_content) {
        $note_content = mysqli_real_escape_string($conn, $note_content);
        $query = "INSERT INTO users_notes (id_user, content, Fecha) 
                  VALUES ('$user_id', '$note_content', NOW())";

        if (!mysqli_query($conn, $query)) {
            echo "Error: " . mysqli_error($conn);
        }
    }
    echo "Notas guardadas con éxito.";
} else {
    echo "Faltan datos.";
}

$conn->close();
?>
