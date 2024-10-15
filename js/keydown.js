// Arreglo que mapea cada tecla del teclado (excluyendo teclas como F1-F12, Shift, Control, etc.) a un sonido específico
const keySoundMap = {
    8: 'sfx/a1.mp3',    // Backspace
    9: 'sfx/b2.mp3',    // Tab
    13: 'sfx/c3.mp3',   // Enter
    20: 'sfx/d4.mp3',   // Caps Lock
    27: 'sfx/e5.mp3',   // Escape
    32: 'sfx/f6.mp3',   // Space
    33: 'sfx/g7.mp3',   // Page Up
    34: 'sfx/h8.mp3',   // Page Down
    35: 'sfx/i9.mp3',   // End
    36: 'sfx/j1.mp3',   // Home
    37: 'sfx/k2.mp3',   // Left Arrow
    38: 'sfx/l3.mp3',   // Up Arrow
    39: 'sfx/m4.mp3',   // Right Arrow
    40: 'sfx/n5.mp3',   // Down Arrow
    45: 'sfx/o6.mp3',   // Insert
    46: 'sfx/p7.mp3',   // Delete
    48: 'sfx/q8.mp3',   // 0
    49: 'sfx/r9.mp3',   // 1
    50: 'sfx/s1.mp3',   // 2
    51: 'sfx/t2.mp3',   // 3
    52: 'sfx/u3.mp3',   // 4
    53: 'sfx/v4.mp3',   // 5
    54: 'sfx/x5.mp3',   // 6
    55: 'sfx/y6.mp3',   // 7
    56: 'sfx/z7.mp3',   // 8
    57: 'sfx/9.mp3',    // 9
    65: 'sfx/aa1.mp3',  // A
    66: 'sfx/ab2.mp3',  // B
    67: 'sfx/ac3.mp3',  // C
    68: 'sfx/ad4.mp3',  // D
    69: 'sfx/ae5.mp3',  // E
    70: 'sfx/af6.mp3',  // F
    71: 'sfx/ag7.mp3',  // G
    72: 'sfx/ah8.mp3',  // H
    73: 'sfx/ai9.mp3',  // I
    74: 'sfx/aj1.mp3',  // J
    75: 'sfx/ak2.mp3',  // K
    76: 'sfx/al3.mp3',  // L
    77: 'sfx/am4.mp3',  // M
    78: 'sfx/an5.mp3',  // N
    79: 'sfx/ao6.mp3',  // O
    80: 'sfx/ap7.mp3',  // P
    81: 'sfx/aq8.mp3',  // Q
    82: 'sfx/r9.mp3',   // R
    83: 'sfx/s1.mp3',   // S
    84: 'sfx/t2.mp3',   // T
    85: 'sfx/u3.mp3',   // U
    86: 'sfx/v4.mp3',   // V
    87: 'sfx/x5.mp3',   // W
    88: 'sfx/y6.mp3',   // X
    89: 'sfx/z7.mp3',   // Y
    90: 'sfx/a1.mp3',   // Z
    96: 'sfx/aa1.mp3',  // Numpad 0
    97: 'sfx/ab2.mp3',  // Numpad 1
    98: 'sfx/ac3.mp3',  // Numpad 2
    99: 'sfx/ad4.mp3',  // Numpad 3
    100: 'sfx/ae5.mp3', // Numpad 4
    101: 'sfx/af6.mp3', // Numpad 5
    102: 'sfx/ag7.mp3', // Numpad 6
    103: 'sfx/ah8.mp3', // Numpad 7
    104: 'sfx/ai9.mp3', // Numpad 8
    105: 'sfx/aj1.mp3', // Numpad 9
    106: 'sfx/ak2.mp3', // Numpad *
    107: 'sfx/al3.mp3', // Numpad +
    109: 'sfx/am4.mp3', // Numpad -
    110: 'sfx/an5.mp3', // Numpad .
    111: 'sfx/ao6.mp3', // Numpad /
    186: 'sfx/ap7.mp3', // ;
    187: 'sfx/aq8.mp3', // =
    188: 'sfx/a1.mp3',  // ,
    189: 'sfx/b2.mp3',  // -
    190: 'sfx/c3.mp3',  // .
    191: 'sfx/d4.mp3',  // /
    192: 'sfx/e5.mp3',  // `
    219: 'sfx/f6.mp3',  // [
    220: 'sfx/g7.mp3',  // \
    221: 'sfx/h8.mp3',  // ]
    222: 'sfx/i9.mp3'   // '
};

// Función para obtener el sonido asociado a una tecla
function getSoundForKey(keyCode) {
    const soundPath = keySoundMap[keyCode];  // Busca la ruta del sonido en el mapeo
    if (soundPath) {
        return new Audio(soundPath);  // Crea un nuevo objeto de sonido para reproducir
    }
    return null;  // Si no hay un sonido asociado, retorna null
}

// Eventos de tecleo
function handleKeyPress() {
    document.addEventListener('keydown', (event) => {
        const sound = getSoundForKey(event.keyCode);  // Obtén el sonido asociado a la tecla presionada
        if (sound) {
            sound.play();  // Reproduce el sonido si existe
        }
    });
}

// Función para manejar clics en cualquier botón
function handleButtonClick() {
    document.querySelectorAll('button').forEach((button) => {
        button.addEventListener('click', () => {
            const randomSound = getSoundForKey(Math.floor(Math.random() * 90) + 48); // Sonido aleatorio
            if (randomSound) {
                randomSound.play();
            }
        });
    });
}

// Ejecutar al cargar la página
window.addEventListener('DOMContentLoaded', () => {
    handleKeyPress();
    handleButtonClick(); // Activar detección de clics en botones
});
