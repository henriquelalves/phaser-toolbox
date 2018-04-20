import CustomButton from '../toolbox/phaser2/custom_button';

class SceneCustomButton extends Phaser.State {

	constructor() {
		super();
	}

	create() {
		this.game.stage.backgroundColor = "#aaaaaa";

		this.button = new CustomButton(this.game, this.game.width / 2.0, this.game.height / 2.0, 'button', this._button_pressed, this);

	}

	_button_pressed() {
		this.button.x = Math.random() * this.game.width;
		this.button.y = Math.random() * this.game.height;
		this.button.inputOut();
	}
}

export default SceneCustomButton;

