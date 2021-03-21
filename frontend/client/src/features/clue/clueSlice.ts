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
		replaceClues: (state, action: PayloadAction<string[]>) => {
			console.log("AHHH");
			const newClues = action.payload.map((s) => {
				return { clueID: s, enabled: true };
			});
			state.clues = newClues;
		},
		reenableAllClues: (state) => {
			state.clues.map((c) => (c.enabled = true));
		},
		clearClues: (state) => {
			state.clues = [];
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

export const {
	addClueIfNotExists,
	reenableAllClues,
	replaceClues,
	clearClues,
	toggleEnabled,
} = clueSlice.actions;

export default clueSlice.reducer;
