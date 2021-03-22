import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ConfigState {
	gameActive: boolean;
	playerNames: string[];
}

const initialState: ConfigState = {
	gameActive: false,
	playerNames: [],
};

export const configSlice = createSlice({
	name: "config",
	initialState,
	reducers: {
		setGameActive: (state, action) => {
			state.gameActive = action.payload;
		},
		replacePlayerNames: (state, action: PayloadAction<string[]>) => {
			state.playerNames = action.payload.filter(
				(playerName) => playerName.length > 0
			);
		},
	},
});

export const { setGameActive, replacePlayerNames } = configSlice.actions;

export default configSlice.reducer;
