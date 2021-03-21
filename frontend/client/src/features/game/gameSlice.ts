import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { DEVELOPMENT_GAME_ID } from "../../consts";

export enum Round {
	SINGLE,
	DOUBLE,
	FINAL,
	GAME_OVER,
}
interface GameState {
	currentGameId: string;
	currentRound: Round;
}

const initialState: GameState = {
	currentGameId: DEVELOPMENT_GAME_ID,
	currentRound: Round.SINGLE,
};

export const gameSlice = createSlice({
	name: "game",
	initialState,
	reducers: {
		setCurrentGameId: (state, action) => {
			state.currentGameId = action.payload;
		},
		nextRound: (state) => {
			state.currentRound += 1;
		},
	},
});

export const { nextRound, setCurrentGameId } = gameSlice.actions;

export default gameSlice.reducer;
