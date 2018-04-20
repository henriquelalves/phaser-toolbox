class CustomButton extends Phaser.Button {

	constructor(game, x, y, image, callback, callbackContext) {

		super(game, x, y - game.cache.getImage(image).height / 2.0, image, callback, callbackContext, undefined, 0, 0);

		this.anchor.setTo(0.5, 0.5);
		this.game = game;

		this.onInputOver.add(this.inputOver, this);
		this.onInputOut.add(this.inputOut, this);

		this.defaultScale = 1.0;

		this.hover_button = false;

		game.add.existing(this);
	}

	set_hover_button(b) {
		this.hover_button = (!!b);
	}

	setScale(s) {
		this.defaultScale = s;
		this.scale.setTo(this.defaultScale, this.defaultScale);
	}

	inputOver() {
		if (!this.hover_button)
			this.game.add.tween(this.scale).to({ x: this.defaultScale * 1.1, y: this.defaultScale * 1.1 }, 500, Phaser.Easing.Cubic.Out, true);
	}

	inputOut() {
		if (!this.hover_button)
			this.game.add.tween(this.scale).to({ x: this.defaultScale, y: this.defaultScale }, 500, Phaser.Easing.Cubic.Out, true);
	}
}

export default CustomButton;
