import React from "react";
import { Button } from "react-bootstrap";

import "./StatusBar.css";

type StatusBarProps = {
	game_id: string;
	handleClickRestart: () => void;
	handleClickNewGame: () => void;
};

export default function StatusBar(props: StatusBarProps) {
	return (
		<div className="status-bar">
			<p>{props.game_id}</p>
			<Button variant="warning" style={{marginRight: "5px"}} onClick={props.handleClickRestart}>
				Restart
			</Button>
			<Button variant="dark" onClick={props.handleClickNewGame}>
				New Game
			</Button>
		</div>
	);
}
