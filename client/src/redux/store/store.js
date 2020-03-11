import { createStore, combineReducers } from 'redux';
import addProjectSubmitReducer from '../reducers/addProjectSubmitReducer';
import searchProjectSubmitReducer from '../reducers/searchProjectSubmitReducer';

export const initialState = {
  addProjectForm: {
    name: '',
    deadline: '',
    tasks_completed: 0,
    total_tasks: 0
  },
  searchProjectForm: {
    query: ''
  }
}

const rootReducer = combineReducers({
  addProjectSubmitReducer,
  searchProjectSubmitReducer
});

const store = createStore(rootReducer);

export default store;