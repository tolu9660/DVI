
import GameObject from './gameobj.js';
/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 * También almacena la puntuación o número de estrellas que ha recogido hasta el momento.
 */
 export default class PlataformaHorizontal extends GameObject {
  
  constructor(scene,x,y,type){
      super(scene,x,y,'pmAnimacion', 10,'pm', 'Cyber Floating Tile', 1,3);
      this.body.ignoreGravity = true;
      this.body.immovable=true;
      this.type=type;
      this.posicion_plataforma_x = this.x
      this.posicion_plataforma_y = this.y
  }
 getType()
 {
     return this.type;
 }
  actu(dt){
   
      if (this.x == this.posicion_plataforma_x){
      this.direccionPlataforma = 3
      }
      if (this.x == this.posicion_plataforma_x + 900){
      this.direccionPlataforma = -3
      }
      this.x += this.direccionPlataforma;
    }
}

