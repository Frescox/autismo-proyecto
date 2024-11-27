<?php
include("connection.php");
// Iniciar sesión para acceder al UUID del usuario actual
session_start();

if (!isset($_SESSION['uuid'])) {
    echo json_encode(["success" => false, "message" => "No se ha encontrado el ID del niño"]);
    exit;
}

$child_id = $_SESSION['uuid'];

// Consultar todas las notas del niño
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (!empty($child_id)) {
        $sql = "SELECT note, note_date FROM child_notes WHERE child_id = ? ORDER BY note_date DESC";
        $stmt = $con->prepare($sql);
        $stmt->bind_param("s", $child_id);
        $stmt->execute();
        $result = $stmt->get_result();

        $notes = [];
        while ($row = $result->fetch_assoc()) {
            $notes[] = [
                "note" => $row['note'],
                "note_date" => $row['note_date']
            ];
        }

        echo json_encode(["success" => true, "notes" => $notes]);
    } else {
        echo json_encode(["success" => false, "message" => "Faltan datos"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Método no permitido"]);
}

$con->close();
?>
