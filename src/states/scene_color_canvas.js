import ColorCanvas from '../toolbox/phaser2/color_canvas';

class SceneColorCanvas extends Phaser.State {

	constructor() {
		super();
	}

	create() {
		this.game.stage.backgroundColor = "#e3e1e1";
		this.drawing = new ColorCanvas(this.game, this.game.width / 2.0, this.game.height / 2.0, 'dog');

	}
}

export default SceneColorCanvas;

