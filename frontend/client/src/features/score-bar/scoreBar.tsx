import React from "react";

import "./scoreBar.css";

import { useAppSelector } from "../../app/hooks";

type ScoreBarProps = {
	playerIDs: number[];
};

export default function ScoreBar(props: ScoreBarProps) {
	// The `state` arg is correctly typed as `RootState` already
	const scores = useAppSelector((state) => state.scoreBar.scores);

	let myscores = props.playerIDs.map((pid) => {
		const playerScore = scores.find((ps) => ps.playerID === pid);
		return playerScore ? (
			<div key={playerScore.playerID} className="score-item">
				Player{playerScore.playerID}: ${playerScore.score}
			</div>
		) : null;
	});
	return <div className="score-bar">{myscores}</div>;
}
