import React from "react";
import "./Game.css";

const renderCat = (ind: number) => {
	return (
		<div className="col">
			<div className="cat">
				<p>cat {ind}</p>
			</div>
			<div className="clue">
				<p>200</p>
			</div>
			<div className="clue">
				<p>400</p>
			</div>
			<div className="clue">
				<p>600</p>
			</div>
			<div className="clue">
				<p>800</p>
			</div>
			<div className="clue">
				<p>1000</p>
			</div>
		</div>
	);
};

export default function Game() {
	return (
		<div className="flex-grid">
            {renderCat(1)}
            {renderCat(2)}
            {renderCat(3)}
            {renderCat(4)}
            {renderCat(5)}
            {renderCat(6)}
		</div>
	);
}
