<?php
session_start();

include("connection.php");
include("functions.php");

$error = "";

$user_id = $_SESSION['user_id'];

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $form_type = $_POST['form_type'];

    // Inicio de sesión
    if ($form_type == 'control-parental') {
        $user_password = md5($_POST['password']);

        if (!empty($user_password)) {

            $query = "SELECT password FROM users_sonrisas WHERE user_id = '$user_id' LIMIT 1";
            $result = mysqli_query($con, $query);

            if ($result && mysqli_num_rows($result) > 0) {
                $user_data = mysqli_fetch_assoc($result);

                if ($user_password == $user_data['password']) {
                    
                    header('Location: admin.html');
                    die;
                } else {
                    $_SESSION['status'] = "Contraseña incorrecta.";
                }
            } else {
                $_SESSION['status'] = "Contraseña incorrecta.";
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
    <title>Sonrisas | Control parental</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet">
    <link rel="stylesheet" href="./css/styles.css">
    <link rel="stylesheet" href="./css/transicion.css">
</head>

<body>
    <div>

    <header>
        <img src="./images/logo.png" alt="Logo de Sonrisas del Autismo" class="logo">
        <h1>Sonrisas del Autismo</h1>
        <nav>
            <a href="./interfaz_menu.html">Regresar</a>
        </nav>
    </header>

        <main class="container d-flex justify-content-center align-items-center" style="min-height: 50vh;">

            <!----------------------------- Form box ----------------------------------->
            <div class="form-box d-flex justify-content-center align-items-center">

                <div class="col-md-6">
                    <!------------------- login form -------------------------->
                    <div class="login-container card p-4 rounded" id="control-parental">
                        <form method="POST" action="control-parental.php">
                            <input type="hidden" name="form_type" value="control-parental"> <!-- Campo oculto -->
                            <div class="top text-center mb-4">
                                <h3>Acceso a control parental</h3>
                                <h4>Ingrese la contraseña de la cuenta</h4>
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
                                <input required name="password" type="password" class="input-field form-control" placeholder="Contraseña">
                            </div>
                            <div class="input-box mb-3">
                                <input id="button" type="submit" class="submit btn btn-primary w-100" value="Acceder">
                            </div>
                        </form>
                    </div>
                </div>
        </main>

    </div>

    <footer>
        <p>Derechos reservados &copy; 2024</p>
    </footer>

    <script src="./js/galeria.js"></script>
</body>

</html>