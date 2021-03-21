import React from "react";

import "./ClueComponent.css";

import { Clue } from "../../requests";
import { useAppSelector } from "../../app/hooks";

type ClueProps = {
	value: number;
	clue: Clue;
	handleSelect: (c: Clue, v: number) => void;
};

export default function ClueComponent(props: ClueProps) {
	const clue = useAppSelector((state) =>
		state.clue.clues.find((c) => c.clueID === props.clue.clue_id)
	);

	const handleClick = () => {
		props.handleSelect(props.clue, props.value);
	};

	return (
		<>
			{clue?.enabled ? (
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
