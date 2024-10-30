// Mapa de sonidos para cada letra del alfabeto y números
const soundMap = {
    'a': new Audio('sfx/a.mp3'),
    'b': new Audio('sfx/b.mp3'),
    'c': new Audio('sfx/c.mp3'),
    'd': new Audio('sfx/d.mp3'),
    'e': new Audio('sfx/e.mp3'),
    'f': new Audio('sfx/f.mp3'),
    'g': new Audio('sfx/g.mp3'),
    'h': new Audio('sfx/h.mp3'),
    'i': new Audio('sfx/i.mp3'),
    'j': new Audio('sfx/j.mp3'),
    'k': new Audio('sfx/k.mp3'),
    'l': new Audio('sfx/l.mp3'),
    'm': new Audio('sfx/m.mp3'),
    'n': new Audio('sfx/n.mp3'),
    'o': new Audio('sfx/o.mp3'),
    'p': new Audio('sfx/p.mp3'),
    'q': new Audio('sfx/q.mp3'),
    'r': new Audio('sfx/r.mp3'),
    's': new Audio('sfx/s.mp3'),
    't': new Audio('sfx/t.mp3'),
    'u': new Audio('sfx/u.mp3'),
    'v': new Audio('sfx/v.mp3'),
    'w': new Audio('sfx/w.mp3'),
    'x': new Audio('sfx/x.mp3'),
    'y': new Audio('sfx/y.mp3'),
    'z': new Audio('sfx/z.mp3'),
    '0': new Audio('sfx/0.mp3'),
    '1': new Audio('sfx/1.mp3'),
    '2': new Audio('sfx/2.mp3'),
    '3': new Audio('sfx/3.mp3'),
    '4': new Audio('sfx/4.mp3'),
    '5': new Audio('sfx/5.mp3'),
    '6': new Audio('sfx/6.mp3'),
    '7': new Audio('sfx/7.mp3'),
    '8': new Audio('sfx/8.mp3'),
    '9': new Audio('sfx/9.mp3'),
    ' ': new Audio('sfx/space.mp3')
};

// Eventos de tecleo
function handleKeyPress() {
    document.addEventListener('keydown', (event) => {
        const key = event.key.toLowerCase();

        // Excluir teclas de comandos (F1-F12, ESC, etc.)
        if (/^[a-z0-9]$/.test(key) || key === ' ') { 
            const sound = soundMap[key]; 
            if (sound) {
                sound.play(); // Reproducir el sonido
            }
        }
    });
}

// Ejecutar al cargar la página en la que se encuentre el script
window.addEventListener('DOMContentLoaded', () => {
    handleKeyPress();
});
