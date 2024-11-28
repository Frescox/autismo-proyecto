<?php

session_start();
include("connection.php");
include("functions.php");

$sin_permisos = $con->query("SELECT user_id, user_name, user_lastname FROM tutor_users WHERE has_perm = 0");
$con_permisos = $con->query("SELECT user_id, user_name, user_lastname FROM tutor_users WHERE has_perm = 1 AND is_adm = 0");
$administradores = $con->query("SELECT user_id, user_name, user_lastname FROM tutor_users WHERE is_adm = 1 AND user_id != 4044");

?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panel Administrativo</title>
    <link rel="stylesheet" href="./css/interfaz_menu.css">
    <link rel="stylesheet" href="./css/adm_pannel.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Dosis:wght@200..800&display=swap" rel="stylesheet">
</head>

<body>
    <!-- Header -->
    <header class="d-flex align-items-center p-3">
        <h1 class="p-2">Panel Administrativo</h1>
    </header>
    <h1 class="ms-3">Gestión de Usuarios</h1>
    <div class="d-flex justify-content-center gap-3 my-4">
        <button class="btn btn-primary" onclick="showPanel(0)">Sin Permisos</button>
        <button class="btn btn-secondary" onclick="showPanel(1)">Con Permisos</button>
        <button class="btn btn-success" onclick="showPanel(2)">Administradores</button>
    </div>
    <!-- Main Content -->
    <main class="container my-4 overflow-auto" style="height: 100vh;">
        <!-- Navegación de Paneles -->

        <div id="gameTitle" class="d-flex align-items-center justify-content-between">
        </div>

        <div id="panel-0" class="panel active">
            <h3>Cuentas Sin Permisos</h3>
            <?php while ($row = $sin_permisos->fetch_assoc()):
                if ($row['user_id'] == 4044) {
                    continue; // Omite esta iteración del bucle
                }
            ?>
                <div class="card my-2">
                    <div class="card-body">
                        <h5 class="card-title"><?= decryptData($row['user_name']) . " " . decryptData($row['user_lastname']) ?></h5>
                        <button class="btn btn-primary" onclick="confirmAction('¿Otorgar permisos de usuario?', 'updatePermission.php', { userId: <?= $row['user_id'] ?>, action: 'grant_user' })">Otorgar Permisos</button>
                        <button class="btn btn-danger" onclick="confirmAction('¿Desea eliminar la solicitud?', 'updatePermission.php', { userId: <?= $row['user_id'] ?>, action: 'remove_user' })">Denegar Permisos</button>
                    </div>
                </div>
            <?php endwhile; ?>
        </div>


        <div id="panel-1" class="panel">
            <h3>Cuentas Con Permisos</h3>
            <?php while ($row = $con_permisos->fetch_assoc()): ?>
                <div class="card my-2">
                    <div class="card-body">
                        <h5 class="card-title"><?= decryptData($row['user_name']) . " " . decryptData($row['user_lastname']) ?></h5>
                        <button class="btn btn-success" onclick="confirmAction('¿Otorgar permisos de administrador?', 'updatePermission.php', { userId: <?= $row['user_id'] ?>, action: 'grant_admin' })">Otorgar Admin</button>
                        <button class="btn btn-danger" onclick="confirmAction('¿Remover permisos de usuario?', 'updatePermission.php', { userId: <?= $row['user_id'] ?>, action: 'revoke_user' })">Revocar Usuario</button>
                    </div>
                </div>
            <?php endwhile; ?>
        </div>

        <div id="panel-2" class="panel">
            <h3>Administradores</h3>
            <?php while ($row = $administradores->fetch_assoc()): ?>
                <div class="card my-2">
                    <div class="card-body">
                        <h5 class="card-title"><?= decryptData($row['user_name']) . " " . decryptData($row['user_lastname']) ?></h5>
                        <button class="btn btn-warning" onclick="confirmAction('¿Revocar permisos de administrador?', 'updatePermission.php', { userId: <?= $row['user_id'] ?>, action: 'revoke_admin' })">Revocar Admin</button>
                    </div>
                </div>
            <?php endwhile; ?>
        </div>
    </main>

    <!-- Footer -->
    <footer>
        <button id="btnBack" onclick="window.location.href = 'interfaz_menu.php';"></button>
    </footer>

    <script>
        let currentPanel = 0;

        function showPanel(index) {
            // Validar si el índice está dentro del rango
            if (index < 0 || index > 2) return;

            // Ocultar el panel actual
            const current = document.getElementById(`panel-${currentPanel}`);
            current.classList.remove('active');
            current.classList.add(currentPanel > index ? 'right' : 'left');

            // Mostrar el panel seleccionado
            const next = document.getElementById(`panel-${index}`);
            next.classList.remove('left', 'right');
            next.classList.add('active');

            // Actualizar el índice del panel actual
            currentPanel = index;
        }



        function confirmAction(message, url, data) {
            if (confirm(message)) {
                const form = document.createElement('form');
                form.method = 'POST';
                form.action = url;
                for (const key in data) {
                    const input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = key;
                    input.value = data[key];
                    form.appendChild(input);
                }
                document.body.appendChild(form);
                form.submit();
            }
        }
    </script>
</body>

</html>