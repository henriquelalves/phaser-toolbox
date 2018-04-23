class StretchingElement extends Phaser.Sprite {

	constructor(game, x, y, image, angle) {

		super(game, x, y);
		// this.angle = angle;
		this.image = image;
		this.game = game;
		this.anchor.setTo(0.5, 0.5);
		this.tx = x;
		this.ty = y;

		// Angle data
		this.image_angle = angle;

		// Render sprite
		this.render_sprite = new Phaser.Sprite(this.game, 0, 0, this.image);
		this.render_sprite.anchor.setTo(0.5, 0.5);
		this.addChild(this.render_sprite);

		// Drag'n drop
		this.distortable = true;
		this.mouse_anchor = new Phaser.Point();
		this.mouse_center = new Phaser.Point();
		this.update_distort = false;
		this.update_pos = false;

		this.render_sprite.inputEnabled = true;
		this.render_sprite.input.useHandCursor = true;
		this.render_sprite.input.pixelPerfectOver = true;
		this.render_sprite.input.pixelPerfectClick = true;

		this.render_sprite.events.onInputDown.add(this.inputDown, this);
		this.render_sprite.events.onInputUp.add(this.inputUp, this);
		this.render_sprite.angle = this.image_angle;

		this.render_sprite.inputEnabled = false; // Disable again

		this.on_drop = new Phaser.Signal();
		this.on_pop = new Phaser.Signal();

		this.game.add.existing(this);
	}

	disable() {
		this.render_sprite.inputEnabled = false;
	}

	enable() {
		this.distortable = true;
		this.render_sprite.inputEnabled = true;
		this.render_sprite.input.useHandCursor = true;
		this.render_sprite.input.pixelPerfectOver = true;
		this.render_sprite.input.pixelPerfectClick = true;
	}

	update() {
		if (this.update_distort) {
			if (this.distortable == true) {
				this.mouse_angle = Phaser.Point.angle(this.mouse_anchor, new Phaser.Point(this.game.input.x, this.game.input.y));
				this.x = this.game.input.x + this.mouse_center.x;
				this.y = this.game.input.y + this.mouse_center.y;
				this.scale.x = 1 + Phaser.Point.distance(this.mouse_anchor, new Phaser.Point(this.game.input.x, this.game.input.y)) * 0.015;
				
				this.render_sprite.angle = -Phaser.Math.radToDeg(this.mouse_angle) + this.image_angle;
				this.angle = Phaser.Math.radToDeg(this.mouse_angle);
			}
			if (this.scale.x > 2.0 || this.distortable == false) {
				if (this.distortable) {
					this.on_pop.dispatch(this, this.position);
					this.taken_wobble();
				}
				this.distortable = false;
				this.update_distort = false;
				this.update_pos = true;
			}
		}
		if (this.update_pos) {
			this.x = this.game.input.x + this.mouse_center.x;
			this.y = this.game.input.y + this.mouse_center.y;
		}
	}

	reset() {
		this.distortable = true;
		this.wobble(true);
	}

	inputDown() {
		this.mouse_anchor.x = this.game.input.x;
		this.mouse_anchor.y = this.game.input.y;
		this.mouse_center.x = this.x - this.mouse_anchor.x;
		this.mouse_center.y = this.y - this.mouse_anchor.y;

		this.update_distort = true;
		// this.render_sprite.scale.x = 1.2;
	}

	inputUp() {
		if (this.update_distort && this.distortable) {
			this.wobble(false);
			this.update_distort = false;
		} else if (this.update_pos) {
			this.tx = this.x;
			this.ty = this.y;
			this.update_pos = false;
			this.on_drop.dispatch(this, this.position);
		}
	}

	wobble(reset = false) {
		if (reset) {
			// this.render_sprite.x = this.tx;
			// this.render_sprite.y = this.ty;
			this.scale.x = 1.6;
			this.scale.y = 1.6;
		}
		this.game.add.tween(this.scale).to({ x: 1.0, y: 1.0 }, 500, Phaser.Easing.Bounce.Out, true);
		this.game.add.tween(this).to({ x: this.tx, y: this.ty }, 500, Phaser.Easing.Bounce.Out, true);

	}

	taken_wobble() {
		this.scale.x = 1.8;
		this.scale.y = 2.0;
		this.game.add.tween(this.scale).to({ x: 1.0, y: 1.0 }, 1000, Phaser.Easing.Bounce.Out, true);
	}
}

export default StretchingElement;
