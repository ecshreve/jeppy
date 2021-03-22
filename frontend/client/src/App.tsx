import React from "react";

import "./App.css";

import { useAppSelector } from "./app/hooks";

import Game from "./features/game/Game";
import Config from "./features/config/Config";

function App() {
	const config = useAppSelector((state) => state.config);
	return (
		<div className="App">
			{!config.gameActive ? <Config /> : <Game gameId={config.currentGameId} />}
		</div>
	);
}

export default App;
