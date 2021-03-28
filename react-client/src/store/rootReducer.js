import { combineReducers } from "redux";
// import * as store from 'store';
import animalsReducer from "./animals/animalsReducer";

const rootReducer = combineReducers({
  animals: animalsReducer,
});

export default rootReducer;
