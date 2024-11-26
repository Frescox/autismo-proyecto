<?php
// Incluir conexión a la base de datos
include("connection.php");

header("Content-Type: application/json");

// Leer los datos enviados en la solicitud
$data = json_decode(file_get_contents("php://input"), true);

// Verificar si se proporcionó el `child_uuid`
if (isset($data['child_uuid'])) {
    $child_uuid = $data['child_uuid'];

    // Iniciar una transacción para eliminar todos los datos relacionados
    mysqli_begin_transaction($con);

    try {
        // Eliminar de child_statistics
        $query1 = "DELETE FROM child_statistics WHERE child_id = '$child_uuid'";
        if (!mysqli_query($con, $query1)) {
            throw new Exception("Error al eliminar de child_statistics: " . mysqli_error($con));
        }

        // Eliminar de child_notes
        $query2 = "DELETE FROM child_notes WHERE child_id = '$child_uuid'";
        if (!mysqli_query($con, $query2)) {
            throw new Exception("Error al eliminar de child_notes: " . mysqli_error($con));
        }

        // Eliminar de child_config
        $query3 = "DELETE FROM child_config WHERE child_uuid = '$child_uuid'";
        if (!mysqli_query($con, $query3)) {
            throw new Exception("Error al eliminar de child_config: " . mysqli_error($con));
        }

        // Eliminar de child_users
        $query4 = "DELETE FROM child_users WHERE uuid = '$child_uuid'";
        if (!mysqli_query($con, $query4)) {
            throw new Exception("Error al eliminar de child_users: " . mysqli_error($con));
        }

        // Confirmar la transacción
        mysqli_commit($con);

        // Respuesta exitosa
        echo json_encode(["success" => true, "message" => "Datos del niño eliminados con éxito."]);
    } catch (Exception $e) {
        // Revertir la transacción en caso de error
        mysqli_rollback($con);

        // Respuesta de error
        echo json_encode(["success" => false, "message" => $e->getMessage()]);
    }
} else {
    echo json_encode(["success" => false, "message" => "No se proporcionó un ID de niño en la solicitud."]);
}
?>
