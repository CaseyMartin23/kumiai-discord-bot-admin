import axios from "axios";
import {
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  CLEAR_DATA,
} from "./types";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";
const baseUrl = "";

export const loadUser = () => async (dispatch) => {
  //Set token from localStorage in browser
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  //check to see if user is valid
  try {
    const res = await axios.get(`${baseUrl}/api/auth`);
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//Login User
export const login = (username, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ username, password });
  try {
    const res = await axios.post(`${baseUrl}/api/auth`, body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data, //route sends back token
    });
    dispatch(loadUser());
  } catch (err) {
    console.log(err.response);
    var message;
    message = !err.response.data.message
      ? "Server error. Please try again later."
      : err.response.data.message;
    dispatch(setAlert(message, "info"));
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

//Clear schedule and logout user
export const logout = () => async (dispatch) => {
  dispatch({
    type: CLEAR_DATA,
  });
  dispatch({
    type: LOGOUT,
  });
  document.location.href = "/";
};
