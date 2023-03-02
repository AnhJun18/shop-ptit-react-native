import { combineReducers, createStore } from "@reduxjs/toolkit";
import { LoginReducer } from "./LoginReducer";
import { SearchReducer,FilterReducer}  from "./SearchReducer";
import { ProductReducer } from "./ProductReducer";
import { MoneyReducer } from "./MoneyReducer";
const allReducer = combineReducers({LoginReducer,SearchReducer,FilterReducer,ProductReducer,MoneyReducer});
const store = createStore(allReducer);
export {store}