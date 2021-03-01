import React, { useState } from "react";
import "./ClueComponent.css";
import { Clue } from "../../requests";

type ClueProps = {
	value: number;
	clue: Clue;
	handleSelect: (c: Clue) => void;
};

export default function ClueComponent(props: ClueProps) {
	const [selectable, setSelectable] = useState(
		localStorage.getItem(props.clue.clue_id) == null
	);

	const handleClick = () => {
		setSelectable(false);
		localStorage.setItem(props.clue.clue_id, "true");
		props.handleSelect(props.clue);
	};

	return (
		<>
			{selectable ? (
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
