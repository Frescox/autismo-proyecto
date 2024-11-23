<?php
session_start();
include("connection.php");
include("functions.php");

if (!isset($_SESSION['uuid'])) {
    echo json_encode(["error" => "No se ha encontrado el UUID en la sesión"]);
    exit;
}

$uuid = $_SESSION['uuid'];
$uuid = mysqli_real_escape_string($con, $uuid);

$query = "SELECT name FROM child_users WHERE uuid = '$uuid' LIMIT 1";

$result = mysqli_query($con, $query);

if (mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_assoc($result);
    
    $decrypted_name = decryptData($row['name']);

    echo json_encode(["nombre" => $decrypted_name]);
} else {
    echo json_encode(["error" => "Niño no encontrado"]);
}

$con->close();
?>
