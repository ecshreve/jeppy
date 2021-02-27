import React from "react";
import "./Game.css";

import { getClues } from "../requests";

import ClueComponent from "../components/clue/ClueComponent"

const renderCat = (ind: number) => {
	return (
		<div className="col">
			<div className="cat">
				<p>cat {ind}</p>
			</div>
			<ClueComponent value={200}/>
			<ClueComponent value={400}/>
			<ClueComponent value={600}/>
			<ClueComponent value={800}/>
			<ClueComponent value={1000}/>
		</div>
	);
};

export default function Game() {
	getClues().then(data => { console.log(data)})
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
