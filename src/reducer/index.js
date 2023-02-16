import { combineReducers, createStore } from "@reduxjs/toolkit";
import { LoginReducer } from "./LoginReducer";
import { InfoReducer } from "./InfoUser";
const allReducer = combineReducers({LoginReducer,InfoReducer});
const store = createStore(allReducer);
export {store}