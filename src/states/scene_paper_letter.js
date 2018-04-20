import PaperLetter from '../toolbox/phaser2/paper_letter';

class SceneCustomButton extends Phaser.State {

	constructor() {
		super();
	}

	create() {
		this.game.stage.backgroundColor = "#aaaaaa";

		this.letter = new PaperLetter(this.game, this.game.width + 100, this.game.height/2.0,'letter');

		this.letter.slide(this.game.width /2.0, this.game.height/2.0);
	}
}

export default SceneCustomButton;

