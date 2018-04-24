class DialogueBalloon extends Phaser.Sprite {
	constructor(game, x, y, text, textsettings, width = 0, height = 0, mirror = false) {
		super(game, x, y);
		this.game = game;
		this.game.add.existing(this);

		this.text = this.game.add.text(0, 0, text, textsettings);
		this.text.anchor.set(0.5);
		this.text.alpha = 0.0;

		this.mirror = mirror;

		if (width === 0)
			this.target_width = this.text.width + 20;
		else
			this.target_width = width;

		if (height === 0)
			this.target_height = this.text.height + 20;
		else
			this.target_height = height;

		this.balao_corpo = this.game.add.image(0, 0, 'balao_corpo');
		this.balao_corpo.anchor.set(0.5);
		this.balao_corpo_size = [this.balao_corpo.width, this.balao_corpo.height];
		this.balao_corpo.scale.setTo(50 / this.balao_corpo.width, 0.0);
		this.addChild(this.balao_corpo);

		this.balao_rabo = this.game.add.image(this.text.width * 0.3, this.text.height * 0.5 + 8, 'balao_rabo');
		this.balao_rabo.anchor.setTo(0.5, 0.0);
		this.balao_rabo.alpha = 0.0;
		this.balao_rabo.scale.set((this.text.width * 0.1) / this.balao_rabo.width);

		if (this.mirror) {
			this.balao_rabo.x = -this.text.width * 0.3;
			this.balao_rabo.scale.x *= -1;
		}

		this.addChild(this.balao_rabo);

		this.addChild(this.text);

		var y_tween = this.game.add.tween(this.balao_corpo.scale).to({ y: this.target_height / this.balao_corpo_size[1] }, 300, Phaser.Easing.Linear.None, true);
		var x_tween = this.game.add.tween(this.balao_corpo.scale).to({ x: this.target_width / this.balao_corpo_size[0] }, 300, Phaser.Easing.Linear.None, true, 300);
		var alpha_tween = this.game.add.tween(this.balao_rabo).to({ alpha: 1.0 }, 500, Phaser.Easing.Linear.None, true, 600);
		var text_tween = this.game.add.tween(this.text).to({ alpha: 1.0 }, 500, Phaser.Easing.Linear.None, true, 600);
	}

	changeText(new_text, new_x = null, new_y = null, mirror = null, hide_rabo = false) {
		if (this.text_fadein)
			this.text_fadein.stop();
		if (this.text_fadeout)
			this.text_fadeout.stop();

		if (hide_rabo === true){
			this.game.add.tween(this.balao_rabo).to({alpha:0.0}, 300, Phaser.Easing.Linear.None, true);
		} else {
			this.game.add.tween(this.balao_rabo).to({alpha:1.0}, 300, Phaser.Easing.Linear.None, true);
		}

		this.text_fadeout = this.game.add.tween(this.text).to({ alpha: 0.0 }, 300, Phaser.Easing.Linear.None, true);
		this.text_fadeout.onComplete.add(function () {
			this.text.setText(new_text);
			this.text_fadein = this.game.add.tween(this.text).to({ alpha: 1.0 }, 300, Phaser.Easing.Linear.None, true);

			this.target_width = this.text.width + 20;
			this.target_height = this.text.height + 20;

			this.game.add.tween(this.balao_corpo.scale).to({ x: this.target_width / this.balao_corpo_size[0], y: this.target_height / this.balao_corpo_size[1] }, 300, Phaser.Easing.Linear.None, true);

			this.game.add.tween(this).to({ x: new_x ? new_x : this.x, y: new_y ? new_y : this.y }, 300, Phaser.Easing.Linear.None, true);

			if (mirror !== null && this.mirror !== mirror){
				this.mirror = mirror;
				this.game.add.tween(this.balao_rabo.scale).to({x: -this.balao_rabo.scale.x}, 300, Phaser.Easing.Linear.None, true);
			}

			if (!this.mirror)
				this.game.add.tween(this.balao_rabo).to({ x: this.text.width * 0.3, y: this.text.height * 0.5 + 8 }, 300, Phaser.Easing.Linear.None, true);
			else
				this.game.add.tween(this.balao_rabo).to({ x: -this.text.width * 0.3, y: this.text.height * 0.5 + 8 }, 300, Phaser.Easing.Linear.None, true);

		}, this);
	}

	purge() {
		var text_fadeout = this.game.add.tween(this.text).to({ alpha: 0.0 }, 200, Phaser.Easing.Linear.None, true);

		var y_tween = this.game.add.tween(this.balao_corpo.scale).to({ y: 0 }, 300, Phaser.Easing.Linear.None, true, 300);

		var x_tween = this.game.add.tween(this.balao_corpo.scale).to({ x: 0 }, 300, Phaser.Easing.Linear.None, true);

		var alpha_tween = this.game.add.tween(this.balao_rabo).to({ alpha: 0.0 }, 200, Phaser.Easing.Linear.None, true);

		var timer = this.game.time.create();
		timer.add(600, function () {
			this.destroy();
		}, this);
		timer.start();
	}
}

export default DialogueBalloon;
