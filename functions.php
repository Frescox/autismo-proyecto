<?php
function check_login($con) {

    if(isset($_SESSION['user_id'])) {


        $id = $_SESSION['user_id'];
        $query = "SELECT * FROM users_sonrisas WHERE user_id = '$id' LIMIT 1";

        $result = mysqli_query($con, $query);
        if($result && mysqli_num_rows($result) > 0) {
            $user_data = mysqli_fetch_assoc($result);
            return $user_data;
        }
    }

    //redirect to login
    header("Location: log-reg.php");
    die;

}

function check_perm($con) {

    if(isset($_SESSION['user_id'])) {

        $id = $_SESSION['user_id'];
        $query = "SELECT user_perm,isverified FROM users_sonrisas WHERE user_id = '$id' LIMIT 1";

        $result = mysqli_query($con, $query);
        if($result && mysqli_num_rows($result) > 0) {
            $user_data = mysqli_fetch_assoc($result);
            return $user_data;
        }
    }
    
}

function random_num($length, $con) {
    do {
        $text = "";
        if ($length < 5) {
            $length = 5;
        }
        $len = rand(4, $length);

        for ($i = 0; $i < $len; $i++) {
            $text .= rand(0, 9);
        }

        // Verificar si el ID ya existe en la base de datos
        $query = "SELECT user_id FROM users_sonrisas WHERE user_id = '$text' LIMIT 1";
        $result = mysqli_query($con, $query);
    } while (mysqli_num_rows($result) > 0);

    return $text;
}

define('SECRET_KEY', 'CcTx0Xg1ZIBOoZPpsUN6S2vOWE4Ztt0H');
define('SECRET_IV', 'MVe7Lx8sxcFijQKv');

function encryptData($data) {
    $encryption_key = SECRET_KEY;
    $iv = substr(hash('sha256', SECRET_IV), 0, 16);
    return openssl_encrypt($data, 'AES-256-CBC', $encryption_key, 0, $iv);
}
function decryptData($data) {
    $encryption_key = SECRET_KEY;
    $iv = substr(hash('sha256', SECRET_IV), 0, 16);
    return openssl_decrypt($data, 'AES-256-CBC', $encryption_key, 0, $iv);
}
