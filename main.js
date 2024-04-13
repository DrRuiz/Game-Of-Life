const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.downloadAll(() => {

	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");

	gameEngine.init(ctx);

	//new
	const automata = new Automata(gameEngine);
	gameEngine.addEntity(automata);
	gameEngine.start();
});
