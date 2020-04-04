import { initialState } from '../store/store';
import REQUEST_SUCCEEDED from '../actions/requestSucceeded';

const requestSucceededReducer = (state = initialState, action) => {
  if(action.type === REQUEST_SUCCEEDED){
    return Object.assign({}, action.payload);
  } else {
    return state;
  }
}

export default requestSucceededReducer;