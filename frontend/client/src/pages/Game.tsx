import React, { useEffect, useState } from "react";

import ClueComponent from "../components/clue/ClueComponent";
import QuestionModal from "../components/question-modal/QuestionModal";
import StatusBar from "../components/status-bar/StatusBar";
import ScoreBar from "../components/score-bar/ScoreBar";

import "./Game.css";

import { Clue, getClues, getGameIds } from "../requests";
import { DEVELOPMENT_GAME_ID } from "../consts";
import { ENV_BUILD_TIME } from "../App";

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
): Map<string, Clue[]> => {
	if (clues === undefined) {
		return new Map<string, Clue[]>();
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

const getNumSingleJepClues = (clues: Clue[] | undefined): number => {
	if (clues === undefined) {
		return 0;
	}

	const singleJep = clues.filter((clue) => {
		return clue.clue_id[0] === "J";
	});

	return singleJep.length;
};

type GameProps = {
	numPlayers: number;
};

type GameState = {
	data: Clue[] | undefined;
	categories: string[];
	currentGameId: string;
	selectedClue: Clue | undefined;
	selectedClueValue: number;
	showQuestionModal: boolean;
	numSingleJClues: number;
	playerScores: number[];
};

const getInitialGameState = (numPlayers: number): GameState => {
	return {
		data: undefined,
		categories: [],
		currentGameId: DEVELOPMENT_GAME_ID,
		selectedClue: undefined,
		selectedClueValue: 0,
		showQuestionModal: false,
		numSingleJClues: 0,
		playerScores: new Array<number>(numPlayers).fill(0),
	};
};

export default function Game(props: GameProps) {
	const [gameState, setGameState] = useState<GameState>(
		getInitialGameState(props.numPlayers)
	);

	// When the component first loads, and when the gameId changes we want to
	// fetch the new list of Clues.
	useEffect(() => {
		getClues(gameState.currentGameId).then((result) => {
			setGameState({
				...gameState,
				data: result,
				numSingleJClues: getNumSingleJepClues(result),
			});
		});
	}, [gameState.data?.length, gameState.currentGameId]);

	const categories = getCategories(gameState.data);
	const categoryToClueListMap = getCategoryToClueListMap(
		categories,
		gameState.data
	);

	// We only need to fetch the list of all game IDs once, hence the empty
	// dependency array in this useEffect hook.
	const [allGameIds, setAllGameIds] = useState<string[]>([]);
	useEffect(() => {
		if (allGameIds.length <= 0) {
			getGameIds().then((result) => setAllGameIds(result));
		}
	}, []);

	if (categoryToClueListMap === null) {
		return <div></div>;
	}

	const handleClickClue = (c: Clue, v: number) => {
		setGameState({
			...gameState,
			selectedClue: c,
			selectedClueValue: v,
			showQuestionModal: true,
		});
	};

	const handleSelectPlayer = (i: number, v: number) => {
		gameState.playerScores[i] = gameState.playerScores[i] + v;
		setGameState({
			...gameState,
			showQuestionModal: false,
			playerScores: gameState.playerScores,
		});
	};

	const handleHideQuestionModal = () => {
		setGameState({
			...gameState,
			showQuestionModal: false,
			numSingleJClues: gameState.numSingleJClues - 1,
		});
	};

	const handleClickRestart = () => {
		const currentGameId = gameState.currentGameId;
		setGameState({
			...getInitialGameState(props.numPlayers),
			currentGameId: currentGameId,
		});
	};

	const handleClickNewGame = () => {
		const randomInd = Math.floor(Math.random() * allGameIds.length);
		setGameState({
			...getInitialGameState(props.numPlayers),
			currentGameId: allGameIds[randomInd],
		});
	};

	const renderCat = (catName: string, clues: Clue[], doubleJ: boolean) => {
		let multiplier = doubleJ ? 400 : 200;
		let myclues = clues.map((c, ind) => {
			return (
				<ClueComponent
					key={gameState.currentGameId + ind}
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

	const renderBoard = (catSlice: string[], doubleJ: boolean) => {
		let boardCategories = catSlice.map((cat, i) => {
			return renderCat(cat, categoryToClueListMap.get(cat)!, doubleJ);
		});
		return boardCategories;
	};

	console.log("render");
	console.log(gameState.numSingleJClues);
	return (
		<>
			<div className="game-container">
				<StatusBar
					game_id={gameState.currentGameId}
					handleClickRestart={handleClickRestart}
					handleClickNewGame={handleClickNewGame}
				/>
				<ScoreBar scores={gameState.playerScores} />
				{gameState.numSingleJClues > 0 ? (
					<div className="flex-grid">
						{renderBoard(categories.slice(0, 6), false)}
					</div>
				) : (
					<div className="flex-grid">
						{renderBoard(categories.slice(6, 12), true)}
					</div>
				)}
			</div>
			{gameState.showQuestionModal && (
				<QuestionModal
					show={gameState.showQuestionModal}
					handleHide={handleHideQuestionModal}
					clue={gameState.selectedClue}
					value={gameState.selectedClueValue}
					numPlayers={props.numPlayers}
					handleSelectPlayer={handleSelectPlayer}
				/>
			)}
		</>
	);
}
