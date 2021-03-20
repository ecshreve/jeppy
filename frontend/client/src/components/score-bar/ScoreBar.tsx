import React from "react";

import "./ScoreBar.css";

type ScoreBarProps = {
	scores: number[];
};

export default function ScoreBar(props: ScoreBarProps) {
	let myscores = props.scores.map((s, ind) => {
		return (
			<div className="score-item">
				Player{ind + 1}: ${s}
			</div>
		);
	});
	return <div className="score-bar">{myscores}</div>;
}
