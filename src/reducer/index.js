import { combineReducers, createStore } from "@reduxjs/toolkit";
import { LoginReducer } from "./LoginReducer";
import { SearchReducer,FilterReducer,CategoryReducer}  from "./SearchReducer";
const allReducer = combineReducers({LoginReducer,SearchReducer,FilterReducer,CategoryReducer});
const store = createStore(allReducer);
export {store}