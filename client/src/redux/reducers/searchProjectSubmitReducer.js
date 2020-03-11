import { initialState } from '../store/store';
import SEARCH_PROJECT_SUBMIT from '../actions/searchProjectSubmit';

const searchProjectSubmitReducer = (state = initialState, action) => {
  if(action.type === SEARCH_PROJECT_SUBMIT){
    return Object.assign({}, {
      searchProjectForm: Object.assign({}, state.searchProjectForm, action.payload)
    });
  } else {
    return state;
  }
}

export default searchProjectSubmitReducer;