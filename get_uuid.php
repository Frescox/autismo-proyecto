<?php
session_start();

// Verificar si el UUID está disponible en la sesión
if (isset($_SESSION['uuid'])) {
    echo json_encode(["success" => true, "uuid" => $_SESSION['uuid']]);
} else {
    echo json_encode(["success" => false, "message" => "UUID no disponible en la sesión"]);
}
?>
