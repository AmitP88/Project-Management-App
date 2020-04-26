import { initialState } from '../store/store';
import REQUEST_SENT from '../actions/requests/requestSent';
import REQUEST_SUCCEEDED from '../actions/requests/requestSucceeded';
import REQUEST_RESET from '../actions/requests/requestReset';

const requestSentReducer = (state = initialState, action) => {
  if(action.type === REQUEST_SENT || action.type === REQUEST_SUCCEEDED || action.type === REQUEST_RESET){
    return Object.assign({}, action.payload);
  } else {
    return state;
  }
}

export default requestSentReducer;