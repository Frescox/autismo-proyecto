
document.addEventListener("DOMContentLoaded", () => {
    fetch('verif_perm.php')
        .then(response => response.json())
        .then(data => {
            if (data.status === "success" && data.permisos === 1) {
                // Permite al usuario continuar en la página
            } else {
                window.location.href = 'log-reg.php'; // Redirige a la página de inicio de sesión
            }
        })
        .catch(error => {
            window.location.href = 'log-reg.php'; // Redirige si ocurre un error
        });
});
