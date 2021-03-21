import { configureStore } from "@reduxjs/toolkit";

import scoreBarReducer from "../features/score-bar/scoreBarSlice";

export const store = configureStore({
	reducer: {
		scoreBar: scoreBarReducer,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
