import Boot from './states/boot';
import Preloader from './states/preloader';
import SceneCard from './states/scene_card';
import SceneCustomButton from './states/scene_custom_button';
import SceneGlitchSprite from './states/scene_glitch_sprite';
import ScenePaperLetter from './states/scene_paper_letter';

const game = new Phaser.Game(window.innerWidth, window.innerHeight - document.body.offsetHeight, Phaser.AUTO, 'game_canvas');

game.state.add('boot', new Boot());
game.state.add('preloader', new Preloader());
game.state.add('scene_card', new SceneCard());
game.state.add('scene_custom_button', new SceneCustomButton());
game.state.add('scene_glitch_sprite', new SceneGlitchSprite());
game.state.add('scene_paper_letter', new ScenePaperLetter());

game.state.start('boot');

// Window function
window.change_scene = function(value) {
    game.state.start(value);
}