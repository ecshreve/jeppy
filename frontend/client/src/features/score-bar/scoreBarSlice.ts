import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PlayerScore {
	playerID: number;
	score: number;
}
interface ScoreBarState {
	scores: PlayerScore[];
}

const initialState: ScoreBarState = {
	scores: [
		{ playerID: 1, score: 0 },
		{ playerID: 2, score: 0 },
		{ playerID: 3, score: 0 },
	],
};

export const scoreBarSlice = createSlice({
	name: "scoreBar",
	initialState,
	reducers: {
		resetScores: (state) => {
			state.scores.forEach((ps) => {
				ps.score = 0;
			});
		},
		incrementPlayerScoreByAmount: (
			state,
			action: PayloadAction<{ playerID: number; amount: number }>
		) => {
			const playerScore = state.scores.find(
				(ps) => ps.playerID === action.payload.playerID
			);

			if (playerScore !== undefined) {
				playerScore.score += action.payload.amount;
			}
		},
		decrementPlayerScoreByAmount: (
			state,
			action: PayloadAction<{ playerID: number; amount: number }>
		) => {
			const playerScore = state.scores.find(
				(ps) => ps.playerID === action.payload.playerID
			);

			if (playerScore !== undefined) {
				playerScore.score -= action.payload.amount;
			}
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	resetScores,
	incrementPlayerScoreByAmount,
	decrementPlayerScoreByAmount,
} = scoreBarSlice.actions;

export default scoreBarSlice.reducer;
