import React from "react";

import "./App.css";

import Game from "../src/pages/Game";

export const ENV_BUILD_TIME = process.env.REACT_APP_BUILD_TIME
	? process.env.REACT_APP_BUILD_TIME
	: "no-env-build-time";

function App() {
	return (
		<div className="App">
			<Game />
		</div>
	);
}

export default App;
