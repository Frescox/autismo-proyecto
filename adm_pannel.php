<?php
session_start();
include("connection.php");
include("functions.php");

$sin_permisos = $con->query("SELECT user_id, user_name, user_lastname FROM tutor_users WHERE has_perm = 0");
$con_permisos = $con->query("SELECT user_id, user_name, user_lastname FROM tutor_users WHERE has_perm = 1 AND is_adm = 0");
$administradores = $con->query("SELECT user_id, user_name, user_lastname FROM tutor_users WHERE is_adm = 1");

?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panel Administrativo</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body { background-color: #f5f5f5; }
        .panel { display: none; transition: transform 0.5s ease-in-out, opacity 0.5s; }
        .panel.active { display: block; opacity: 1; transform: translateX(0); }
        .panel.left { transform: translateX(-100%); opacity: 0; }
        .panel.right { transform: translateX(100%); opacity: 0; }
        .nav-buttons { text-align: center; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="container">
        <h1 class="text-center my-4">Panel Administrativo</h1>
        <!-- Navegación -->
        <div class="nav-buttons">
            <button class="btn btn-primary" onclick="showPanel(0)">Sin Permisos</button>
            <button class="btn btn-secondary" onclick="showPanel(1)">Con Permisos</button>
            <button class="btn btn-success" onclick="showPanel(2)">Administradores</button>
        </div>
        
        <!-- Cuadros -->
        <div id="panel-0" class="panel active">
            <h3>Cuentas Sin Permisos</h3>
            <?php while ($row = $sin_permisos->fetch_assoc()): ?>
                <div class="card my-2">
                    <div class="card-body">
                        <h5 class="card-title"><?= decryptData($row['user_name']) . " " . decryptData($row['user_lastname']) ?></h5>
                        <button class="btn btn-primary" onclick="confirmAction('¿Otorgar permisos de usuario?', 'updatePermission.php', { userId: <?= $row['user_id'] ?>, action: 'grant_user' })">Otorgar Permisos</button>
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
    </div>

    <script>
        let currentPanel = 0;
        function showPanel(index) {
            document.getElementById(`panel-${currentPanel}`).classList.remove('active');
            document.getElementById(`panel-${currentPanel}`).classList.add(currentPanel > index ? 'right' : 'left');
            currentPanel = index;
            document.getElementById(`panel-${index}`).classList.add('active');
            document.getElementById(`panel-${index}`).classList.remove('left', 'right');
        }

        function confirmAction(message, url, data) {
            if (confirm(message)) {
                // Crear un formulario oculto y enviarlo
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
