import { configureStore } from "@reduxjs/toolkit";
import devices from "./reducers/devices";
import user from "./reducers/user";
import todos from "./reducers/todos";
import { combineReducers } from "redux";
const store = configureStore({ reducer: { devices, user, todos } });

/* const store = configureStore({
	reducer,
}); */

export default store;
