// A Counter of some sorts, to be presented like a cassino roulette.

class Counter extends Phaser.Sprite {
    constructor(game, x, y) {
        super(game, x, y, 'mcdu');
        this.game = game;

        var square1coords = [
            new Phaser.Point(22, 81),
            new Phaser.Point(78, 79),
            new Phaser.Point(81, 158),
            new Phaser.Point(25, 159)];
        var square2coords = [
            new Phaser.Point(84, 78),
            new Phaser.Point(139, 78),
            new Phaser.Point(141, 159),
            new Phaser.Point(87, 160)];
        var square3coords = [
            new Phaser.Point(144, 76),
            new Phaser.Point(200, 75),
            new Phaser.Point(202, 158),
            new Phaser.Point(145, 159)];
        var square4coords = [
            new Phaser.Point(205, 76),
            new Phaser.Point(261, 74),
            new Phaser.Point(259, 159),
            new Phaser.Point(207, 159)];

        this.overSprite = this.game.add.sprite(0, 0, 'mcdu');

        var overMask = this.game.add.graphics(0, 0);
        overMask.beginFill(0xffffff);
        overMask.drawPolygon(square1coords);
        overMask.drawPolygon(square2coords);
        overMask.drawPolygon(square3coords);
        overMask.drawPolygon(square4coords);
        overMask.endFill();

        this.addChild(overMask);
        this.overSprite.mask = overMask;
        this.addChild(this.overSprite);

        this.slots = [];
        this.slots_pos = [0, 0, 0, 0];
        this.slots.push(this.game.add.sprite(52, 116));
        this.slots.push(this.game.add.sprite(114, 116));
        this.slots.push(this.game.add.sprite(174, 116));
        this.slots.push(this.game.add.sprite(232, 116));

        for (var i = 0; i < this.slots.length; i++) {
            this.overSprite.addChild(this.slots[i]);
        }

        this.slot_offset = 60;

        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 10; j++) {
                var txt = this.game.add.text(0, -j * this.slot_offset, j, { font: '50px SquareCustom' });
                txt.anchor.set(0.5);
                this.slots[i].addChild(txt);
            }
            for (var j = 10; j < 28; j++) {
                var txt = this.game.add.text(0, -j * this.slot_offset, j, { font: '50px SquareCustom', fill: '#ff2222' });
                txt.anchor.set(0.5);
                txt.scale.setTo(0.7, 1.0);
                this.slots[i].addChild(txt);
            }
        }

        this.game.add.existing(this);
    }

    addToDigit(d, n = 1) {
        this.slots_pos[d] += n;
        this.game.add.tween(this.slots[d]).to({ y: 116 + this.slots_pos[d] * this.slot_offset }, 2000, Phaser.Easing.Elastic.Out, true);
    }

    subToDigit(d, n = 1) {
        this.slots_pos[d] -= n;
        this.game.add.tween(this.slots[d]).to({ y: 116 + this.slots_pos[d] * this.slot_offset }, 2000, Phaser.Easing.Elastic.Out, true);
    }

    isCorrect() {
        if (this.slots_pos[0] > 9 ||
            this.slots_pos[1] > 9 ||
            this.slots_pos[2] > 9 ||
            this.slots_pos[3] > 9) {
            return false;
        }
        return true;
    }

    getNumber() {
        var ret = 0;
        ret += this.slots_pos[3];
        ret += this.slots_pos[2] * 10;
        ret += this.slots_pos[1] * 100;
        ret += this.slots_pos[0] * 1000;
        return ret;
    }

    setCounter(n) {
        var newSlotsPos = [0, 0, 0, 0];
        newSlotsPos[3] = n % 10;
        newSlotsPos[2] = Math.floor(n / 10) % 10;
        newSlotsPos[1] = Math.floor(n / 100) % 10;
        newSlotsPos[0] = Math.floor(n / 1000);
        for (var i = 0; i < 4; i++) {
            this.game.add.tween(this.slots[i]).to({ y: 116 + newSlotsPos[i] * this.slot_offset }, 2000, Phaser.Easing.Elastic.Out, true);
        }
        this.slots_pos = newSlotsPos;
    }
}

export default Counter;
