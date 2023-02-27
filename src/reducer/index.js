import { combineReducers, createStore } from "@reduxjs/toolkit";
import { LoginReducer } from "./LoginReducer";
import { SearchReducer,FilterReducer}  from "./SearchReducer";
const allReducer = combineReducers({LoginReducer,SearchReducer,FilterReducer});
const store = createStore(allReducer);
export {store}