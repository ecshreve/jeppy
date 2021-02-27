import React from "react";
import "./ClueComponent.css";
import { Clue } from "../../requests";

type ClueProps = {
	value: number;
	clue: Clue;
	handleClick: (question: string) => void
};

export default function ClueComponent(props: ClueProps) {
	return (
		<div className="clue" onClick={() => props.handleClick(props.clue.question)}>
			<p>{props.value}</p>
		</div>
	);
}
