import React from "react";

import "./ClueComponent.css";

import { Clue } from "../../requests";

type ClueProps = {
	value: number;
	clue: Clue;
	handleSelect: (c: Clue, v: number) => void;
};

export default function ClueComponent(props: ClueProps) {
	const handleClick = () => {
		localStorage.setItem(props.clue.clue_id, "true");
		props.handleSelect(props.clue, props.value);
	};

	return (
		<>
			{localStorage.getItem(props.clue.clue_id) == null ? (
				<div className="clue" onClick={handleClick}>
					<p>${props.value}</p>
				</div>
			) : (
				<div className="clue-disabled">
					<p> </p>
				</div>
			)}
		</>
	);
}
