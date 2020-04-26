import { initialState } from '../store/store';
import UPDATE_PROJECT_NAME from '../actions/updateSelectedProject/updateProjectName';

const updateSelectedProjectReducer = (state = initialState, action) => {
  if(action.type === UPDATE_PROJECT_NAME){
    return Object.assign({}, state.selectedProject, action.payload);
  } else {
    return state;
  }
}

export default updateSelectedProjectReducer;