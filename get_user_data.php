<?php
session_start();
include("connection.php");

if (!isset($_SESSION['uuid'])) {
    die(json_encode(["success" => false, "message" => "Usuario no autenticado"]));
}

$user_id = $_SESSION['uuid'];
$sql = "SELECT profile_pic FROM child_users WHERE uuid = ?";
$stmt = $con->prepare($sql);
$stmt->bind_param("s", $user_id);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
    // Si no hay una foto asignada, se usa la predeterminada
    $profilePic = !empty($row['profile_pic']) ? $row['profile_pic'] : './images/qqq.png';
    echo json_encode(["success" => true, "profile_pic" => $profilePic]);
} else {
    echo json_encode(["success" => false, "message" => "No se encontraron datos"]);
}


$stmt->close();
$con->close();
?>
