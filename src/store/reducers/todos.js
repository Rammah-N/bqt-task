import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
	name: "todos",
	initialState: null,
	reducers: {
		setToDos: (state, action) => {
			return action.payload;
		},
	},
});

export const { setToDos } = slice.actions;

export default slice.reducer;
