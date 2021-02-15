import { DATA_SUCCESS, CLEAR_DATA, UNSUBMIT_SUCCESS, UNSUBMIT_FAIL } from '../actions/types';

const initialState = {
    profile: null,
    loading: true,
    error: null,
  };
  
  export default function (state = initialState, action) {
    const { payload, type } = action;
    switch (type) {
      case DATA_SUCCESS:
      case UNSUBMIT_SUCCESS:
        return {
            ...state,
          profile: payload,
          loading: false,
        };
      case CLEAR_DATA:
      case UNSUBMIT_FAIL:
        return {
            profile: null,
            loading: false,
            error: payload,
        };
      default:
        return state;
    }
  }
  