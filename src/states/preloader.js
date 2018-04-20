class Preloader extends Phaser.State {

	constructor() {
		super();
		this.ready = false;
	}

	create() {
	}

	preload() {
		//Setup loading and its events
		this.load.onLoadComplete.addOnce(this.onLoadComplete, this);

		// Load assets from json
		let assets_json = this.game.cache.getJSON('assets');
		this.loadResources(assets_json);
	}

	update() {
		if (this.ready) {
			document.getElementById("html-select").disabled = false;
			this.game.state.start('scene_card');
		}
	}

	loadResources(f) {
		// console.log(f);
		for (let i = 0; i < f.children.length; i += 1) {
			let child = f.children[i];
			// console.log(child);
			if (child.type == 'folder') {
				this.loadResources(child)
			} else {
				let name = child.name.slice(0, -4);
				let suffix = child.name.slice(-3);
				if (suffix == 'png') {
					if (name.search("spritesheet") === 0) {
						let sub1 = 11;
						let sub2 = name.search("x");
						let sub3 = name.search("_");

						let width = parseInt(name.substring(sub1, sub2));
						let height = parseInt(name.substring(sub2 + 1, sub3));
						let key = name.substring(sub3 + 1);
						this.game.load.spritesheet(key, child.path, width, height);
					}
					else {
						this.game.load.image(name, child.path);
					}
				}
			}
		}
	}

	loadFolder() {

	}

	onLoadComplete() {
		this.ready = true;
	}
}

export default Preloader;
