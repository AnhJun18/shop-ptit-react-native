import { combineReducers, createStore } from "@reduxjs/toolkit";
import { LoginReducer } from "./LoginReducer";
import { SearchReducer } from "./SearchReducer";
const allReducer = combineReducers({LoginReducer,SearchReducer});
const store = createStore(allReducer);
export {store}