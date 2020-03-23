import { createStore, combineReducers } from 'redux';
import addProjectSubmitReducer from '../reducers/addProjectSubmitReducer';
import storeProjectNameReducer from '../reducers/storeProjectNameReducer';
import getSelectedProjectReducer from '../reducers/getSelectedProjectReducer';

export const initialState = {
  addProjectForm: {
    name: '',
    deadline: '',
    tasks_completed: 0,
    total_tasks: 0
  },
  projectName: '',
  selectedProject: {
    name: '',
    deadline: '',
    tasks_completed: 0,
    total_tasks: 0
  }
}

const rootReducer = combineReducers({
  addProjectSubmitReducer,
  storeProjectNameReducer,
  getSelectedProjectReducer
});

const store = createStore(rootReducer);

export default store;