class ColorCanvas extends Phaser.Sprite {

	constructor(game, x, y, sprite) {
		super(game, x, y);

		this.game = game;
		this.sprite = sprite;

		this.enable_tint = true;

		this.anchor.set(0.5);

		this.sprite_width = this.game.cache.getImage(this.sprite).width;
		this.sprite_height = this.game.cache.getImage(this.sprite).height;

		this.btm_mask = this.game.make.bitmapData(this.sprite_width, this.sprite_height);
		this.btm_mask.load(this.sprite);

		this.btm_mask.replaceRGB(0, 0, 0, 255, 255, 255, 255, 255);
		this.btm_mask.replaceRGB(0, 0, 0, 0, 0, 0, 0, 255);
		this.btm_mask.replaceRGB(255, 255, 255, 255, 0, 0, 0, 0);

		this.btm_texture = this.game.make.bitmapData(this.sprite_width, this.sprite_height);

		this.back_tint = 0xe3e1e1;
		this.back_tint_name = '';
		this.back_sprite = new Phaser.Sprite(this.game, 0, 0, 'blot');
		this.back_sprite.tint = this.back_tint;

		this.rgb_back = { r: 227, g: 225, b: 225, a: 255 };
		this.back_texture = this.game.make.bitmapData(this.sprite_width, this.sprite_height);
		this.back_texture.fill(this.rgb_back.r, this.rgb_back.g, this.rgb_back.b, this.rgb_back.a);

		this.btm_texture.alphaMask(this.back_texture, this.btm_mask);

		this.canvasimage = this.game.add.image(0, 0, this.btm_texture);
		this.canvasimage.anchor.set(0.5);
		this.canvasimage_texture = this.game.add.image(0, 0, this.sprite);
		this.canvasimage_texture.anchor.set(0.5);

		this.animate = false;

		this.addChild(this.canvasimage);
		this.addChild(this.canvasimage_texture);

		if (Phaser.Device.desktop) {
			this.canvasimage.inputEnabled = true;
			this.canvasimage.events.onInputDown.add(this.mouseClick, this);
		}

		this.front_tint_name = '';

		this.game.add.existing(this);
	}

	setBackTint(hex, name) {
		this.back_tint = hex;
		this.back_tint_name = name;
	}

	update() {
		if (this.animate) {
			this.back_sprite_width += 20;
			this.back_sprite_height += 20;

			this.draw_and_render();

			if (this.back_sprite_width > 3000) {
				this.animate = false;
			}
		}
	}

	setEnableTint(b) {
		this.enable_tint = b;
	}

	simulateClick() {
		if (!this.enable_tint)
			return;

		if (this.back_tint != this.back_sprite.tint) {
			this.back_sprite.tint = this.back_tint;
		}

		this.back_texture.fill(this.rgb_back.r, this.rgb_back.g, this.rgb_back.b, this.rgb_back.a);
		this.rgb_back.r = (this.back_tint >> 16);
		this.rgb_back.g = ((this.back_tint & 0x00ff00) >> 8);
		this.rgb_back.b = (this.back_tint & (0x0000ff));

		this.back_sprite_x = 200;
		this.back_sprite_y = 200;

		this.back_sprite_width = 0;
		this.back_sprite_height = 0;

		this.front_tint_name = this.back_tint_name;
		this.draw_and_render();
		this.animate = true;
	}

	mouseClick(obj) {

		if (!this.enable_tint)
			return;

		this.back_tint = Phaser.Color.getRandomColor(50, 255, 255);

		if (this.back_tint != this.back_sprite.tint) {
			this.back_sprite.tint = this.back_tint;
		}

		this.back_texture.fill(this.rgb_back.r, this.rgb_back.g, this.rgb_back.b, this.rgb_back.a);
		this.rgb_back.r = (this.back_tint >> 16);
		this.rgb_back.g = ((this.back_tint & 0x00ff00) >> 8);
		this.rgb_back.b = (this.back_tint & (0x0000ff));

		this.back_sprite_x = this.game.input.x - this.worldPosition.x + obj.width / 2.0;
		this.back_sprite_y = this.game.input.y - this.worldPosition.y + obj.height / 2.0;

		this.back_sprite_width = 0;
		this.back_sprite_height = 0;

		this.front_tint_name = this.back_tint_name;
		this.draw_and_render();
		this.animate = true;
	}

	draw_and_render() {
		this.back_texture.draw(this.back_sprite, this.back_sprite_x - this.back_sprite_width / 2.0, this.back_sprite_y - this.back_sprite_height / 2.0, this.back_sprite_width, this.back_sprite_height);
		this.btm_texture.alphaMask(this.back_texture, this.btm_mask);
	}
}

export default ColorCanvas;
