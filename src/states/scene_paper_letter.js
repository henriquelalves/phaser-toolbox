import PaperLetter from '../toolbox/phaser2/paper_letter';

class SceneCustomButton extends Phaser.State {

	constructor() {
		super();
	}

	create() {
		this.background = this.game.add.image(0,0,'background');
		this.background.scale.setTo(this.game.width/this.background.width, this.game.height/this.background.height);

		this.graphics = this.game.add.graphics(0,0);
		this.graphics.lineStyle(5, 0x111111, 1);												
    
		// draw a shape
		this.graphics.moveTo(0,this.game.height/2.0);
		this.graphics.lineTo(this.game.width, this.game.height/2.0);

		this.letter = new PaperLetter(this.game, this.game.width + 100, this.game.height/2.0,'letter');

		this.letter.slide(this.game.width /2.0, this.game.height/2.0);
	}
}

export default SceneCustomButton;

