import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ClueState {
	clues: {
		clueID: string;
		enabled: boolean;
	}[];
}

const initialState: ClueState = {
	clues: [],
};

export const clueSlice = createSlice({
	name: "clue",
	initialState,
	reducers: {
		addClueIfNotExists: (state, action) => {
			if (!state.clues.find((c) => c.clueID === action.payload)) {
				state.clues.push({ clueID: action.payload, enabled: true });
			}
		},
		toggleEnabled: (state, action) => {
			const clue = state.clues.find((c) => c.clueID === action.payload);
			// TODO fix this it bad
			if (!clue) {
				return;
			}
			clue.enabled = !clue.enabled;
		},
	},
});

export const { addClueIfNotExists, toggleEnabled } = clueSlice.actions;

export default clueSlice.reducer;
