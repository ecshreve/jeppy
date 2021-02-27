import React from "react";
import "./ClueComponent.css";
import { Clue } from "../../requests";

type ClueProps = {
	value: number;
	clue: Clue;
	handleClick: (c: Clue) => void
};

export default function ClueComponent(props: ClueProps) {
	return (
		<div className="clue" onClick={() => props.handleClick(props.clue)}>
			<p>{props.value}</p>
		</div>
	);
}
