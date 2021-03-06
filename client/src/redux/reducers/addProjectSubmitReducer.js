import { initialState } from '../store/store';
import ADD_PROJECT_SUBMIT from '../actions/addProjectSubmit';

const addProjectSubmitReducer = (state = initialState, action) => {
  if(action.type === ADD_PROJECT_SUBMIT){
    return Object.assign({}, {
      addProjectForm: Object.assign({}, state.addProjectForm, action.payload)
    });
  } else {
    return state;
  }
}

export default addProjectSubmitReducer;