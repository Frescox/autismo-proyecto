<?php
include("connection.php");
session_start();
$child_uuid = $_SESSION['uuid']; 

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $word_to_delete = $data['word'] ?? '';

    if (!empty($child_uuid) && !empty($word_to_delete)) {
        $sql = "SELECT words FROM child_config WHERE child_uuid = ?";
        $stmt = $con->prepare($sql);
        $stmt->bind_param("s", $child_uuid);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $words = json_decode($row['words'], true) ?? [];

            // Eliminar la palabra del array
            if (($key = array_search($word_to_delete, $words)) !== false) {
                unset($words[$key]);
                $words = array_values($words); // Reindexar el array
            }

            // Actualizar las palabras en la base de datos
            $updated_words = json_encode($words);
            $update_sql = "UPDATE child_config SET words = ? WHERE child_uuid = ?";
            $update_stmt = $con->prepare($update_sql);
            $update_stmt->bind_param("ss", $updated_words, $child_uuid);
            $update_result = $update_stmt->execute();

            if ($update_result) {
                echo json_encode(["success" => true, "message" => "Palabra eliminada con éxito"]);
            } else {
                echo json_encode(["success" => false, "message" => "Error al actualizar las palabras"]);
            }
        } else {
            echo json_encode(["success" => false, "message" => "No se encontraron palabras para este UUID"]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Faltan datos"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Método no permitido"]);
}

$con->close();
?>
