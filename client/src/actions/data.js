import axios from 'axios';
import data from '../reducers/data';
import {
    DATA_SUCCESS,
    CLEAR_DATA,
    DATA_UPDATE,
    DATA_DELETE,
    DATA_CREATE
} from './types';

const baseUrl = ''

export const getData = (type) => async (dispatch) => {
  //check to see if user is valid
  try {
    const res = await axios.get(`${baseUrl}/api/data/${type}`);
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

export const deleteData = (data) => async (dispatch) => {
  //check to see if user is valid
  try {
    const res = await axios.delete(`${baseUrl}/api/data/${data.type}/${data.id}`);
    dispatch({
      type: DATA_DELETE,
      payload: res.data,
    });
  } catch (err) {
    console.log(err)
    dispatch({
      type: CLEAR_DATA,
    });
  }
};

export const createRank = (data) => async (dispatch) => {
  //check to see if user is valid
  try {
    console.log(data);
    const res = await axios.post(`${baseUrl}/api/data`, data);
    dispatch({
      type: DATA_CREATE,
      payload: res.data,
    });
  } catch (err) {
    console.log(err)
    dispatch({
      type: CLEAR_DATA,
    });
  }
};