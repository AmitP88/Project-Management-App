import { createStore, combineReducers } from 'redux';
import addProjectSubmitReducer from '../reducers/addProjectSubmitReducer';
import storeProjectNameReducer from '../reducers/storeProjectNameReducer';
import getSelectedProjectReducer from '../reducers/getSelectedProjectReducer';
import requestSentReducer from '../reducers/requestSentReducer';

export const initialState = {
  addProjectForm: {
    name: '',
    deadline: '',
    tasks_completed: 0,
    total_tasks: 0
  },
  projectName: '',
  selectedProject: {
    _id: '',
    name: '',
    deadline: '',
    tasks_completed: 0,
    total_tasks: 0
  },
  requestStatus: ''
}

const rootReducer = combineReducers({
  addProjectSubmitReducer,
  storeProjectNameReducer,
  getSelectedProjectReducer,
  requestSentReducer,
});

const store = createStore(rootReducer);

export default store;