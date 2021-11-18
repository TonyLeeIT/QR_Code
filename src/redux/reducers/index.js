import { ThemeReducer } from "./ThemeReducer";
import { PaginationReducer } from "./PaginationReducer";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({ ThemeReducer, PaginationReducer });
