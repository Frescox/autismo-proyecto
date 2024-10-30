// Mapa de sonidos para cada letra del alfabeto y números
const soundMap = {
    'a': new Audio('Sonido_teclado/sfx/a.mp3'),
    'b': new Audio('Sonido_teclado/sfx/b.mp3'),
    'c': new Audio('Sonido_teclado/sfx/c.mp3'),
    'd': new Audio('Sonido_teclado/sfx/d.mp3'),
    'e': new Audio('Sonido_teclado/sfx/e.mp3'),
    'f': new Audio('Sonido_teclado/sfx/f.mp3'),
    'g': new Audio('Sonido_teclado/sfx/g.mp3'),
    'h': new Audio('Sonido_teclado/sfx/h.mp3'),
    'i': new Audio('Sonido_teclado/sfx/i.mp3'),
    'j': new Audio('Sonido_teclado/sfx/j.mp3'),
    'k': new Audio('Sonido_teclado/sfx/k.mp3'),
    'l': new Audio('Sonido_teclado/sfx/l.mp3'),
    'm': new Audio('Sonido_teclado/sfx/m.mp3'),
    'n': new Audio('Sonido_teclado/sfx/n.mp3'),
    'o': new Audio('Sonido_teclado/sfx/o.mp3'),
    'p': new Audio('Sonido_teclado/sfx/p.mp3'),
    'q': new Audio('Sonido_teclado/sfx/q.mp3'),
    'r': new Audio('Sonido_teclado/sfx/r.mp3'),
    's': new Audio('Sonido_teclado/sfx/s.mp3'),
    't': new Audio('Sonido_teclado/sfx/t.mp3'),
    'u': new Audio('Sonido_teclado/sfx/u.mp3'),
    'v': new Audio('Sonido_teclado/sfx/v.mp3'),
    'w': new Audio('Sonido_teclado/sfx/w.mp3'),
    'x': new Audio('Sonido_teclado/sfx/x.mp3'),
    'y': new Audio('Sonido_teclado/sfx/y.mp3'),
    'z': new Audio('Sonido_teclado/sfx/z.mp3'),
    '0': new Audio('Sonido_teclado/sfx/0.mp3'),
    '1': new Audio('Sonido_teclado/sfx/1.mp3'),
    '2': new Audio('Sonido_teclado/sfx/2.mp3'),
    '3': new Audio('Sonido_teclado/sfx/3.mp3'),
    '4': new Audio('Sonido_teclado/sfx/4.mp3'),
    '5': new Audio('Sonido_teclado/sfx/5.mp3'),
    '6': new Audio('Sonido_teclado/sfx/6.mp3'),
    '7': new Audio('Sonido_teclado/sfx/7.mp3'),
    '8': new Audio('Sonido_teclado/sfx/8.mp3'),
    '9': new Audio('Sonido_teclado/sfx/9.mp3'),
    ' ': new Audio('Sonido_teclado/sfx/space.mp3')
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
