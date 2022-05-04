import Boot from './boot.js';

import Level from './level.js';
import Level2 from './level2.js';
import Level1 from './level1.js';
import Tutorial from './tutorial.js';
import Level3 from './level3.js';
import Inicio from './Inicio.js'
import Opciones from './Opciones.js';
import Creditos from './Creditos.js';
import parallaxScene from './parallaxScene.js';
import GameUI from './GameUI.js';
import Transicion from './transicion.js'
import Transicion1 from './transicion1.js'
import Pause from './Pause.js';
import Gameover from'./Gameover.js';


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
    scene: [Boot, Pause,Tutorial,GameUI, Creditos, Gameover],
    physics: {
        default: 'arcade',//cambiado el arcade
        arcade: {
            gravity: {y:460},
            debug: true
         }
     }
};

new Phaser.Game(config);
