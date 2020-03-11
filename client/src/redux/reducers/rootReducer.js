import { initialState } from '../store/store';
import ADD_PROJECT_SUBMIT from '../actions/addProjectSubmit';

const rootReducer = (state = initialState, action) => {
  if(action.type === ADD_PROJECT_SUBMIT){
    return Object.assign({}, state, {
      addProjectForm: Object.assign({}, state.addProjectForm, action.payload)
    });
  } else {
    return state;
  }
}

export default rootReducer;