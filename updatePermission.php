<?php
include("connection.php");
$userId = $_POST['userId'];
$action = $_POST['action'];

switch ($action) {
    case 'grant_user':
        $con->query("UPDATE tutor_users SET has_perm = 1 WHERE user_id = $userId");
        break;
    case 'revoke_user':
        $con->query("UPDATE tutor_users SET has_perm = 0 WHERE user_id = $userId");
        break;
    case 'grant_admin':
        $con->query("UPDATE tutor_users SET is_adm = 1 WHERE user_id = $userId");
        break;
    case 'revoke_admin':
        $con->query("UPDATE tutor_users SET is_adm = 0 WHERE user_id = $userId");
        break;
}

header('Location: adm_pannel.php');
die;