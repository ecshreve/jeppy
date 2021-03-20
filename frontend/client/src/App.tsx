import React, { useState } from "react";

import "./App.css";

import Landing from "../src/pages/Landing";
import Game from "./pages/Game";

export const ENV_BUILD_TIME = process.env.REACT_APP_BUILD_TIME
	? process.env.REACT_APP_BUILD_TIME
	: "no-env-build-time";

function App() {
	const [numPlayers, setNumPlayers] = useState(-1);
	// If the cachedBuildTime doesn't match the envBuildTime that indicates we
	// are dealing with a fresh build of the App and should clear all local
	// storage before proceeding. If they do match that indicates either a page
	// reload, or the page has been closed and reopened.
	const cachedBuildTime = localStorage.getItem("build_time");
	if (ENV_BUILD_TIME !== cachedBuildTime) {
		console.log("clearing");
		localStorage.clear();
		localStorage.setItem("build_time", ENV_BUILD_TIME);
	}

	const handleStartGame = (numPlayers: Number) => {
		console.log(numPlayers);
		setNumPlayers(numPlayers.valueOf())
	};

	return (
		<div className="App">
			{numPlayers <= 0 ? (
				<Landing handleClickStartGame={handleStartGame} />
			) : (
				<Game />
			)}
		</div>
	);
}

export default App;
