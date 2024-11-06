<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
session_start();
include("connection.php");
include("functions.php");

// Verificar si 'uuid' está presente en la sesión
if (!isset($_SESSION['uuid'])) {
    echo json_encode(["error" => "No se ha encontrado el ID del niño en la sesión."]);
    exit;
}

$id = $_SESSION['uuid'];



// Verificar si el user_id existe en la tabla child_users
$sql_check_user = "SELECT * FROM child_users WHERE uuid = '$id' LIMIT 1";
$result_check_user = $con->query($sql_check_user);

if ($result_check_user->num_rows == 0) {
    // Si el usuario no existe en la tabla child_users
    echo json_encode(["error" => "El usuario no existe en la base de datos."]);
    exit;
}

// Verificar que se hayan enviado las notas desde el frontend
if (!isset($_POST['notes'])) {
    echo json_encode(["error" => "Faltan datos."]);
    exit;
}

$notes = json_decode($_POST['notes'], true); // Decodificar las notas enviadas

// Imprimir las notas para depurar
var_dump($notes); // Verifica que las notas estén llegando correctamente desde el frontend

// Verificar que el contenido de las notas no esté vacío
if (empty($notes)) {
    echo json_encode(["error" => "No se recibieron notas válidas."]);
    exit;
}

// Para cada nota recibida, intentar actualizarla o crearla si no existe
foreach ($notes as $note) {
    $note = mysqli_real_escape_string($con, $note);

    // Verificar si ya existe una nota para este usuario
    $sql_check = "SELECT id FROM child_notes WHERE child_id = '$user_id' AND note = '$note' LIMIT 1";
    $result_check = $con->query($sql_check);

    if ($result_check->num_rows > 0) {
        // Si la nota ya existe, actualizarla
        $sql_update = "UPDATE child_notes SET note = '$note', note_date = NOW() WHERE child_id = '$user_id' AND note = '$note'";
        if ($con->query($sql_update) === TRUE) {
            echo json_encode(["success" => "Nota actualizada exitosamente."]);
        } else {
            echo json_encode(["error" => "Error al actualizar la nota: " . $con->error]);
        }
    } else {
        // Si la nota no existe, insertarla
        $sql_insert = "INSERT INTO child_notes (child_id, note) VALUES ('$user_id', '$note')";
        if ($con->query($sql_insert) === TRUE) {
            echo json_encode(["success" => "Nueva nota guardada exitosamente."]);
        } else {
            echo json_encode(["error" => "Error al guardar la nueva nota: " . $con->error]);
        }
    }
}

$con->close(); // Cerrar la conexión
?>
