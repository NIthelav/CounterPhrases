import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./counterSlice/slice";
import storage from "redux-persist/lib/storage";
import { persistCombineReducers, persistStore } from "redux-persist";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistCombineReducers(persistConfig, {
  counter: counterReducer,
});

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

