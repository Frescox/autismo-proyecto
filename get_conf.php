<?php
    session_start();
    //Obtenemos el UUID de la persona que esta usando el sistema
    $user_id = $_SESSION['uuid']; 
    include("connection.php");
    
    //Forma de indicar que se retornará un JSON al JS donde es llamado este archivo
    header('Content-Type: application/json'); 

    //Obtenemos la configuración del usuario actual por medio de su UUID
    $sql_select = "SELECT config FROM child_config WHERE child_uuid = $user_id";  
    $result = $con->query($sql_select);

    //Extramos la configuracion y la retornamos 
    $row = $result->fetch_assoc();
    echo $row['config'];

    $con->close();
?>