<?php 
session_start();

include("connection.php");
include("functions.php");

// Obtener el user_id del padre/tutor desde la sesión
$tutor_id = $_SESSION['user_id'];

// Si se envía el formulario, procesar la adición del niño
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['child_name'])) {
    $child_name = $_POST['child_name'];
    
    // Generar un ID único para el niño
    $uuid = random_num(5, $con);

    // Encriptar el nombre del niño
    $encrypted_name = encryptData($child_name);
    
    // Insertar en la base de datos
    $insert_query = "INSERT INTO child_users (tutor_id, uuid, name) VALUES ('$tutor_id', '$uuid', '$encrypted_name')";
    $insert_result = mysqli_query($con, $insert_query);
    
    $insert_query1 = "INSERT INTO child_config (child_uuid) VALUES ('$uuid')";
    $insert_result = mysqli_query($con, $insert_query1);

    if (!$insert_result) {
        echo "Error al agregar niño: " . mysqli_error($con);
    }
    else{
        // Redireccion para limpiar los elementos de consulta y evitar problemas al recargar la pagina
        header("Location: " . $_SERVER['PHP_SELF']);
        exit();
    }
}

// Consulta para obtener los niños asociados al tutor
$query = "SELECT * FROM child_users WHERE tutor_id = '$tutor_id'";
$result = mysqli_query($con, $query);

// Verificar si hubo un error en la consulta
if (!$result) {
    die("Error en la consulta: " . mysqli_error($con));
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.10.0/font/bootstrap-icons.min.css" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Dosis:wght@200..800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="./css/interfaz_menu.css">
    <title>Menú</title>
</head>
<body>
    <header class="d-flex align-items-center p-3">
        <img src="./images/qqq.png" alt="" id="img-thumbnail">
        <h1 class="p-2">Bienvenido Padre/tutor</h1>
    </header>
    <main>
        <div id="gameTitle" class="d-flex align-items-center">
            <button class="right" id="btnBack" onclick="window.location.href = 'index.html';"></button>
            <div class="p-2 flex-grow-1">
                <h1 class="left ms-5">Seleccione la cuenta que desea utilizar</h1>
            </div>
        </div>
        
        
        <div class="container my-4">
            <!-- Formulario para agregar un nuevo niño -->
                <div class="card mb-3 text-center border-primary">
                    <div class="card-body">
                        <h5 class="card-title">Agregar Niño</h5>
                        <form action="select_acc.php" method="POST">
                            <div class="mb-3">
                                <label for="child_name" class="form-label">Nombre del Niño</label>
                                <input type="text" class="form-control" id="child_name" name="child_name" required>
                            </div>
                            <button type="submit" class="btn btn-outline-primary">Agregar</button>
                        </form>
                    </div>
                </div>
            <div class="row">
                <?php while ($child = mysqli_fetch_assoc($result)) { ?>
                    <!-- Tarjeta para cada niño -->
                    <div class="col-md-4">
                        <div class="card mb-3">
                            <div class="card-body">
                                <h5 class="card-title"><?php echo 'Cuenta de: ' . htmlspecialchars(decryptData($child['name'])); ?></h5>
                                <form action="select_child.php" method="POST">
                                    <input type="hidden" name="uuid" value="<?php echo htmlspecialchars($child['uuid']); ?>">
                                    <button type="submit" class="btn btn-primary">Acceder a la cuenta</button>
                                </form>
                            </div>
                        </div>
                    </div>
                <?php } ?>
            </div>
        </div>
    </main>

    <footer>
        <button id="btnBack" onclick="window.location.href = 'index.html';"></button>
    </footer>
    <script src="js/stats.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/5.3.0/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
</body>
</html>