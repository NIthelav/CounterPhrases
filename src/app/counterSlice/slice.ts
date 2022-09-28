import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface PhraseData {
  idx: number;
  phrase: string;
  count: number;
}

export type PhraseDick = Record<string, PhraseData>;

export interface CounterState {
  listPhrases: string[];
  phrases: PhraseDick;
}

const initialState: CounterState = {
  listPhrases: [],
  phrases: {},
};

export const counerSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addPhrase: (state, { payload: name }: PayloadAction<string>) => {
      if (state.phrases[name]) return;
      const idx = state.listPhrases.length;
      state.listPhrases.push(name);
      state.phrases[name] = { idx, phrase: name, count: 0 };
    },
    removePhrase: (state, { payload: name }: PayloadAction<string>) => {
      if (!state.phrases[name]) return;
      const idx = state.phrases[name].idx;
      state.listPhrases.splice(idx, 1);
      delete state.phrases[name];
    },
    increment: (state, { payload: name }: PayloadAction<string>) => {
      if (!state.phrases[name]) return;
      state.phrases[name].count++;
    },
    decrement: (state, { payload: name }: PayloadAction<string>) => {
      if (!state.phrases[name]) return;
      state.phrases[name].count--;
    },
    setValue: (
      state,
      {
        payload: { name, value },
      }: PayloadAction<{ name: string; value: number }>
    ) => {
      if (!state.phrases[name]) return;
      state.phrases[name].count = value;
    },
    changeName: (
      state,
      {
        payload: { curName, newName },
      }: PayloadAction<{ curName: string; newName: string }>
    ) => {
      if (!state.phrases[curName] || state.phrases[newName]) return;
      const idx = state.phrases[curName].idx;
      state.listPhrases[idx] = newName;
      state.phrases[newName] = { ...state.phrases[curName], phrase: newName };
      delete state.phrases[curName];
    },
  },
});

export const {
  addPhrase,
  removePhrase,
  increment,
  decrement,
  setValue,
  changeName,
} = counerSlice.actions;

export const selectCount = (name: string) => (state: RootState) =>
  state.counter.phrases[name].count;

export const selectList = (state: RootState) => state.counter.listPhrases;

export const counterReducer = counerSlice.reducer;
