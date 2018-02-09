class Boot extends Phaser.State {

	constructor() {
		super();
	}

	preload() {
		this.load.image('preloader', 'assets/preloader.gif');

		// JSON
		this.game.load.json('assets', './assets.json');

		// Plugins
		this.game.add.plugin(PhaserInput.Plugin);
	}

	create() {
		this.game.input.maxPointers = 1;

		this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
		this.game.scale.pageAlignHorizontally = true;
		this.game.scale.pageAlignVertically = true;

		this.initGlobalVariables();

		// Setup resolution
		let settings = {
			defaultWidth: 1280,
			defaultHeight: 800,
			useStretchThreshold: true,
			stretchThresholdWidth: 1420,
			stretchThresholdHeight: 960
		};

		this.setupResolutionSettings(settings);

		this.game.state.start('preloader');
	}

	setupResolutionSettings(settings) {
		// Setup game screen resolution
		let defaultWidth = settings.defaultWidth;
		let defaultHeight = settings.defaultHeight;

		let windowWidth = window.innerWidth;
		let windowHeight = window.innerHeight;

		let defaultRatio = defaultWidth / defaultHeight;
		let windowRatio = windowWidth / windowHeight;

		let gameWidth = defaultWidth;
		let gameHeight = defaultHeight;

		if (windowRatio < defaultRatio) {
			gameHeight = Math.ceil((gameWidth / windowRatio) / 2.0) * 2;
			if (settings.useStretchThreshold)
				gameHeight = Math.min(gameHeight, settings.stretchThresholdHeight);
		} else {
			gameWidth = Math.ceil((gameHeight * windowRatio) / 2.0) * 2;
			if (settings.useStretchThreshold)
				gameWidth = Math.min(gameWidth, settings.stretchThresholdWidth);
		}

		let scaleX = windowWidth / gameWidth;
		let scaleY = windowHeight / gameHeight;

		this.game.scale.setGameSize(gameWidth, gameHeight);
		this.game.scale.setUserScale(scaleX, scaleY);

		this.game.screenSettings.defaultWidth = defaultWidth;
		this.game.screenSettings.defaultHeight = defaultHeight;
		this.game.screenSettings.gameWidth = gameWidth;
		this.game.screenSettings.gameHeight = gameHeight;
		this.game.screenSettings.scaleX = scaleX;
		this.game.screenSettings.scaleY = scaleY;
		this.game.screenSettings.offsetX = (gameWidth - defaultWidth) / 2.0;
		this.game.screenSettings.offsetY = (gameHeight - defaultHeight) / 2.0;
	}

	initGlobalVariables() {
		this.game.screenSettings = {
			defaultWidth: 0,
			defaultHeight: 0,
			gameWidth: 0,
			gameHeight: 0,
			scaleX: 0,
			scaleY: 0,
			offsetX: 0,
			offsetY: 0,
		};

		this.game.global = {

		};
	}
}

export default Boot;

