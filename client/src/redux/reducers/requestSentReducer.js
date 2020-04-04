import { initialState } from '../store/store';
import REQUEST_SENT from '../actions/requestSent';
import REQUEST_SUCCEEDED from '../actions/requestSucceeded';

const requestSentReducer = (state = initialState, action) => {
  if(action.type === REQUEST_SENT || action.type === REQUEST_SUCCEEDED){
    return Object.assign({}, action.payload);
  } else {
    return state;
  }
}

export default requestSentReducer;