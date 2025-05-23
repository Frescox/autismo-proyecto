<?php
session_start();
include("connection.php");

// Verificar si el usuario está autenticado
if (!isset($_SESSION['uuid'])) {
    header("Location: index.html");
}

if (isset($_POST['logout'])) {
    // Verifica si la sesión tiene un UUID definido
    if (isset($_SESSION['uuid'])) {
        $_SESSION['uuid'] = null; // Limpia el UUID de la sesión
    }
    // Redirige al usuario a la página de inicio
    header("Location: index.html");
    exit();
}

// Obtener el ID de usuario desde la sesión
$user_id = $_SESSION['uuid'];

// Consulta a la base de datos para obtener la imagen de perfil
$sql = "SELECT profile_pic FROM child_users WHERE uuid = ?";
$stmt = $con->prepare($sql);
$stmt->bind_param("s", $user_id);
$stmt->execute();
$result = $stmt->get_result();

// Verificar si se encontraron los datos del niño
if ($row = $result->fetch_assoc()) {
    // Verificar si existe la imagen de perfil
    $profilePic = $row['profile_pic'] ? $row['profile_pic'] : 'images/qqq.png';
} else {
    $profile_pic = !empty($child['profile_pic']) ? $child['profile_pic'] : './images/qqq.png';
}

$stmt->close();
$con->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="./css/interfaz_menu.css">

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
        <img src="<?php echo htmlspecialchars($profilePic); ?>" alt="Foto de perfil" class="img-thumbnail">
        <h1 class="p-2" id = "text">Bienvenido</h1>
    </header>
    <main>
        <div id="gameTitle" class="d-flex align-items-center">
            <div class="p-2 flex-grow-1">
                <h1 class="ms-5">Juegos</h1>
            </div>
            <div class="p-2 mx-auto">
                <button id="btnConf" class="btn btn-sm" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvas1" aria-controls="offcanvasExample">
                    <i class="bi bi-sliders2"></i>
                </button>
            </div>
              
            <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvas1">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title">Configuración</h5>
                    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <div class="d-flex flex-column align-items-center gap-3">
                        <div class="d-flex flex-column align-items-center mb-2">                    
                            <label class="form-label" for="colorPicker">Color superior e inferior</label>
                            <input class="form-control form-control-color" type="color" id="colorPicker" value="#F8E48C">
                        </div>
                        <div class="d-flex flex-column align-items-center mb-2">                    
                            <label class="form-label" for="colorPicker_title">Color titulo</label>
                            <input class="form-control form-control-color" type="color" id="colorPicker_title" value="#8EAAF5">
                        </div>
                        <div class="d-flex flex-column align-items-center mb-2">                    
                            <label class="form-label" for="colorPicker_text">Color texto</label>
                            <input class="form-control form-control-color" type="color" id="colorPicker_text" value="#FFF2F2">
                        </div>
                        <div class="d-flex flex-column align-items-center mb-2">                    
                            <label class="form-label" for="colorPicker_bg">Color de fondo</label>
                            <input class="form-control form-control-color" type="color" id="colorPicker_bg" value="#8EAAF5">
                        </div>
                        <div class="d-flex flex-column align-items-center mb-2">                    
                            <button class="btn btn-primary" onclick="window.location.href = 'control-parental.php';">Control parental</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="container" id="container-buttons">
            <div>
                <button id="btnLetters"  onclick= "window.location.href = 'juego_palabras.html'"></button>
                <p>Rompedor de letras</p>
            </div>
            <div>
                <button id="btnNotes" onclick="window.location.href = 'inicio_notas.html';"></button>
                <p>Notas</p>
            </div>
        </div>
    </main>
    <footer>
    <form method="POST" action="">
        <button type="submit" name="logout" id="btnBack"></button>
    </form>
    </footer>
    <script>
    let atras = document.getElementById('btnBack');
    
    atras.addEventListener('click', () => {
        localStorage.removeItem('notes');
        localStorage.removeItem('notesTimestamp');
        localStorage.removeItem('currentElement');
        console.log('Notas eliminadas del localStorage');
    });
    </script>
    <script src="./js/verif_perm.js"></script>
    <script src="./js/interfaz_menu.js"></script>
    <script src="https://code.jquery.com/jquery-3.7.1.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/5.3.0/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
</body>
</html>
