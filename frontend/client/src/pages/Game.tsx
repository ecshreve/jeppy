import React, { useEffect, useState } from "react";

import ClueComponent from "../features/clue/ClueComponent";
import QuestionModal from "../features/question-modal/QuestionModal";
import StatusBar from "../features/status-bar/StatusBar";

import ScoreBar from "../features/score-bar/scoreBar";

import "./Game.css";

import { Clue, getClues, getGameIds } from "../requests";
import { DEVELOPMENT_GAME_ID } from "../consts";
import { ENV_BUILD_TIME } from "../App";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
	addClueIfNotExists,
	resetClues,
	toggleEnabled,
} from "../features/clue/clueSlice";
import { nextRound, Round } from "../features/game/gameSlice";
import { resetScores } from "../features/score-bar/scoreBarSlice";

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

const getInitialGameId = (): string => {
	const cachedGameId = localStorage.getItem("game_id");
	return cachedGameId != null ? cachedGameId : DEVELOPMENT_GAME_ID;
};

export default function Game() {
	const [data, setData] = useState<Clue[]>();
	const [round, setRound] = useState(Round.SINGLE);
	const [showQuestionModal, setShowQuestionModal] = useState(false);
	const [selectedClue, setSelectedClue] = useState<Clue>();
	const [selectedClueValue, setSelectedClueValue] = useState(0);
	const [allGameIds, setAllGameIds] = useState<string[]>([]);
	const [currentGameId, setCurrentGameId] = useState(getInitialGameId());

	const dispatch = useAppDispatch();

	// Only fetch the full list of game ids once when the component mounts.
	useEffect(() => {
		if (allGameIds.length <= 0) {
			getGameIds().then((result) => setAllGameIds(result));
		}
	}, []);

	// Fetch new clues whenever the current game id changes.
	useEffect(() => {
		getClues(currentGameId).then((result) => setData(result));
		setRound(0);
		localStorage.setItem("game_id", currentGameId);
	}, [currentGameId]);

	const categories = getCategories(data);
	const categoryToClueListMap = getCategoryToClueListMap(categories, data!);

	const handleClickClue = (c: Clue, v: number) => {
		setSelectedClue(c);
		setSelectedClueValue(v);
		setShowQuestionModal(true);
		dispatch(toggleEnabled(c.clue_id));
	};

	const handleClickRestart = () => {
		// Clear local storage but persist the current game_id and envBuildTime.
		localStorage.clear();
		localStorage.setItem("game_id", currentGameId);
		localStorage.setItem("build_time", ENV_BUILD_TIME);

		// Reload the page to trigger the Clues to re-render.
		window.location.reload();
	};

	const handleClickNewGame = () => {
		// Clear local storage but persist the envBuildTime.
		localStorage.clear();
		localStorage.setItem("build_time", ENV_BUILD_TIME);

		const random = Math.floor(Math.random() * allGameIds.length);
		setCurrentGameId(allGameIds[random]);
		dispatch(resetClues());
		dispatch(resetScores());
	};

	const clues = useAppSelector((state) => state.clue.clues);
	const numEnabled = clues.filter((c) => c.enabled === true).length;
	const handleHideModal = () => {
		setShowQuestionModal(false);
		if (clues.length > 0 && numEnabled === 0) {
			setRound(round + 1);
			dispatch(resetClues());
		}
	};

	const renderCat = (catName: string, rawClues: Clue[]) => {
		const multiplier = round === Round.DOUBLE ? 400 : 200;
		let myclues = rawClues.map((c, ind) => {
			dispatch(addClueIfNotExists(c.clue_id));
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
			<div className="catcol">
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
