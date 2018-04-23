import Card from '../toolbox/phaser2/card';

class SceneCard extends Phaser.State {

	constructor() {
		super();
	}

	create() {
		this.background = this.game.add.image(0,0,'background');
		this.background.scale.setTo(this.game.width/this.background.width, this.game.height/this.background.height);
		this.card = new Card(this.game, this.game.width/2.0, this.game.height/2.0, 'card_front', 'card_back', false);
		this.card.setFlippable();

	}
}

export default SceneCard;

