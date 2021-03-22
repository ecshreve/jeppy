import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DEVELOPMENT_GAME_ID } from "../../consts";

type ParsedGameId = {
	raw: string;
	year: string;
	month: string;
	showNumber: string;
};
interface ConfigState {
	gameActive: boolean;
	allGameIds: string[];
	allParsedGameIds: ParsedGameId[];
	currentGameId: string;
}

const initialState: ConfigState = {
	gameActive: false,
	allGameIds: [],
	allParsedGameIds: [],
	currentGameId: DEVELOPMENT_GAME_ID,
};

// "Show #3966 - Monday, November 26, 2001"
const parseGameId = (gameId: string): ParsedGameId => {
	const parts = gameId.split(",");

	const y = parts[2].trim();
	const m = parts[1].trim().split(" ")[0];
	const s = parts[0].trim().split("-")[0].split(" ")[1].trim();

	return { raw: gameId, year: y, month: m, showNumber: s };
};

export const configSlice = createSlice({
	name: "config",
	initialState,
	reducers: {
		setGameActive: (state, action) => {
			state.gameActive = action.payload;
		},
		setAllGameIds: (state, action: PayloadAction<string[]>) => {
			const gameIds = action.payload;
			const parsedGameIds = gameIds.map((gid) => parseGameId(gid));
			state.allGameIds = gameIds;
			state.allParsedGameIds = parsedGameIds;
		},
		setCurrentGameId: (state, action) => {
			state.currentGameId = action.payload;
		},
		setRandomGameId: (state) => {
			const random = Math.floor(Math.random() * state.allGameIds.length);
			state.currentGameId = state.allGameIds[random];
		},
	},
});

export const {
	setGameActive,
	setAllGameIds,
	setCurrentGameId,
	setRandomGameId,
} = configSlice.actions;

export default configSlice.reducer;
