import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
	name: "user",
	initialState: null,
	reducers: {
		setUser: (state, action) => {
			return action.payload;
		},
		removeUser: (state, action) => {
			return null;
		},
	},
});

export const { setUser, removeUser } = slice.actions;

export default slice.reducer;
