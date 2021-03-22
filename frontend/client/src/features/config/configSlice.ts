import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface ConfigState {
	gameActive: boolean;
	allGameIds: string[];
}

const initialState: ConfigState = {
	gameActive: false,
	allGameIds: [],
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
	},
});

export const { setGameActive, setAllGameIds } = configSlice.actions;

export default configSlice.reducer;
