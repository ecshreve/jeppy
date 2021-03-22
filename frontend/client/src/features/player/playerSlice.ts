import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Player {
	name: string;
	score: number;
}
interface PlayerState {
	players: Player[];
}

const initialState: PlayerState = {
	players: [],
};

export const playerSlice = createSlice({
	name: "player",
	initialState,
	reducers: {
		replacePlayers: (state, action: PayloadAction<string[]>) => {
			state.players = action.payload
				.filter((playerName) => {
					return playerName.length > 0;
				})
				.map((playerName) => {
					return { name: playerName, score: 0 };
				});
		},
		resetScores: (state) => {
			state.players.forEach((player) => {
				player.score = 0;
			});
		},
		incrementPlayerScoreByAmount: (
			state,
			action: PayloadAction<{ playerName: string; amount: number }>
		) => {
			const player = state.players.find(
				(p) => p.name === action.payload.playerName
			);

			if (player !== undefined) {
				player.score += action.payload.amount;
			}
		},
		decrementPlayerScoreByAmount: (
			state,
			action: PayloadAction<{ playerName: string; amount: number }>
		) => {
			const player = state.players.find(
				(p) => p.name === action.payload.playerName
			);

			if (player !== undefined) {
				player.score -= action.payload.amount;
			}
		},
	},
});

export const {
	replacePlayers,
	resetScores,
	incrementPlayerScoreByAmount,
	decrementPlayerScoreByAmount,
} = playerSlice.actions;

export default playerSlice.reducer;
