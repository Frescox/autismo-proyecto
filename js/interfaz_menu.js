//Elementos de la interfaz del menú
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

//Eventlistener para cambiar la configuración del JSON cada que se cambia el color de un picker
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


let subject="";


function register(){
    //Variable que guarda todos los datos de la configuración de colores
    var colores={};

    subject = colorPicker_hf.value;
    colores.header_footer = colorPicker_hf.value;
    subject = colorPicker_title.value;
    colores.title = colorPicker_title.value;
    subject = colorPicker_text.value;
    colores.text = colorPicker_text.value;
    subject = colorPicker_bg.value;
    colores.bg = colorPicker_bg.value;

    jsonData = JSON.stringify(colores);
    
    // Al archivo save_conf se le envia el JSON creado con los valores que contiene cada color picker
    fetch('save_conf.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData // Convertir el objeto a JSON
    })
    .catch(error => console.error('Error al enviar:', error));
}


function init(){
    //Variable para acceder a cada uno de los atributos de la configuración
    let colorGuardado;

    //Obtenemos un JSON por parte del archivo get_conf que contiene la configuración de colores
    fetch('get_conf.php')
    .then(respuesta => respuesta.json())  // Convierte la respuesta a JSON
    .then(data => {
        colorGuardado = data;

        //Si se procesa correctamente la información
        if (colorGuardado) {
            //Agregamos los colores al header y footer
            header.style.backgroundColor=colorGuardado.header_footer;
            footer.style.backgroundColor=colorGuardado.header_footer;
            
            //Agregamos los colores de titulo a cada uno de los titulos dentro de la interfaz
            for (let i = 0; i < title.length; i++) {
                const txt = title[i];
                txt.style.color = colorGuardado.title;
            }
            
            //Agregamos los colores de texto a cada uno de los textos dentro de la interfaz
            for (let i = 0; i < textos.length; i++) {
                const txt = textos[i];
                txt.style.color = colorGuardado.text;
            }
            
            //Cambiamos el color de fondo de la aplicación
            fondo.style.backgroundColor = colorGuardado.bg;
    
            //Actualizamos el valor de los colorPicker para que contengan los colores de la configuración actual
            colorPicker_hf.value = colorGuardado.header_footer;
            colorPicker_title.value = colorGuardado.title;
            colorPicker_text.value = colorGuardado.text
            colorPicker_bg.value = colorGuardado.bg;
        }
        else{
            console.log("No se proceso correctamente la información");
        }
    })
    .catch(error => {
        console.error('Error:', error);  // Maneja cualquier error que pueda ocurrir
    });
}

window.onload=init;