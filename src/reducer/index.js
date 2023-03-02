import { combineReducers, createStore } from "@reduxjs/toolkit";
import { LoginReducer } from "./LoginReducer";
import { SearchReducer,FilterReducer}  from "./SearchReducer";
import { ProductReducer } from "./ProductReducer";
const allReducer = combineReducers({LoginReducer,SearchReducer,FilterReducer,ProductReducer});
const store = createStore(allReducer);
export {store}