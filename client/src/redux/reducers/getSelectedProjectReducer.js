import { initialState } from '../store/store';
import GET_SELECTED_PROJECT from '../actions/getSelectedProject';
import UPDATE_PROJECT_NAME from '../actions/updateSelectedProject/updateProjectName';

const getSelectedProjectReducer = (state = initialState, action) => {
  // if(action.type === GET_SELECTED_PROJECT) {
  //   return Object.assign({}, {
  //     selectedProject: Object.assign({}, state.selectedProject, action.payload)
  //   });
  // } else if (action.type === UPDATE_PROJECT_NAME) {
  //   // console.log('action payload: ', action.payload);
  //   return Object.assign({}, {
  //     selectedProject: Object.assign({}, state.selectedProject, action.payload)
  //   });
  // } else {
  //   return state;
  // }

  switch(action.type) {
    case GET_SELECTED_PROJECT:
    case UPDATE_PROJECT_NAME:
      return Object.assign({}, {
        selectedProject: Object.assign({}, state.selectedProject, action.payload)
      });
      break;
    default:
      return state;
  }


}

export default getSelectedProjectReducer;