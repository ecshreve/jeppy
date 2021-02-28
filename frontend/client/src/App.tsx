import React, { useState } from "react";

import "./App.css";

import Game from "../src/pages/Game";
import Menu from "../src/components/menu/Menu";

function App() {
	const [showMenu, setShowMenu] = useState(true);
	const [selectedGame, setSelectedGame] = useState("");

	const handleSelectGame = (gameId: string) => {
		setSelectedGame(gameId);
		setShowMenu(false);
	};
	return (
		<div className="App">
			{showMenu ? (
				<Menu handleSelectGame={handleSelectGame} />
			) : (
				selectedGame != "" && <Game gameId={selectedGame} />
			)}
		</div>
	);
}

export default App;
