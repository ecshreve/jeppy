import { configureStore } from "@reduxjs/toolkit";

import clueReducer from "../features/clue/clueSlice";
import configReducer from "../features/config/configSlice";
import gameReducer from "../features/game/gameSlice";
import scoreBarReducer from "../features/score-bar/scoreBarSlice";

export const store = configureStore({
	reducer: {
		clue: clueReducer,
		game: gameReducer,
		scoreBar: scoreBarReducer,
		config: configReducer,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
