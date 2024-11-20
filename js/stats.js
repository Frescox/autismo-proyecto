// Agrega un evento a cada botón de "Seleccionar" para almacenar el child_id en localStorage
document.addEventListener("DOMContentLoaded", () => {
    const selectButtons = document.querySelectorAll("form[action='select_child.php'] button");

    selectButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            // Prevenir el envío del formulario para capturar el UUID antes de que redirija
            event.preventDefault();

            // Obtener el UUID del niño desde el input hidden en el formulario
            const form = event.target.closest("form");
            const childUUID = form.querySelector("input[name='uuid']").value;

            // Almacenar el UUID en localStorage
            localStorage.setItem("child_uuid", childUUID);

            // Enviar el formulario después de almacenar el UUID
            form.submit();
        });
    });
});
