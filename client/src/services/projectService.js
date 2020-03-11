import axios from 'axios';
import store from '../redux/store/store';

export default {
// POST a new project ("Create" method in CRUD)  
  postNew: async () => {
    let submitted_data = store.getState().addProjectSubmitReducer.addProjectForm;
    let res = await axios.post(`/api/projects`, submitted_data);
    return res;
  },
// GET all projects ("Read all" method in CRUD)  
  getAll: async () => {
    let res = await axios.get(`/api/projects`);
    return res.data || [];
  }
}