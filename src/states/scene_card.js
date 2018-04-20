import Card from '../toolbox/phaser2/card';

class SceneCard extends Phaser.State {

	constructor() {
		super();
	}

	create() {
		this.game.stage.backgroundColor = "#aaaaaa";
		this.card = new Card(this.game, this.game.width/2.0, this.game.height/2.0, 'card_front', 'card_back', false);
		this.card.setFlippable();

	}
}

export default SceneCard;

