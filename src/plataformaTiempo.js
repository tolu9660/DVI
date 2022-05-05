
import GameObject from './gameobj.js';
/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 * También almacena la puntuación o número de estrellas que ha recogido hasta el momento.
 */
 export default class PlataformaTiempo extends GameObject {
  
  constructor(scene,x,y,type){
      super(scene,x,y,'pmAnimacion', 10,'pm', 'Cyber Floating Tile', 1,3);
      this.body.ignoreGravity = true;
      this.body.immovable=true;
      this.posicion_plataforma_x = this.x
      this.posicion_plataforma_y = this.y
      this.baja=false
      this.type=type
    this.scene=scene;
    console.log(this)
    
    
  }
  
  getType()
  {
    return this.type;
  }
  moveDown(){
    
}
  actu(dt){

  }
   
}

