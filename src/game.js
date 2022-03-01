import Boot from './boot.js';
import End from './end.js';
import Level from './level.js';
import Inicio from './Inicio.js'
import Opciones from './Opciones.js';
import Creditos from './Creditos.js';

/**
 * Inicio del juego en Phaser. Creamos el archivo de configuración del juego y creamos
 * la clase Game de Phaser, encargada de crear e iniciar el juego. 
 */
let config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 480,
    scale: {
        // mode: Phaser.Scale.FIT,  
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },
    pixelArt: true,
    scene: [Inicio, Opciones, Creditos, Boot, Level, End],
    physics: {
        default: 'matter',//cambiado el arcade
        matter: {
            debug: true
        }
    }
};

new Phaser.Game(config);
