import initialState from '../store/store';
import ADD_PROJECT_SUBMIT from '../actions/addProjectSubmit';

const rootReducer = (state = initialState, action) => {
  if(action.type === ADD_PROJECT_SUBMIT){
    return {
      addProjectForm: {
        name: '',
        deadline: ''
      }
    }
  } else {
    return state;
  }
}