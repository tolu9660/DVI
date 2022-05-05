import Boot from './boot.js';

import Level from './level.js';
import Level2 from './level2.js';
import Level1 from './level1.js';
import Tutorial from './tutorial.js';
import Level3 from './level3.js';
import LevelBoss from './levelBoss.js';
import Inicio from './Inicio.js'
import Opciones from './Opciones.js';
import Creditos from './Creditos.js';
import parallaxScene from './parallaxScene.js';
import GameUI from './GameUI.js';
import Transicion from './transicion_0.js'
import Transicion1 from './transicion_1.js'
import Pause from './Pause.js';
import Gameover from'./Gameover.js';
import Transicionnivel3 from './transicionnivel3_0.js';
import Transicionnivel2_1 from './transicionnivel2_1.js';
import Transicionnivel2_2 from './transicionnivel2_2.js';

import Transicionnivel1 from './transicionnivel_1.js';
import Transicionnivel2_0 from './transicionNivel2_0.js';
import TransicionTutorial2 from './transicionTutorial2.js';
import transicionnivel4_0 from './transicionNivel4_0.js';
import Transicionnivel4_1 from './transicionNivel4_1.js';
import TransicionTutorial0 from './transicionTutorial0.js';
import TransicionTutorial1 from './transicionTutorial1.js';


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
    scene: [Inicio,Boot,Opciones,Pause, Tutorial,GameUI,Transicion,Transicion1,Transicionnivel1,Transicionnivel2_0,
        Transicionnivel2_1,Transicionnivel2_2,Transicionnivel3,transicionnivel4_0,Transicionnivel4_1,TransicionTutorial0,
        TransicionTutorial1,TransicionTutorial2,Level1,Level2,Level3,LevelBoss,Creditos, Gameover],
    physics: {
        default: 'arcade',//cambiado el arcade
        arcade: {
            gravity: {y:460},
            debug: true
         }
     }
};

new Phaser.Game(config);
