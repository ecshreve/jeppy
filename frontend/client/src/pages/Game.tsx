import React, { useEffect, useState } from "react";
import "./Game.css";

import { Clue, getClues } from "../requests";

import ClueComponent from "../components/clue/ClueComponent"

const getCategories = (clues: Clue[] | undefined): string[] => {
	if (clues === undefined) {
		return []
	}

	// Pull out all categories.
	let categories: string[] = []
	for (let clue of clues) {
		if (clue.clue_id !== "FJ" && clue.clue_id !== "TB") {
			categories.push(clue.category)
		}
	}

	// Get unique categories.
	var unique = categories.filter((value, index, self) => self.indexOf(value) === index);
	return unique
}

const getCategoryToClueListMap = (categories: string[], clues: Clue[] | undefined): Map<string, Clue[]> | null => {
	if (clues === undefined) {
		return null
	}

	// This is a very not optimal way to do this.
	let catMap = new Map<string, Clue[]>();
	for (let cat of categories) {
		let categoryClues: Clue[] = []
		for (let clue of clues) {
			if (clue.category === cat) {
				categoryClues.push(clue)
			}
			if (categoryClues.length >= 5) {
				break
			}
		}
		catMap.set(cat, categoryClues)

	}
	return catMap;
}

const getEmptyClue = () => {
	return (
		<div className="emptyclue">
			<p>---</p>
		</div>
	);
}

const renderCat = (catName: string, clues: Clue[]) => {
	let myclues = clues.map((c, ind) => {
		return <ClueComponent value={200*(ind+1)} clue={c} handleClick={handleClickClue}/>
	})
	while (myclues.length < 5) {
		myclues.push(getEmptyClue())
	}

	return (
		<div className="col">
			<div className="cat">
				<p>{catName}</p>
			</div>
			{myclues}
		</div>
	);
};

const handleClickClue = (question: string) => {
	console.log(question);
    alert(question)
}

export default function Game() {
	const [data, setData] = useState<Clue[]>();

	useEffect(() => {
		getClues().then((result) => setData(result));
	}, []);

	const categories = getCategories(data)
	const categoryToClueListMap = getCategoryToClueListMap(categories, data)
	if (categoryToClueListMap === null) {
		return (<div></div>)
	}

	return (
		<div className="flex-grid">
            {renderCat(categories[0], categoryToClueListMap.get(categories[0])!)}
            {renderCat(categories[1], categoryToClueListMap.get(categories[1])!)}
            {renderCat(categories[2], categoryToClueListMap.get(categories[2])!)}
            {renderCat(categories[3], categoryToClueListMap.get(categories[3])!)}
            {renderCat(categories[4], categoryToClueListMap.get(categories[4])!)}
            {renderCat(categories[5], categoryToClueListMap.get(categories[5])!)}
		</div>
	);
}