<?php
session_start();
include("connection.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $uuid = $_SESSION['uuid']; // ID del niño seleccionado

    if (!isset($uuid)) {
        http_response_code(400);
        echo json_encode(['error' => 'El ID del niño no está definido.']);
        exit();
    }

    // Verificar si el ID del niño existe en la tabla de estadísticas
    $checkQuery = "SELECT * FROM child_statistics WHERE child_id = '$uuid'";
    $result = mysqli_query($con, $checkQuery);

    if (mysqli_num_rows($result) === 0) {
        // Si no existe, insertar un nuevo registro
        $insertQuery = "INSERT INTO child_statistics (child_id, session_count, total_time_seconds, average_session_time_seconds, last_session_start, last_session_end, dominated_words, difficult_words)
                        VALUES ('$uuid', 0, 0, 0, NULL, NULL, '', '')";
        mysqli_query($con, $insertQuery);
    }

    if ($data['action'] === 'incrementar_sesion') {
        // Incrementar el número de sesiones
        $query = "UPDATE child_statistics SET session_count = session_count + 1, last_session_start = NOW() WHERE child_id = '$uuid'";
        mysqli_query($con, $query);
    }

    if ($data['action'] === 'guardar_tiempo' && isset($data['tiempoEnJuego'])) {
        $tiempoEnJuego = (int)$data['tiempoEnJuego'];

        // Actualizar el tiempo total y calcular el promedio de sesión
        $query = "UPDATE child_statistics 
                  SET total_time_seconds = total_time_seconds + $tiempoEnJuego,
                      average_session_time_seconds = total_time_seconds / session_count,
                      last_session_end = NOW()
                  WHERE child_id = '$uuid'";
        mysqli_query($con, $query);
    }

    if ($data['action'] === 'palabra_dominada' && isset($data['palabra'])) {
        $palabra = mysqli_real_escape_string($con, $data['palabra']);

        // Verificar si la palabra ya existe en dominated_words
        $checkQuery = "SELECT FIND_IN_SET('$palabra', dominated_words) AS existe FROM child_statistics WHERE child_id = '$uuid'";
        $checkResult = mysqli_query($con, $checkQuery);
        $row = mysqli_fetch_assoc($checkResult);

        if (!$row['existe']) {
            // Agregar la palabra a dominated_words
            $query = "UPDATE child_statistics 
                      SET dominated_words = CONCAT(IFNULL(dominated_words, ''), IF(dominated_words = '', '', ','), '$palabra')
                      WHERE child_id = '$uuid'";
            mysqli_query($con, $query);
        }
    }

    if ($data['action'] === 'palabra_dificil' && isset($data['palabra'])) {
        $palabra = mysqli_real_escape_string($con, $data['palabra']);

        // Verificar si la palabra ya existe en difficult_words
        $checkQuery = "SELECT FIND_IN_SET('$palabra', difficult_words) AS existe FROM child_statistics WHERE child_id = '$uuid'";
        $checkResult = mysqli_query($con, $checkQuery);
        $row = mysqli_fetch_assoc($checkResult);

        if (!$row['existe']) {
            // Agregar la palabra a difficult_words
            $query = "UPDATE child_statistics 
                      SET difficult_words = CONCAT(IFNULL(difficult_words, ''), IF(difficult_words = '', '', ','), '$palabra')
                      WHERE child_id = '$uuid'";
            mysqli_query($con, $query);
        }
    }
}
?>
