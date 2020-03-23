import { initialState } from '../store/store';
import GET_SELECTED_PROJECT from '../actions/getSelectedProject';

const getSelectedProjectReducer = (state = initialState, action) => {
  if(action.type === GET_SELECTED_PROJECT) {
    return Object.assign({}, action.payload);
  } else {
    return state;
  }
}

export default getSelectedProjectReducer;