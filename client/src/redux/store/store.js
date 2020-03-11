import { createStore } from 'redux';
import rootReducer from '../reducers/rootReducer';

export const initialState = {
  addProjectForm: {
    name: '',
    deadline: '',
    tasks_completed: 0,
    total_tasks: 0
  }
}

const store = createStore(rootReducer);

export default store;