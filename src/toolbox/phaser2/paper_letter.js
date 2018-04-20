class PaperLetter extends Phaser.Sprite {

    constructor(game, x, y, letter) {
        super(game, x, y, letter);
        this.game = game;
        this.anchor.setTo(75.0 / this.width, 71.0 / this.height);

        this.game.add.existing(this);
    }

    slide(nx, ny, delay = 0) {
        this.game.add.tween(this).to({ x: nx }, 1000, Phaser.Easing.Cubic.Out, true, delay);
        this.game.add.tween(this).to({ y: ny }, 1000, Phaser.Easing.Cubic.Out, true, delay);
        var tween = null;
        if (nx > this.x) {
            tween = this.game.add.tween(this).to({ angle: 30 }, 200, Phaser.Easing.Quadratic.Out, true, delay);
        } else {
            tween = this.game.add.tween(this).to({ angle: -30 }, 200, Phaser.Easing.Quadratic.Out, true, delay);
        }

        tween.onComplete.add(function () {
            this.game.add.tween(this).to({angle: 0}, 1400, Phaser.Easing.Elastic.Out, true, 300);
        }, this);
    }
}

export default PaperLetter;
