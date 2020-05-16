import { initialState } from '../store/store';
import GET_SELECTED_PROJECT from '../actions/getSelectedProject';
import UPDATE_PROJECT_NAME from '../actions/updateSelectedProject/updateProjectName';
import UPDATE_PROJECT_DEADLINE from '../actions/updateSelectedProject/updateProjectDeadline';

const getSelectedProjectReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_SELECTED_PROJECT:
    case UPDATE_PROJECT_NAME:
    case UPDATE_PROJECT_DEADLINE:
      return Object.assign({}, {
        selectedProject: Object.assign({}, state.selectedProject, action.payload)
      });
    default:
      return state;
  }
}

export default getSelectedProjectReducer;