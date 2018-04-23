import Counter from '../toolbox/phaser2/counter';

class SceneCounter extends Phaser.State {

	constructor() {
		super();
	}

	create() {
		this.background = this.game.add.image(0,0,'background');
		this.background.scale.setTo(this.game.width/this.background.width, this.game.height/this.background.height);

		this.counter = new Counter(this.game, this.game.width / 2.0, this.game.height / 2.0);
		this.counter.x -= this.counter.width/2.0;
		this.counter.y -= this.counter.height/2.0;

		this.counter.inputEnabled = true;
		this.counter.events.onInputDown.add(this.spin, this);
	}

	spin() {
		var r = Math.floor(Math.random()*9999);
		this.counter.setCounter(r);
	}
}

export default SceneCounter;

