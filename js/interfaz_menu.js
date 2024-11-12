const header = document.getElementsByTagName("header")[0];
const footer = document.getElementsByTagName("footer")[0];
const colorPicker_hf = document.getElementById('colorPicker');
const colorPicker_title = document.getElementById('colorPicker_title')
const colorPicker_text = document.getElementById('colorPicker_text')
const colorPicker_bg = document.getElementById('colorPicker_bg')
const title = document.getElementsByTagName('h1');
const textos = document.getElementsByTagName('p');
const fondo = document.getElementsByTagName('body')[0];

// Agregar un solo listener a ambos inputs de color
colorPicker_hf.addEventListener('input', actualizarColores);
colorPicker_title.addEventListener('input', actualizarColores);
colorPicker_text.addEventListener('input', actualizarColores);
colorPicker_bg.addEventListener('input', actualizarColores);

// Función que maneja el cambio de color en ambos casos
function actualizarColores(event) {
    if (event.target === colorPicker_hf) {
        // Si el input de color es colorPicker_hf, cambiar el color de header y footer
        header.style.backgroundColor = event.target.value;
        footer.style.backgroundColor = event.target.value;
    } else if (event.target === colorPicker_title) {
        
        // Si el input de color es colorPicker_title, cambiar el color de title
        for (let i = 0; i < title.length; i++) {
            const txt = title[i];
            txt.style.color = event.target.value;
        }
    }
    else if(event.target === colorPicker_text){
        for (let i = 0; i < textos.length; i++) {
            const txt = textos[i];
            txt.style.color = event.target.value;
        }
    }
    else if(event.target === colorPicker_bg){
        fondo.style.backgroundColor = event.target.value;
    }
}

let inputSubject=$("#colorPicker");
let subject="";
var colores={};


function register(){
    //Cada vez que se cambie de color, son limpiados del local storage los que se tenian anteriormente 
    localStorage.clear();
    subject = colorPicker_hf.value;
    colores.header_footer = colorPicker_hf.value;
    subject = colorPicker_title.value;
    colores.title = colorPicker_title.value;
    subject = colorPicker_text.value;
    colores.text = colorPicker_text.value;
    subject = colorPicker_bg.value;
    colores.bg = colorPicker_bg.value;

    localStorage.setItem('color',JSON.stringify(colores));
}

colorPicker_hf.addEventListener("change",function(){
    register();
});
colorPicker_title.addEventListener("change",function(){
    register();
});
colorPicker_text.addEventListener("change",function(){
    register();
});
colorPicker_bg.addEventListener("change",function(){
    register();
});


function init(){
    console.log(JSON.parse(localStorage.getItem('color')).title);
    const colorGuardado = JSON.parse(localStorage.getItem('color'))
    if (colorGuardado) {
        header.style.backgroundColor=colorGuardado.header_footer;
        footer.style.backgroundColor=colorGuardado.header_footer;

        for (let i = 0; i < title.length; i++) {
            const txt = title[i];
            txt.style.color = colorGuardado.title;
        }

        for (let i = 0; i < textos.length; i++) {
            const txt = textos[i];
            txt.style.color = colorGuardado.text;
        }

        fondo.style.backgroundColor = colorGuardado.bg;

        colorPicker_hf.value = colorGuardado.header_footer;
        colorPicker_title.value = colorGuardado.title;
        colorPicker_text.value = colorGuardado.text
        colorPicker_bg.value = colorGuardado.bg;
    }

}

window.onload=init;