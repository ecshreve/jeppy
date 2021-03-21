import { configureStore } from "@reduxjs/toolkit";

import clueReducer from "../features/clue/clueSlice";
import scoreBarReducer from "../features/score-bar/scoreBarSlice";

export const store = configureStore({
	reducer: {
		clue: clueReducer,
		scoreBar: scoreBarReducer,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
