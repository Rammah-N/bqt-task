import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
	name: "devices",
	initialState: null,
	reducers: {
		setDevices: (devices, action) => {
			devices = action.payload;
			return devices;
		},
	},
});

export const { setDevices } = slice.actions;

export default slice.reducer;
