import { createStore } from 'redux';
import rootReducer from '../reducers/rootReducer';

export const initialState = {
  addProjectForm: {
    name: '',
    deadline: ''
  }
}

const store = createStore(rootReducer);

export default store;