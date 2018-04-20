import GlitchSprite from '../toolbox/phaser2/glitch_sprite';

class SceneCustomButton extends Phaser.State {

	constructor() {
		super();
	}

	create() {
		this.game.stage.backgroundColor = "#aaaaaa";

		this.glitchsprite = new GlitchSprite(this.game, this.game.width/2.0, this.game.height/2.0, 'glitch', true);

		this.glitchsprite.setAnchor(0.5, 0.5);

		this.glitchsprite.glitch()
	}
}

export default SceneCustomButton;

