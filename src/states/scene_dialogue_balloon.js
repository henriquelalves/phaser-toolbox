import DialogueBalloon from '../toolbox/phaser2/dialogue_balloon';

class SceneStretchingElement extends Phaser.State {

	constructor() {
		super();
	}

	create() {
		this.background = this.game.add.image(0,0,'background');
		this.background.scale.setTo(this.game.width/this.background.width, this.game.height/this.background.height);

		this.dialogue = new DialogueBalloon(this.game, this.game.width/2.0, this.game.height/2.0, 'Hello World!', {font:'60px Arial'});

	}
}

export default SceneStretchingElement;

