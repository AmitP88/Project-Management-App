import { createStore, combineReducers } from 'redux';
import addProjectSubmitReducer from '../reducers/addProjectSubmitReducer';

export const initialState = {
  addProjectForm: {
    name: '',
    deadline: '',
    tasks_completed: 0,
    total_tasks: 0
  }
}

const rootReducer = combineReducers({
  addProjectSubmitReducer
});

const store = createStore(rootReducer);

export default store;