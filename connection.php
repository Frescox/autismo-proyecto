<?php

$dbhost = "localhost";
$dbuser = "sonrisas_dev";
$dbpass = "Proyecto5to";
$dbname = "sonrisas_db";

if(!$con = new mysqli($dbhost, $dbuser, $dbpass, $dbname)){
    die("La conexion ha fallado". mysqli_connect_error());
}