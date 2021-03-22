import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ConfigState {
	gameActive: boolean;
}

const initialState: ConfigState = {
	gameActive: false,
};

export const configSlice = createSlice({
	name: "config",
	initialState,
	reducers: {
		setGameActive: (state, action) => {
			state.gameActive = action.payload;
		},
	},
});

export const { setGameActive } = configSlice.actions;

export default configSlice.reducer;
