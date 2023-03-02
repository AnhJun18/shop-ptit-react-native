import { combineReducers, createStore } from "@reduxjs/toolkit";
import { LoginReducer } from "./LoginReducer";
import { SearchReducer, FilterReducer } from "./SearchReducer";
import { ProductReducer } from "./ProductReducer";
import { MoneyReducer } from "./MoneyReducer";
import { AddressReducer } from './AddressReducer';
import OrderReducer from "./OrderReducer";
const allReducer = combineReducers({SearchReducer, FilterReducer, ProductReducer, MoneyReducer, AddressReducer,OrderReducer});
const store = createStore(allReducer);
export { store }