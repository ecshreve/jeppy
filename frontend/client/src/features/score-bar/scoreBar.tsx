import React from "react";

import "./scoreBar.css";

import { useAppSelector } from "../../app/hooks";

export default function ScoreBar() {
	const players = useAppSelector((state) => state.player.players);

	let scores = players.map((player) => {
		return (
			<div key={player.name} className="score-item">
				{player.name} ${player.score}
			</div>
		);
	});

	return <div className="score-bar">{scores}</div>;
}
