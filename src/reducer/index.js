import { combineReducers, createStore } from "@reduxjs/toolkit";
import { LoginReducer } from "./LoginReducer";
const allReducer = combineReducers({LoginReducer});
const store = createStore(allReducer);
export {store}