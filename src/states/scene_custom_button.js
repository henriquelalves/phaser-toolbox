import CustomButton from '../toolbox/phaser2/custom_button';

class SceneCustomButton extends Phaser.State {

	constructor() {
		super();
	}

	create() {
		this.background = this.game.add.image(0,0,'background');
		this.background.scale.setTo(this.game.width/this.background.width, this.game.height/this.background.height);

		this.button = new CustomButton(this.game, this.game.width / 2.0, this.game.height / 2.0, 'button', this._button_pressed, this);

	}

	_button_pressed() {
		this.button.x = Math.random() * this.game.width;
		this.button.y = Math.random() * this.game.height;
		this.button.inputOut();
	}
}

export default SceneCustomButton;

