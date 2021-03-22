import React from "react";

import "./App.css";

import { useAppSelector } from "./app/hooks";

import Game from "./features/game/Game";
import Config from "./features/config/Config";

function App() {
	return (
		<div className="App">
			{!useAppSelector((state) => state.config.gameActive) ? (
				<Config />
			) : (
				<Game />
			)}
		</div>
	);
}

export default App;
