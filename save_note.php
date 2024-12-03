<?php
session_start();
include("connection.php");
include("functions.php");

if (!isset($_SESSION['uuid'])) {
    echo "No se ha encontrado el ID del niño";
    exit;
}

$child_id = $_SESSION['uuid'];

if (!isset($_POST['oldNote']) || !isset($_POST['currentNote'])) {
    echo "Faltan datos de la nota anterior o actual.";
    exit;
}

$oldNote = mysqli_real_escape_string($con, $_POST['oldNote']);
$currentNote = mysqli_real_escape_string($con, $_POST['currentNote']);

$check_user_query = "SELECT uuid FROM child_users WHERE uuid = '$child_id' LIMIT 1";
$check_user_result = mysqli_query($con, $check_user_query);

if (mysqli_num_rows($check_user_result) === 0) {
    echo "El ID del niño no existe en la base de datos.";
    exit;
}

$check_note_query = "SELECT id FROM child_notes 
                     WHERE child_id = '$child_id' AND note = '$oldNote' 
                     ORDER BY note_date DESC LIMIT 100";
$check_note_result = mysqli_query($con, $check_note_query);

if (mysqli_num_rows($check_note_result) > 0) {
    $update_query = "UPDATE child_notes 
                     SET note = '$currentNote', note_date = CURDATE() 
                     WHERE id = (SELECT id FROM child_notes 
                                 WHERE child_id = '$child_id' AND note = '$oldNote' 
                                 ORDER BY note_date DESC LIMIT 1)";
    
    if (mysqli_query($con, $update_query)) {
        echo "Nota actualizada con éxito.";
    } else {
        echo "Error al actualizar la nota: " . mysqli_error($con);
    }
} else {
    $insert_query = "INSERT INTO child_notes (child_id, note, note_date) VALUES ('$child_id', '$currentNote', CURDATE())";
    if (mysqli_query($con, $insert_query)) {
        echo "Nota insertada con éxito.";
    } else {
        echo "Error al guardar la nota: " . mysqli_error($con);
    }
}

$con->close();
?>
