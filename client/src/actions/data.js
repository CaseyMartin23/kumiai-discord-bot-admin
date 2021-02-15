import axios from 'axios';
import {
    DATA_SUCCESS,
    CLEAR_DATA,
    UNSUBMIT_FAIL,
    UNSUBMIT_SUCCESS
} from './types';

const baseUrl = 'http://localhost:5000'

export const getData = (type) => async (dispatch) => {
  //check to see if user is valid
  try {
    const res = await axios.post(`${baseUrl}/api/data`, { type });
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