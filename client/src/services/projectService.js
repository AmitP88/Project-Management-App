import axios from 'axios';
import store from '../redux/store/store';

const qs = require('qs');

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
  },
// GET a selected project ("Read One" method in CRUD)
  getOne: async () => {
    let selected_project = store.getState().storeProjectNameReducer.projectName;
    let res = await axios.get(`/api/projects`, {
      params: {
        name: selected_project
      },
      paramsSerializer: params => {
        return qs.stringify(params);
      }
    });
    return res.data || [];
  },
// UPDATE a selected project ("Update" method in CRUD)
  updateOne: async () => { // yeah, I mean we have to place it in here lol - it is! :-D
    let selected_project_id = store.getState().getSelectedProjectReducer.selectedProject._id;
    let selected_project_name = store.getState().getSelectedProjectReducer.selectedProject.name;

    // example from the axios docs here for comparison:
    axios.patch(`/api/projects/${selected_project_id}`, {
      params: {
        name: selected_project_name
      }
    })
    .then(function (response) {
      // handle success
      console.log(response);
      console.log(selected_project_name);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });

  }
}
