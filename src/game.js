import Boot from './boot.js';
import End from './end.js';
import Level from './level.js';
import Level2 from './level2.js';
import Level1 from './level1.js';
import Level3 from './level3.js';
import Inicio from './Inicio.js'
import Opciones from './Opciones.js';
import Creditos from './Creditos.js';
import parallaxScene from './parallaxScene.js';
import GameUI from './GameUI.js'
import Transicion from './transicion.js'
import Transicion1 from './transicion1.js'


/**
 * Inicio del juego en Phaser. Creamos el archivo de configuración del juego y creamos
 * la clase Game de Phaser, encargada de crear e iniciar el juego. 
 */
let config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 500,
    scale: {
        //mode: Phaser.Scale.FIT,  
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },
    pixelArt: true,
    scene: [Inicio, Opciones,  Boot, Transicion, Transicion1, Level3, GameUI, Creditos, End],
    physics: {
        default: 'matter',//cambiado el arcade
        // matter: {
        //     debug: true
        // }
     }
};

let config2 = {
    type: Phaser.AUTO,
    width: 800,
    height: 520,
    pixelArt: true,
    scene: [Inicio, Opciones, Creditos, Boot, Transicion1, Transicion, Level3, End],
    physics: {
        default: 'arcade',//cambiado el arcade
        arcade: {
            gravity: {y:200}
        }
    }
};

new Phaser.Game(config);
