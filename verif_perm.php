<?php

session_start();
include("connection.php");
header('Content-Type: application/json'); // Para devolver datos en formato JSON

// Verifica si hay un ID de usuario en la sesión
if (!isset($_SESSION["user_id"])) {
    echo json_encode(["status" => "error", "message" => "No session ID"]);
    exit;
} else {

    $user_id = $_SESSION["user_id"];
    $query = "SELECT has_perm FROM tutor_users WHERE user_id = '$user_id'";
    $result = mysqli_query($con, $query);
    $row = $result->fetch_assoc();
    $perm = $row['has_perm'];

    if ($perm == 1) { 
        echo json_encode(["status" => "success", "permisos" => (int)$perm]);
    } else {
        echo json_encode(["status" => "fail", "permisos" => (int)$perm]);
    }
}

