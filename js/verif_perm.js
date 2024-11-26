
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

function confirmDeleteAccount() {
        const childUuid = localStorage.getItem("child_uuid");
    
        if (!childUuid) {
            alert("No se encontró el ID del niño en el almacenamiento local.");
            return;
        }
    
        fetch("delete_account.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                child_uuid: childUuid, // Enviar el ID del niño
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    alert(data.message);
                    window.location.href="select_acc.php"; // Opcional: recargar la página después de eliminar
                } else {
                    alert(data.message || "Error al eliminar los datos del niño.");
                }
            })
            .catch((error) => {
                console.error("Error al eliminar los datos del niño:", error);
            });
    }
    
