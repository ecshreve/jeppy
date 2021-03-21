import React, { useState } from "react";
import { Button } from "react-bootstrap";

import "./scoreBar.css";

import { useAppSelector, useAppDispatch } from "../../app/hooks";

import {
	incrementPlayerScoreByAmount,
	decrementPlayerScoreByAmount,
} from "./scoreBarSlice";

type ScoreBarProps = {
	playerIDs: number[];
};

export default function ScoreBar(props: ScoreBarProps) {
	// The `state` arg is correctly typed as `RootState` already
	const scores = useAppSelector((state) => state.scoreBar.scores);
	const dispatch = useAppDispatch();

	let myscores = props.playerIDs.map((pid, ind) => {
		const playerScore = scores.find((ps) => ps.playerID === pid);
		return (
			<>
				{playerScore && (
					<div className="score-item">
						Player{playerScore.playerID}: ${playerScore.score}
					</div>
				)}
			</>
		);
	});
	return <div className="score-bar">{myscores}</div>;
}
