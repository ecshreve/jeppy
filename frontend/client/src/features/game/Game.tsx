import React, { useEffect, useState } from "react";

import ClueComponent from "../clue/ClueComponent";
import QuestionModal from "../question-modal/QuestionModal";
import StatusBar from "../status-bar/StatusBar";

import ScoreBar from "../score-bar/scoreBar";

import "./Game.css";

import { Clue, getClues, getGameIds } from "../../requests";
import { DEVELOPMENT_GAME_ID } from "../../consts";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
	reenableAllClues,
	replaceClues,
	clearClues,
	toggleEnabled,
} from "../clue/clueSlice";
import { resetScores } from "../score-bar/scoreBarSlice";

enum Round {
	SINGLE,
	DOUBLE,
	FINAL,
	GAME_OVER,
}

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
	clues: Clue[]
): Map<string, Clue[]> => {
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
	const [round, setRound] = useState(Round.SINGLE);
	const [showQuestionModal, setShowQuestionModal] = useState(false);
	const [selectedClue, setSelectedClue] = useState<Clue>();
	const [selectedClueValue, setSelectedClueValue] = useState(0);
	const [allGameIds, setAllGameIds] = useState<string[]>([]);
	const [currentGameId, setCurrentGameId] = useState(DEVELOPMENT_GAME_ID);

	const dispatch = useAppDispatch();

	// Only fetch the full list of game ids once when the component mounts.
	useEffect(() => {
		getGameIds().then((result) => setAllGameIds(result));
	}, []);

	// Fetch new clues whenever the current game id changes, and switch back to
	// the SINGLE jeopardy round.
	useEffect(() => {
		getClues(currentGameId).then((result) => setData(result));
		setRound(0);
	}, [currentGameId]);

	// Reset the clues array when the current game id or round changes.
	useEffect(() => {
		if (data === undefined || dispatch === undefined) {
			return;
		}

		// Double jeopardy clue_ids start with "DJ_..." and single start with "J_..".
		const filterChar = round === 0 ? "J" : "D";
		const clueIds = data
			?.filter((c) => c.clue_id[0] === filterChar)
			?.map((cc) => {
				return cc.clue_id;
			});
		if (clueIds) {
			dispatch(replaceClues(clueIds));
		}
	}, [data, dispatch, round, currentGameId]);

	const categories = getCategories(data);
	const categoryToClueListMap = getCategoryToClueListMap(categories, data!);

	const handleClickClue = (c: Clue, v: number) => {
		setSelectedClue(c);
		setSelectedClueValue(v);
		setShowQuestionModal(true);
		dispatch(toggleEnabled(c.clue_id));
	};

	const handleClickRestart = () => {
		dispatch(reenableAllClues());
		dispatch(resetScores());
		setRound(0);
	};

	const handleClickNewGame = () => {
		const random = Math.floor(Math.random() * allGameIds.length);
		setCurrentGameId(allGameIds[random]);
		dispatch(clearClues());
		dispatch(resetScores());
	};

	const clues = useAppSelector((state) => state.clue.clues);
	const numEnabled = clues.filter((c) => c.enabled === true).length;
	const handleHideModal = () => {
		setShowQuestionModal(false);
		if (clues.length > 0 && numEnabled === 0) {
			setRound(round + 1);
			dispatch(clearClues());
		}
	};

	const renderCat = (catName: string, rawClues: Clue[]) => {
		const multiplier = round === Round.DOUBLE ? 400 : 200;
		let myclues = rawClues.map((c, ind) => {
			return (
				<ClueComponent
					key={currentGameId + c.clue_id}
					value={multiplier * (ind + 1)}
					clue={c}
					handleSelect={handleClickClue}
				/>
			);
		});

		while (myclues.length < 5) {
			myclues.push(getEmptyClue(myclues.length));
		}

		return (
			<div key={catName} className="catcol">
				<div className="cat">
					<p>{catName}</p>
				</div>
				{myclues}
			</div>
		);
	};

	const renderBoardV2 = () => {
		if (round > 1) {
			return (
				<div className="final-jep">
					<div className="final-text">Thanks for Playing!</div>
				</div>
			);
		}

		const [start, end] = round === Round.SINGLE ? [0, 6] : [6, 12];
		const catSlice = categories.slice(start, end);
		let boardCategories = catSlice.map((cat, i) => {
			return renderCat(cat, categoryToClueListMap.get(cat)!);
		});
		return <div className="flex-grid">{boardCategories}</div>;
	};

	return (
		<>
			<div className="game-container">
				<StatusBar
					game_id={currentGameId}
					handleClickRestart={handleClickRestart}
					handleClickNewGame={handleClickNewGame}
				/>
				<ScoreBar playerIDs={[1, 2, 3]} />
				{renderBoardV2()}
			</div>
			{showQuestionModal && (
				<QuestionModal
					show={showQuestionModal}
					handleHide={handleHideModal}
					clue={selectedClue}
					value={selectedClueValue}
					playerIDs={[1, 2, 3]}
				/>
			)}
		</>
	);
}
