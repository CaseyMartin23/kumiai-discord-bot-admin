import axios from 'axios';
import {
    DATA_SUCCESS,
    CLEAR_DATA,
    UNSUBMIT_FAIL,
    UNSUBMIT_SUCCESS
} from './types';

const baseUrl = 'https://match-app-node.herokuapp.com'

export const getData = () => async (dispatch) => {
  //check to see if user is valid
  try {
    const res = await axios.get(`${baseUrl}/api/profile`);
    dispatch({
      type: DATA_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err)
    dispatch({
      type: CLEAR_DATA,
    });
  }
};

export const unsubmit = () => async (dispatch) => {
  //check to see if user is valid
  try {
    const res = await axios.get(`${baseUrl}/api/profile/unsubmit`);
    dispatch({
      type: UNSUBMIT_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err)
    dispatch({
      type: UNSUBMIT_FAIL,
    });
  }
};
