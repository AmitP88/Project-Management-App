import ADD_PROJECT_SUBMIT from '../actions/addProjectSubmit';
// import { compose } from 'redux';

export const initialState = {
  addProjectForm: {
    name: '',
    deadline: '',
    tasks_completed: 0,
    total_tasks: 0
  }
}

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