import { DATA_SUCCESS, CLEAR_DATA, DATA_UPDATE } from '../actions/types';
  
  export default function (state = { data: null, loading: true, error: null }, action) {
    const { payload, type } = action;
    switch (type) {
      case DATA_SUCCESS:
        return {
            ...state,
          data: payload,
          loading: false,
        };
      case DATA_UPDATE:
        const existItem = state.data.find((i) => i.type === payload.type);
        if (existItem) {
          return {
            ...state,
            data: state.data.map((i) =>
              i.type === existItem.type ? payload : i
            ),
          }
        }
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
  