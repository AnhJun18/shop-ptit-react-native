import { combineReducers, createStore } from "@reduxjs/toolkit";
import { SearchReducer, FilterReducer } from "./SearchReducer";
import { ProductReducer } from "./ProductReducer";
import { AddressReducer } from './AddressReducer';
import OrderReducer from "./OrderReducer";
import { RefreshHome,RefreshStore } from "./RefreshReducer";
const allReducer = combineReducers({SearchReducer, FilterReducer, ProductReducer, AddressReducer,OrderReducer,RefreshHome,RefreshStore});
const store = createStore(allReducer);
export { store }