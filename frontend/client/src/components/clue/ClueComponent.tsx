import React from "react";
import "./ClueComponent.css";
import { Clue } from "../../requests";

const handleClick = (question: string) => {
	console.log(question);
    alert(question)
};

type ClueProps = {
	value: number;
	clue: Clue;
};

export default function ClueComponent(props: ClueProps) {
	return (
		<div className="clue" onClick={() => handleClick(props.clue.question)}>
			<p>{props.value}</p>
		</div>
	);
}
