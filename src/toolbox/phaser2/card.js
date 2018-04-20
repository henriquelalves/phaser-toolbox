// A card prop, made it so it can 'hover', highlight and flip
// Need Front and Back side images, the highlight image and the shadow image.

class Card extends Phaser.Sprite {
	constructor(game, x, y, frontside, backside, yflip = false) {
		super(game, x, y);
		this.game = game;
		this.yflip = yflip;
		this.anchor.set(0.5);

		this.sides = this.game.add.image(0, 0);
		this.shadow_scaler = this.game.add.image(0, 0);

		// Setting sprites
		this.frontSide = this.game.add.sprite(0, 0, frontside);
		this.frontSide.anchor.set(0.5);
		this.backSide = this.game.add.sprite(0, 0, backside);
		this.backSide.anchor.set(0.5);
		this.frontSide.scale.setTo(this.backSide.width / this.frontSide.width, this.backSide.height / this.frontSide.height);
		// this.backSide.scale.setTo(this.frontSide.width/this.backSide.width,this.frontSide.height/this.backSide.height);
		this.highlight = this.game.add.sprite(0, 0, "card_highlight");
		this.highlight.scale.setTo((this.frontSide.width + 40.0) / this.highlight.width, (this.frontSide.height + 40.0) / this.highlight.height);
		this.highlight.anchor.set(0.5);
		this.highlight.alpha = 0.0;

		this.sides.addChild(this.highlight);
		this.sides.addChild(this.frontSide);
		this.sides.addChild(this.backSide);

		// Shadow
		this.shadow = this.game.add.sprite(0, 0, 'card_shadow');
		this.shadow.alpha = 0.8;
		this.shadow.anchor.set(0.5);
		this.shadow.scale.setTo(this.frontSide.width / this.shadow.width, this.frontSide.height / this.shadow.height);
		this.shadow_scaler.addChild(this.shadow);

		this.addChild(this.shadow_scaler);
		this.addChild(this.sides);

		// Visibility
		this.frontUp = true;
		this.setSide(true);

		// Tween state
		this.flipTween = null;
		this.shadowTween = null;
		this.flipState = 0; // 0- not flipping; 1- start flipping; 2- end flipping
		this.verticalFlip = yflip;

		this.shadowHoverTween = null;
		this.sidesHoverTween = null;

		// Signals
		this.flipped = new Phaser.Signal();

		// Add to game
        this.game.add.existing(this);
	}

	setBackSide(str) {
		this.backSide.loadTexture(str);
		this.backSide.scale.set(1.0);
		this.backSide.scale.setTo(this.frontSide.width / this.backSide.width, this.frontSide.height / this.backSide.height);
	}

	setHovering(d, tweening = true) {
		if (tweening) {
			if (this.shadowHoverTween) {
				this.shadowHoverTween.stop();
				this.sidesHoverTween.stop();
			}
			this.game.add.tween(this.sides).to({ x: -d, y: -d }, 500, Phaser.Easing.Cubic.Out, true);
			this.game.add.tween(this.shadow).to({ x: d, y: d }, 500, Phaser.Easing.Cubic.Out, true);
		} else {
			this.sides.x = -d;
			this.sides.y = -d;
			this.shadow.x = d;
			this.shadow.y = d;
		}
	}

	flip(will_dispatch = true) {
		if (will_dispatch)
			this.flipped.dispatch(this);

		this.bringToTop();
		let v = this.verticalFlip;
		if (this.flipTween) { // Stop tween
			this.flipTween.stop();
			this.shadowTween.stop();
		}
		if (this.flipState == 0 || this.flipState == 2) {
			if (v === false) {
				this.flipTween = this.game.add.tween(this.sides.scale).to({ x: 0.0, y: 1.2 }, 400, Phaser.Easing.Cubic.In, true);
				this.shadowTween = this.game.add.tween(this.shadow_scaler.scale).to({ x: 0.1, y: 1.1 }, 400, Phaser.Easing.Cubic.In, true);
				this.flipState = 1;
				this.flipTween.onComplete.add(function () {
					this.setSide(!this.frontUp);
					this.flip(false);
				}, this);
			} else {
				this.flipTween = this.game.add.tween(this.sides.scale).to({ x: 1.2, y: 0.0 }, 400, Phaser.Easing.Cubic.In, true);
				this.shadowTween = this.game.add.tween(this.shadow_scaler.scale).to({ x: 1.1, y: 0.1 }, 400, Phaser.Easing.Cubic.In, true);
				this.flipState = 1;
				this.flipTween.onComplete.add(function () {
					this.setSide(!this.frontUp);
					this.flip(false);
				}, this);
			}
		}

		else if (this.flipState == 1) {
			if (v === false) {
				this.flipTween = this.game.add.tween(this.sides.scale).to({ x: 1.0, y: 1.0 }, 400, Phaser.Easing.Cubic.Out, true);
				this.shadowTween = this.game.add.tween(this.shadow_scaler.scale).to({ x: 1.0, y: 1.0 }, 400, Phaser.Easing.Cubic.Out, true);
				this.flipState = 2;
			} else {
				this.flipTween = this.game.add.tween(this.sides.scale).to({ x: 1.0, y: 1.0 }, 400, Phaser.Easing.Cubic.Out, true);
				this.shadowTween = this.game.add.tween(this.shadow_scaler.scale).to({ x: 1.0, y: 1.0 }, 400, Phaser.Easing.Cubic.Out, true);
				this.flipState = 2;
			}
		}
	}

	setSide(b) {
		this.frontUp = b;
		this.frontSide.alpha = (b) ? 1.0 : 0.0;
		this.backSide.alpha = (b) ? 0.0 : 1.0;
	}

	unsetFlippable() {
		this.setHovering(0);
		this.highlight.alpha = 0.0;
		this.events.onInputDown.removeAll();
		this.events.onInputOver.removeAll();
		this.events.onInputOut.removeAll();

		this.inputEnabled = false;
	}

	setFlippable() {
		this.inputEnabled = true;
		this.setHovering(5);
		this.events.onInputDown.add(function () { this.flip() }, this);
		if (this.game.device.desktop) {
			this.events.onInputOver.add(function () { this.highlight.alpha = 1.0; this.setHovering(10); this.bringToTop(); }, this);
			this.events.onInputOut.add(function () { this.highlight.alpha = 0.0; this.setHovering(5); }, this);
		}
	}
}

export default Card;
