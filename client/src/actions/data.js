import axios from 'axios';
import data from '../reducers/data';
import {
    DATA_SUCCESS,
    CLEAR_DATA,
    DATA_UPDATE
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

export const updateData = (d) => async (dispatch) => {
  //check to see if user is valid
  try {
    console.log('update data called')
    const res = await axios.put(`${baseUrl}/api/data`, d);
    dispatch({
      type: DATA_UPDATE,
      payload: res.data,
    });
  } catch (err) {
    console.log(err)
    dispatch({
      type: CLEAR_DATA,
    });
  }
};