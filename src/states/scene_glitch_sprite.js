import GlitchSprite from '../toolbox/phaser2/glitch_sprite';

class SceneCustomButton extends Phaser.State {

	constructor() {
		super();
	}

	create() {
		this.background = this.game.add.image(0,0,'background');
		this.background.scale.setTo(this.game.width/this.background.width, this.game.height/this.background.height);

		this.glitchsprite = new GlitchSprite(this.game, this.game.width/2.0, this.game.height/2.0, 'glitch', true);

		this.glitchsprite.setAnchor(0.5, 0.5);

		this.glitchsprite.glitch()
	}
}

export default SceneCustomButton;

