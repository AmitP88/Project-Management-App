import { initialState } from '../store/store';
import REQUEST_SENT from '../actions/requestSent';

const requestSentReducer = (state = initialState, action) => {
  if(action.type === REQUEST_SENT){
    return Object.assign({}, action.payload);
  } else {
    return state;
  }
}

export default requestSentReducer;