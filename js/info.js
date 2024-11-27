const objetivoBtn = document.getElementById('objetivo');
const misionBtn = document.getElementById('mision');
const visionBtn = document.getElementById('vision');
const acercaDeBtn = document.getElementById('acerca-de');

const sectionParagraph = document.querySelector('section p');
const sectionH1 = document.querySelector('section h1');
const acercaDeSection = document.getElementById('acerca-de-info');
const contenidoSection = document.getElementById('contenido');

function updateContent(content, title, showAcercaDe = false) {
    if (showAcercaDe) {
        acercaDeSection.style.display = 'block';
        acercaDeSection.innerHTML = content;
        contenidoSection.style.display = 'none';
    } else {
        sectionParagraph.textContent = content;
        sectionH1.textContent = title;
        acercaDeSection.style.display = 'none';
        contenidoSection.style.display = 'block';
    }
}

objetivoBtn.addEventListener('click', () => {
    updateContent(`El tratamiento y la rehabilitación de personas con autismo mediante una terapia integral, en
            especial colaborando con aquellas familias que no cuentan con el conocimiento suficiente y
            no saben cómo tratar el autismo en su hogar. Se busca la difusión de la problemática que
            genera el autismo en la comunidad general, informando sobre los servicios que presta
            Sonrisas del Autismo A.C. Además, se pretende obtener el apoyo requerido por la comunidad.`,'Objetivo');
});

misionBtn.addEventListener('click', () => {
    updateContent(`Ayudar a las familias con autismo para que sus hijos puedan tener una vida por sí solos. Trabajo
            integral con la familia.`,'Misión');
});

visionBtn.addEventListener('click', () => {
    updateContent(`Que la comunidad de Ensenada cuente con centros accesibles para el desarrollo integral de las personas
            con autismo, que les permitan su inclusión en la sociedad, así como el apoyo a sus familias.`,'Visión');
});

acercaDeBtn.addEventListener('click', () => {
    const acercaDeContent = `
        <h1>Acerca de</h1>
        <h2>Desarrolladores</h2>
        <ul>
            <li><strong>José Eduardo Becerra Flores</strong> - jose.becerra84@uabc.edu.mx</li>
            <li><strong>José Humberto Moreno Mejía</strong> - jose.moreno39@uabc.edu.mx</li>
            <li><strong>Luis Ángel López Galicia</strong> - galicia1298820@uabc.edu.mx</li>
            <li><strong>Rafael Tonathiu Cabrera Contreras</strong> - rafael.cabrera32@uabc.edu.mx</li>
            <li><strong>Jorge Guadalupe Gómez Pimentel</strong> - jorge.pimentel44@uabc.edu.mx</li>
        </ul>

        <h2>Universidad</h2>
        <p><strong>Universidad Autónoma de Baja California</strong></p>
        <p><strong>Ingeniería en Software y Tecnologías Emergentes</strong>, Cuarta Generación de Software</p>

        <h2>Involucrados en el Proyecto:</h2>
        <ul>
            <li><strong>Coordinador y Docente de Base de Datos:</strong> Dr. Camilo Caraveo Mena</li>
            <li><strong>Diseño de Aplicaciones Web:</strong> Samantha Paulina Jiménez Calleros</li>
            <li><strong>Marcos de Trabajo Ágiles para el Desarrollo de Software:</strong> Mayra Janeth Durán Rodríguez</li>
        </ul>
    `;
    
    updateContent(acercaDeContent, 'Acerca de', true);
});
