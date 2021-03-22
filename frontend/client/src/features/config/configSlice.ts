import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DEVELOPMENT_GAME_ID } from "../../consts";
interface ConfigState {
	gameActive: boolean;
	allGameIds: string[];
	currentGameId: string;
}

const initialState: ConfigState = {
	gameActive: false,
	allGameIds: [],
	currentGameId: DEVELOPMENT_GAME_ID,
};

export const configSlice = createSlice({
	name: "config",
	initialState,
	reducers: {
		setGameActive: (state, action) => {
			state.gameActive = action.payload;
		},
		setAllGameIds: (state, action: PayloadAction<string[]>) => {
			state.allGameIds = action.payload;
		},
		setCurrentGameId: (state, action) => {
			state.currentGameId = action.payload;
		},
	},
});

export const {
	setGameActive,
	setAllGameIds,
	setCurrentGameId,
} = configSlice.actions;

export default configSlice.reducer;
