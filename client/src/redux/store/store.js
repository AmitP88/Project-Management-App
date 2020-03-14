import { createStore, combineReducers } from 'redux';
import addProjectSubmitReducer from '../reducers/addProjectSubmitReducer';
import storeProjectNameReducer from '../reducers/storeProjectNameReducer';

export const initialState = {
  addProjectForm: {
    name: '',
    deadline: '',
    tasks_completed: 0,
    total_tasks: 0
  },
  projectName: ''
}

const rootReducer = combineReducers({
  addProjectSubmitReducer,
  storeProjectNameReducer
});

const store = createStore(rootReducer);

export default store;