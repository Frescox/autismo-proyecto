document.addEventListener("DOMContentLoaded", function () {
    const colorPickerInterfaz1 = document.getElementById('colorPickerInterfaz1');
    const btnColorInterfaz1 = document.getElementById('btnColorInterfaz1');
    
    const colorPickerInterfaz2 = document.getElementById('colorPickerInterfaz2');
    const btnColorInterfaz2 = document.getElementById('btnColorInterfaz2');
    
    const colorPickerTitulos = document.getElementById('colorPickerTitulos');
    const btnColorTitulos = document.getElementById('btnColorTitulos');
    
    const colorPickerTextos = document.getElementById('colorPickerTextos');
    const btnColorTextos = document.getElementById('btnColorTextos');

    // Listeners para cambiar el color de los botones según la selección del usuario
    colorPickerInterfaz1.addEventListener('input', function () {
        btnColorInterfaz1.style.backgroundColor = colorPickerInterfaz1.value;
    });
    
    colorPickerInterfaz2.addEventListener('input', function () {
        btnColorInterfaz2.style.backgroundColor = colorPickerInterfaz2.value;
    });
    
    colorPickerTitulos.addEventListener('input', function () {
        btnColorTitulos.style.backgroundColor = colorPickerTitulos.value;
    });
    
    colorPickerTextos.addEventListener('input', function () {
        btnColorTextos.style.backgroundColor = colorPickerTextos.value;
    });
});
