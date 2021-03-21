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
			<Button style={{marginRight: "5px", background: "#031297", paddingBottom: ".2rem"}} onClick={props.handleClickRestart}>
				Restart
			</Button>
			<Button style={{background: "#031297", paddingBottom: ".2rem"}} onClick={props.handleClickNewGame}>
				New Game
			</Button>
		</div>
	);
}
