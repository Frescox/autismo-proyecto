<?php
session_start();

include("connection.php");
include("functions.php");

$error = "";

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $form_type = $_POST['form_type']; // Identificar si es login o register

    // Registro de usuario
    if ($form_type == 'register') {
        $user_name = $_POST['user_name'];
        $user_name_enc = encryptData($user_name);

        $user_lastname = $_POST['user_lastname'];
        $user_lastname_enc = encryptData($user_lastname);

        $user_email = $_POST['user_email'];
        $user_email_hash = md5($user_email);

        $user_password = md5($_POST['password']);
        

        $query = "SELECT user_email FROM tutor_users WHERE user_email = '$user_email_hash' LIMIT 1";
        $result = mysqli_query($con, $query);
        if ($result && mysqli_num_rows($result) > 0) {
            $_SESSION['status'] = "Ya existe una cuenta con ese correo electronico";
        } else {
            if (!empty($user_email) && !empty($user_password) && !empty($user_name) && !empty($user_lastname)) {

                $user_date = date("y-m-d");
                $user_id = random_num(5,$con);
                $query = "INSERT INTO tutor_users (user_id, user_name, user_lastname, user_email, password, date) 
                          VALUES ('$user_id', '$user_name_enc', '$user_lastname_enc', '$user_email_hash', '$user_password','$user_date')";

                $query_run = mysqli_query($con, $query);
                if ($query_run) {
                    $_SESSION["status"] = "¡Te has registrado con exito!.";
                }
            } else {
                $_SESSION['status'] = "Por favor, ¡rellena todos los campos!";
            }
        }
    }
    // Inicio de sesión
    if ($form_type == 'login') {
        $user_email = md5($_POST['user_email']);
        $user_password = md5($_POST['password']);

        if (!empty($user_email) && !empty($user_password)) {

            $query = "SELECT * FROM tutor_users WHERE user_email = '$user_email' LIMIT 1";
            $result = mysqli_query($con, $query);

            if ($result && mysqli_num_rows($result) > 0) {
                $user_data = mysqli_fetch_assoc($result);

                if ($user_data['password'] === $user_password) {
                    $_SESSION['user_id'] = $user_data['user_id'];
                    if($user_data ['is_adm'] == 1){
                        header('Location: adm_pannel.php');
                        die;
                    }else if ($user_data ['has_perm'] == 1){
                        header('Location: select_acc.php');
                        die;
                    }else{
                        $_SESSION['status'] = "¡Ponte en contacto con un administrador para que tu cuenta sea activada!";
                    }
                } else {
                    $_SESSION['status'] = "Contraseña o correo incorrectos.";
                }
            } else {
                $_SESSION['status'] = "Contraseña o correo incorrectos.";
            }
        } else {
            $_SESSION['status'] = "Por favor, ¡rellena todos los campos!";
        }
    }
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sonrisas | Registro/Inicio de sesión</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Dosis:wght@200..800&display=swap" rel="stylesheet">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet">
    <link rel="stylesheet" href="./css/styles.css">
    <link rel="stylesheet" href="./css/transicion.css">
</head>

<body>
    <div>

    <header>
        <img src="./images/logo.png" alt="Logo de Sonrisas del Autismo" class="logo">
        <h1>Sonrisas del Autismo, A.C.</h1>
        <nav>
            <a href="./index.html">Regresar</a>
        </nav>
    </header>

        <main class="container d-flex justify-content-center align-items-center" style="min-height: 50vh;">

            <div class="form-box d-flex justify-content-center align-items-center">

                <div class="col-md-6">
                    <div class="login-container card p-4 rounded" id="login">
                        <form method="POST" action="log-reg.php">
                            <input type="hidden" name="form_type" value="login">
                            <div class="top text-center mb-4">
                                <span>¿No tienes una cuenta? <a href="#" onclick="register()">Regístrate</a></span>
                                <h3>Iniciar sesión</h3>
                            </div>
                            <div class="alert text-center">
                                <?php
    
                                    if (isset($_SESSION['status'])) {
                                        echo "<h4>".$_SESSION['status']."</h4>";
                                        unset($_SESSION["status"]);
                                    }
                                ?>
                            </div>
                            <div class="input-box mb-3">
                                <input required name="user_email" type="email" class="input-field form-control" placeholder="Email">
                            </div>
                            <div class="input-box mb-3">
                                <input required name="password" type="password" class="input-field form-control" placeholder="Contraseña">
                            </div>
                            <div class="input-box mb-3">
                                <input id="button" type="submit" class="submit btn btn-primary w-100" value="Iniciar sesión">
                            </div>
                            <div class="two-col d-flex justify-content-between">
                                <div class="one">
                                    <input type="checkbox" id="login-check">
                                    <label for="login-check"> Recuérdame</label>
                                </div>
                                <div class="two">
                                    <label><a href="#">Olvidé mi contraseña</a></label>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <div class="col-md-6 center">
                    <div class="register-container card p-4 " id="register">
                        <form method="POST" action="log-reg.php">
                            <input type="hidden" name="form_type" value="register">
                            <div class="top text-center mb-4">
                                <span>¿Ya tienes una cuenta? <a href="#" onclick="login()">Iniciar sesión</a></span>
                                <h3>Registrarse</h3>
                            </div>
                            <div class="alert">
                                <?php
    
                                    if (isset($_SESSION['status'])) {
                                        echo "<h4>".$_SESSION['status']."</h4>";
                                        unset($_SESSION["status"]);
                                    }
                                ?>
                            </div>
                            <div class="two-forms d-flex justify-content-between mb-3">
                                <div class="input-box w-48">
                                    <input required name="user_name" type="text" class="input-field form-control" placeholder="Nombres">
                                </div>
                                <div class="input-box w-48">
                                    <input required name="user_lastname" type="text" class="input-field form-control" placeholder="Apellidos">
                                </div>
                            </div>
                            <div class="input-box mb-3">
                                <input required name="user_email" type="email" class="input-field form-control" placeholder="Email">
                            </div>
                            <div class="input-box mb-3">
                                <input required name="password" type="password" class="input-field form-control" placeholder="Contraseña">
                            </div>
                            <div class="input-box mb-3">
                                <input name="register_btn" id="button" type="submit" class="submit btn btn-primary w-100" value="Registrarse" onclick="">
                            </div>
                            <div class="two-col d-flex justify-content-between">
                                <div class="one">
                                    <input type="checkbox" id="register-check">
                                    <label for="register-check">Acepto los <a href="#">términos y condiciones</a></label>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </main>

    </div>

    <footer>
    <p>&copy; 2024 <strong>Sonrisas del Autismo</strong>. Todos los derechos reservados.</p>
    </footer>

    <script src="./js/logReg.js"></script>
    <script src="./js/galeria.js"></script>
</body>

</html>