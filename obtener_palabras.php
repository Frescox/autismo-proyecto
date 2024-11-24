<?php
include("connection.php");
// Iniciar sesión para acceder al UUID del usuario actual
session_start();
$child_uuid = $_SESSION['uuid'];  // Se espera que el UUID esté en la sesión

// Procesar solicitud GET
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (!empty($child_uuid)) {
        $sql = "SELECT words FROM child_config WHERE child_uuid = ?";
        $stmt = $con->prepare($sql);
        $stmt->bind_param("s", $child_uuid);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $words = json_decode($row['words'], true) ?? [];
            echo json_encode(["success" => true, "words" => $words]);
        } else {
            echo json_encode(["success" => true, "words" => []]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Faltan datos"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Método no permitido"]);
}

$con->close();
?>
