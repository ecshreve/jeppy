import React from "react";

import "./scoreBar.css";

import { useAppSelector } from "../../app/hooks";

export default function ScoreBar() {
	const names = useAppSelector((state) => state.config.playerNames);
	const scores = useAppSelector((state) => state.scoreBar.scores);

	let myscores = names.map((playerName, ind) => {
		const playerScore = scores.find((ps) => ps.playerID === ind + 1);
		return playerScore ? (
			<div key={playerScore.playerID} className="score-item">
				{playerName}: ${playerScore.score}
			</div>
		) : null;
	});

	return <div className="score-bar">{myscores}</div>;
}
