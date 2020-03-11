import { createStore } from 'redux';
import addProjectSubmitReducer from '../reducers/addProjectSubmitReducer';

export const initialState = {
  addProjectForm: {
    name: '',
    deadline: '',
    tasks_completed: 0,
    total_tasks: 0
  }
}

const store = createStore(addProjectSubmitReducer);

export default store;