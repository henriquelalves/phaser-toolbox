// A sprite with a 'glitch' effect, called on 'glitch()'

class GlitchSprite extends Phaser.Sprite {
	constructor(game, x, y, sprite, glitch_timer = true, timeoffset = 3500) {
		super(game, x, y);
		this.game.add.existing(this);
		this.game = game;
		this.glitch_timer = glitch_timer;

		this.image_width = this.game.cache.getImage(sprite).width;
		this.image_height = this.game.cache.getImage(sprite).height;

		var rect = new Phaser.Rectangle(0, 0, 0, 0);
		rect.width = this.image_width;
		rect.height = this.image_height / 4;
		this.textures = [];

		for (var i = 0; i < 4; i++) {
			var texture = this.game.add.image(0, 0, sprite);
			texture.y = (texture.height / 4) * i;
			rect.y = texture.height / 4 * i;
			texture.crop(rect);
			this.addChild(texture);
			this.textures.push(texture);
		}

		this.glitch_xoffset = 50;

		var timeoffset = 3500 + Math.random() * 1000;
		this.glitchtimer = this.game.time.create();
		this.glitchtimer.loop(timeoffset, function () {
			this._glitch();
			if (this.temp_timer)
				this.temp_timer.destroy();
			this.temp_timer = this.game.time.create();
			this.temp_timer.add(100, this._glitch, this);
			this.temp_timer.add(200, this._glitch, this);
			this.temp_timer.add(300, this.restore, this);
			this.temp_timer.start();
		}, this);

		if (this.glitch_timer)
			this.glitchtimer.start();
	}

	setAnchor(x, y) {
		for (var i = 0; i < this.textures.length; i++) {
			this.textures[i].anchor.setTo(x, y);
		}
	}

	glitch() {
		this._glitch();
		if (this.temp_timer)
			this.temp_timer.destroy();
		this.temp_timer = this.game.time.create();
		this.temp_timer.add(100, this._glitch, this);
		this.temp_timer.add(200, this._glitch, this);
		this.temp_timer.add(300, this.restore, this);
		this.temp_timer.start();
	}

	_glitch() {
		for (var i = 0; i < this.textures.length; i++) {
			this.textures[i].x = Math.random() * (this.glitch_xoffset * 2) - this.glitch_xoffset;
		}
	}

	restore() {
		for (var i = 0; i < this.textures.length; i++) {
			this.textures[i].x = 0;
		}
	}

}

export default GlitchSprite;
