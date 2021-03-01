import React, { useEffect, useState } from "react";

import ClueComponent from "../components/clue/ClueComponent";
import QuestionModal from "../components/question-modal/QuestionModal";
import StatusBar from "../components/status-bar/StatusBar";

import "./Game.css";

import { Clue, getClues, getGameIds } from "../requests";
import { DEVELOPMENT_GAME_ID } from "../consts";

const getCategories = (clues: Clue[] | undefined): string[] => {
	if (clues === undefined) {
		return [];
	}

	// Pull out all categories.
	let categories: string[] = [];
	for (let clue of clues) {
		if (clue.clue_id !== "FJ" && clue.clue_id !== "TB") {
			categories.push(clue.category);
		}
	}

	// Get unique categories.
	var unique = categories.filter(
		(value, index, self) => self.indexOf(value) === index
	);
	return unique;
};

const getCategoryToClueListMap = (
	categories: string[],
	clues: Clue[] | undefined
): Map<string, Clue[]> | null => {
	if (clues === undefined) {
		return null;
	}

	// This is a very not optimal way to do this.
	let catMap = new Map<string, Clue[]>();
	for (let cat of categories) {
		let categoryClues: Clue[] = [];
		for (let clue of clues) {
			if (clue.category === cat) {
				categoryClues.push(clue);
			}
			if (categoryClues.length >= 5) {
				break;
			}
		}
		catMap.set(cat, categoryClues);
	}
	return catMap;
};

const getEmptyClue = (ind: number) => {
	return (
		<div key={ind + 1} className="emptyclue">
			<p> </p>
		</div>
	);
};

export default function Game() {
	const [data, setData] = useState<Clue[]>();
	const [showQuestionModal, setShowQuestionModal] = useState(false);
	const [selectedClue, setSelectedClue] = useState<Clue>();
	const [allGameIds, setAllGameIds] = useState<string[]>([]);
	const [currentGameId, setCurrentGameId] = useState(DEVELOPMENT_GAME_ID);

	useEffect(() => {
		getClues(currentGameId).then((result) => setData(result));
		if (allGameIds.length <= 0) {
			getGameIds().then((result) => setAllGameIds(result));
		}
	}, [currentGameId]);

	const categories = getCategories(data);
	const categoryToClueListMap = getCategoryToClueListMap(categories, data);
	if (categoryToClueListMap === null) {
		return <div></div>;
	}

	const handleClickClue = (c: Clue) => {
		setSelectedClue(c);
		setShowQuestionModal(true);
	};

	const handleHideQuestionModal = () => {
		setShowQuestionModal(false);
	};

	const handleClickNewGame = () => {
		const random = Math.floor(Math.random() * allGameIds.length);
		setCurrentGameId(allGameIds[random]);
	};

	const renderCat = (catName: string, clues: Clue[]) => {
		let myclues = clues.map((c, ind) => {
			return (
				<ClueComponent
					key={currentGameId + ind}
					value={200 * (ind + 1)}
					clue={c}
					handleSelect={handleClickClue}
				/>
			);
		});
		while (myclues.length < 5) {
			myclues.push(getEmptyClue(myclues.length));
		}

		return (
			<div className="catcol">
				<div className="cat">
					<p>{catName}</p>
				</div>
				{myclues}
			</div>
		);
	};

	return (
		<>
			<div className="game-container">
				<StatusBar
					game_id={currentGameId}
					handleClickNewGame={handleClickNewGame}
				/>
				<div className="flex-grid">
					{renderCat(categories[0], categoryToClueListMap.get(categories[0])!)}
					{renderCat(categories[1], categoryToClueListMap.get(categories[1])!)}
					{renderCat(categories[2], categoryToClueListMap.get(categories[2])!)}
					{renderCat(categories[3], categoryToClueListMap.get(categories[3])!)}
					{renderCat(categories[4], categoryToClueListMap.get(categories[4])!)}
					{renderCat(categories[5], categoryToClueListMap.get(categories[5])!)}
				</div>
			</div>
			{showQuestionModal && (
				<QuestionModal
					show={showQuestionModal}
					handleHide={handleHideQuestionModal}
					clue={selectedClue}
				/>
			)}
		</>
	);
}
