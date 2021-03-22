import { configureStore } from "@reduxjs/toolkit";

import clueReducer from "../features/clue/clueSlice";
import configReducer from "../features/config/configSlice";
import playerReducer from "../features/player/playerSlice";

export const store = configureStore({
	reducer: {
		clue: clueReducer,
		player: playerReducer,
		config: configReducer,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
