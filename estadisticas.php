<?php
session_start();
include("connection.php");

// Obtener el ID del niño desde la sesión
$uuid = $_SESSION['uuid'];

if (!isset($uuid)) {
    http_response_code(400);
    echo json_encode(['error' => 'El ID del niño no está definido.']);
    exit();
}

// Inicializar array de resultados
$response = [
    'tiempoPromedio' => 0,
    'palabrasComplicadas' => [],
    'palabrasAprendidas' => []
];

// Obtener tiempo promedio en segundos
$queryTiempo = "SELECT average_session_time_seconds FROM child_statistics WHERE child_id = '$uuid'";
$resultTiempo = mysqli_query($con, $queryTiempo);

if ($resultTiempo && mysqli_num_rows($resultTiempo) > 0) {
    $row = mysqli_fetch_assoc($resultTiempo);
    $response['tiempoPromedio'] = (int)$row['average_session_time_seconds'];
}

// Obtener palabras complicadas
$queryComplicadas = "SELECT difficult_words FROM child_statistics WHERE child_id = '$uuid'";
$resultComplicadas = mysqli_query($con, $queryComplicadas);

if ($resultComplicadas && mysqli_num_rows($resultComplicadas) > 0) {
    $row = mysqli_fetch_assoc($resultComplicadas);
    $response['palabrasComplicadas'] = array_filter(explode(',', $row['difficult_words'])); // Convertir a array
}

// Obtener palabras aprendidas
$queryAprendidas = "SELECT dominated_words FROM child_statistics WHERE child_id = '$uuid'";
$resultAprendidas = mysqli_query($con, $queryAprendidas);

if ($resultAprendidas && mysqli_num_rows($resultAprendidas) > 0) {
    $row = mysqli_fetch_assoc($resultAprendidas);
    $response['palabrasAprendidas'] = array_filter(explode(',', $row['dominated_words'])); // Convertir a array
}

// Devolver la respuesta en formato JSON
header('Content-Type: application/json');
echo json_encode($response);
?>
