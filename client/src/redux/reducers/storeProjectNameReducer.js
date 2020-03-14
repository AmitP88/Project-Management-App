import { initialState } from '../store/store';
import STORE_PROJECT_NAME from '../actions/storeProjectName';

const storeProjectNameReducer = (state = initialState, action) => {
  if(action.type === STORE_PROJECT_NAME){
    return Object.assign({}, action.payload);
  } else {
    return state;
  }
}

export default storeProjectNameReducer;