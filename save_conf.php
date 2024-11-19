<?php
include("connection.php");

session_start();
//Obtenemos el UUID de la persona que esta usando el sistema
$user_id = $_SESSION['uuid'];

//Obtenemos la configuracion del usuario actual
$sql_select = "SELECT config FROM child_config WHERE child_uuid=$user_id";  
$result = $con->query($sql_select);

// Recibimos el JSON enviado desde la solicitud POST
$json = file_get_contents('php://input'); // Lee el cuerpo de la solicitud

if ($json === false) {
    die("No se pudo obtener los datos JSON.");
}

// Extraemos la información devuelta de la consulta a la base de datos
$row = $result->fetch_assoc();

//Al ya existir el campo para insertar la configuracion, solo es necesario hacer un UPDATE
$sql = "UPDATE child_config SET config=(?) WHERE child_uuid=(?)";

// Preparar la declaración
$stmt = $con->prepare($sql);
if ($stmt === false) {
    die("Error en la preparación de la declaración: " . $con->error);
}

// Agregar los parametros para el UPDATE, el JSON y el UUID del usuario
$stmt->bind_param("si", $json,$user_id);  // "s" indica que el tipo de dato es una cadena (string)

// Ejecutar la declaración
if ($stmt->execute()) {
    echo "JSON insertado exitosamente en la columna `config`.";
} else {
    echo "Error al insertar el JSON: " . $stmt->error;
}

// Cerrar la declaración y la conexión
$stmt->close();
$con->close();

?>