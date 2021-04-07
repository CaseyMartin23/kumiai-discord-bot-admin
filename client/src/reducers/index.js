import { combineReducers } from "redux";
import auth from "./auth";
import alert from "./alert";
// import data from './data';

//main reducer
export default combineReducers({
  auth,
  alert,
  // data
});
