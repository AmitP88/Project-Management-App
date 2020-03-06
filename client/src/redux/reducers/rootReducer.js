import ADD_PROJECT_SUBMIT from '../actions/addProjectSubmit';
import { compose } from 'redux';

export const initialState = {
  addProjectForm: {
    name: '',
    deadline: ''
  }
}

const rootReducer = (state = initialState, action) => {
  if(action.type === ADD_PROJECT_SUBMIT){
    const { name, deadline } = action.payload;
    return {
      addProjectForm: {
        name,
        deadline
      }
    };
  } else {
    return state;
  }
}

export default rootReducer;