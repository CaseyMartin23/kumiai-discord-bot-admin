import { DATA_SUCCESS, CLEAR_DATA } from '../actions/types';
  
  export default function (state = { data: null, loading: true, error: null }, action) {
    const { payload, type } = action;
    switch (type) {
      case DATA_SUCCESS:
        return {
            ...state,
          data: payload,
          loading: false,
        };
      case CLEAR_DATA:
        return {
            data: null,
            loading: false,
            error: payload,
        };
      default:
        return state;
    }
  }
  