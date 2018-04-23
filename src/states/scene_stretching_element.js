import StretchingElement from '../toolbox/phaser2/stretching_element';

class SceneStretchingElement extends Phaser.State {

	constructor() {
		super();
	}

	create() {
		this.background = this.game.add.image(0,0,'background');
		this.background.scale.setTo(this.game.width/this.background.width, this.game.height/this.background.height);

		this.element = new StretchingElement(this.game, this.game.width / 2.0, this.game.height / 2.0, 'apple', 0.0);

		this.element.enable();
		this.element.on_drop.add(function () { this.element.enable();}, this);
	}
}

export default SceneStretchingElement;

