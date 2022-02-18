export default class Creditos extends Phaser.Scene{


    constructor() {
        super({ key: 'Creditos' });
      }
     
      create()
      {
        
        this.creditsText = this.add.text(0, 0, 'Creditos', { fontSize: '32px', fill: '#fff' });
        this.madeByText = this.add.text(0, 0, 'Creado Por :  ', { fontSize: '26px', fill: '#fff', });
        this.jesus= this.add.text(0, 0, 'Jesús Vélez Ayuso ', { fontSize: '26px', fill: '#fff', });
        this.alvaro= this.add.text(0, 0, 'Alvaro Gomez Morán ', { fontSize: '26px', fill: '#fff', });
        this.luis= this.add.text(0, 0, 'Luis Gabriel Román Santillán ', { fontSize: '26px', fill: '#fff', });
        this.david= this.add.text(0, 0, 'David Domínguez Gutiérrez', { fontSize: '26px', fill: '#fff', });
        this.zone = this.add.zone(1000/2, 500/2, 1000, 500);
    
        Phaser.Display.Align.In.Center(
          this.creditsText,
          this.zone
        );
    
        Phaser.Display.Align.In.Center(
          this.luis,
          this.zone
        );
        Phaser.Display.Align.In.Center(
          this.alvaro,
          this.zone
        );
        Phaser.Display.Align.In.Center(
          this.david,
          this.zone
        );
        Phaser.Display.Align.In.Center(
          this.madeByText,
          this.zone
        );
        Phaser.Display.Align.In.Center(
          this.jesus,
          this.zone
        );
    
        this.madeByText.setY(1000);
      this.jesus.setY(1100);
      this.alvaro.setY(1200);
      this.luis.setY(1300);
      this.david.setY(1400);
    
        this.creditsTween = this.tweens.add({
          targets: this.creditsText,
          y: -100,
          ease: 'Power1',
          duration: 3000,
          delay: 1000,
          onComplete: function () {
            this.destroy;
          }
        });
        
        
    
        this.madeByTween = this.tweens.add({
          targets: this.madeByText,
          y: -300,
          ease: 'Power1',
          duration: 8000,
          delay: 1000,
          onComplete: function () {
            this.madeByTween.destroy;

            this.scene.start('inicio');
          }.bind(this)
          
        });
        this.jesus = this.tweens.add({
          targets: this.jesus,
          y: -200,
          ease: 'Power1',
          duration: 8000,
          delay: 1100,
          onComplete: function () {
            this.jesus.destroy;
          }
        });
        this.alvaro= this.tweens.add({
          targets: this.alvaro,
          y: -200,
          ease: 'Power1',
          duration: 8000,
          delay: 1200,
          onComplete: function () {
            this.alvaro.destroy;
          }
        });
        this.luis = this.tweens.add({
          targets: this.luis,
          y: -200,
          ease: 'Power1',
          duration: 8000,
          delay: 1300,
          onComplete: function () {
            this.luis.destroy;
          }
        });
        this.david= this.tweens.add({
          targets: this.david,
          y: -200,
          ease: 'Power1',
          duration: 8000,
          delay: 1400,
          onComplete: function () {
          this.david.destroy; 
        }
      });
    }
}