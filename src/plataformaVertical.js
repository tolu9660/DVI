
import GameObject from './gameobj.js';
/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 * También almacena la puntuación o número de estrellas que ha recogido hasta el momento.
 */
 export default class PlataformaVertical extends GameObject {
  
  constructor(scene,x,y){
      super(scene,x,y,'pmAnimacion', 10,'pm', 'Cyber Floating Tile', 1,3);
      this.body.ignoreGravity = true;
      this.body.immovable=true;
      this.posicion_plataforma_x = this.x
      this.posicion_plataforma_y = this.y
  }
 
  actu(dt){
   
     
      if (this.y == this.posicion_plataforma_y){
      console.log('poedo');
      this.direccionPlataforma = 3
      }
      if (this.y == this.posicion_plataforma_y + 900){
      console.log('final');
      this.direccionPlataforma = -3
      }
      this.y += this.direccionPlataforma;
    }
}

