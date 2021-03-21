import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
