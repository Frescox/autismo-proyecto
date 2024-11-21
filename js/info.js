const objetivoBtn = document.getElementById('objetivo');
const misionBtn = document.getElementById('mision');
const visionBtn = document.getElementById('vision');

const sectionParagraph = document.querySelector('section p');
const sectionH1 = document.querySelector('section h1');

function updateContent(content, title) {
    sectionParagraph.textContent = content;
    sectionH1.textContent = title;
}

objetivoBtn.addEventListener('click', () => {
    updateContent(`El tratamiento y la rehabilitación de personas con autismo mediante una terapia integral, en
            especial colaborando con aquellas familias que no cuentan con el conocimiento suficiente y
            no saben cómo tratar el autismo en su hogar. Se busca la difusión de la problemática que
            genera el autismo en la comunidad general, informando sobre los servicios que presta
            Sonrisas del Autismo A.C. Además, se pretende obtener el apoyo requerido por la comunidad.`,'Objetivo');
});

misionBtn.addEventListener('click', () => {
    updateContent(`Ayudar a las familias con autismo para que sus hijos puedan tener una vida por sí solos. Trabajo integral con la familia.`,'Misión');
});

visionBtn.addEventListener('click', () => {
    updateContent(`Que la comunidad de Ensenada cuente con centros accesibles para el desarrollo integral de las personas con autismo,
            que les permitan su inclusión en la sociedad, así como el apoyo a sus familias.`,'Visión');
});
