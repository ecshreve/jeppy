import React from "react";

import "./ScoreBar.css";

type ScoreBarProps = {
	scores: number[];
};

export default function ScoreBar(props: ScoreBarProps) {
	return (
		<div className="score-bar">
			<div className="score-item">Player1: ${props.scores[0]}</div>
            <div className="score-item">Player2: ${props.scores[1]}</div>
			<div className="score-item">Player3: ${props.scores[2]}</div>
		</div>
	);
}
