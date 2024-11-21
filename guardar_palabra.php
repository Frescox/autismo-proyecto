<?php
include("connection.php");
// Iniciar sesión para acceder al UUID del usuario actual
session_start();
$child_uuid = $_SESSION['uuid'];  // Se espera que el UUID esté en la sesión

// Procesar solo solicitudes POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Decodificar el cuerpo de la solicitud JSON
    $data = json_decode(file_get_contents('php://input'), true);
    $new_word = $data['word'];  // Obtener la palabra desde el cuerpo JSON

    // Validar entrada
    if (!empty($child_uuid) && !empty($new_word)) {
        // Obtener palabras actuales
        $sql = "SELECT words FROM child_config WHERE child_uuid = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $child_uuid);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $current_words = json_decode($row['words'], true) ?? [];

            // Agregar la nueva palabra
            $current_words[] = $new_word;

            // Actualizar palabras
            $updated_words = json_encode($current_words);
            $update_sql = "UPDATE child_config SET words = ? WHERE child_uuid = ?";
            $update_stmt = $conn->prepare($update_sql);
            $update_stmt->bind_param("ss", $updated_words, $child_uuid);
            $update_stmt->execute();
        } else {
            // Crear un nuevo registro si no existe
            $new_words = json_encode([$new_word]);
            $insert_sql = "INSERT INTO child_config (child_uuid, words) VALUES (?, ?)";
            $insert_stmt = $conn->prepare($insert_sql);
            $insert_stmt->bind_param("ss", $child_uuid, $new_words);
            $insert_stmt->execute();
        }

        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "message" => "Datos incompletos"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Método no permitido"]);
}

$conn->close();
?>
