// This store isn't currently used but I'm keeping it here in case it's needed
// in the future.

import { createSlice } from "@reduxjs/toolkit";

import { DEVELOPMENT_GAME_ID } from "../../consts";

interface GameState {
	currentGameId: string;
}

const initialState: GameState = {
	currentGameId: DEVELOPMENT_GAME_ID,
};

export const gameSlice = createSlice({
	name: "game",
	initialState,
	reducers: {
		setCurrentGameId: (state, action) => {
			state.currentGameId = action.payload;
		},
	},
});

export const { setCurrentGameId } = gameSlice.actions;

export default gameSlice.reducer;
