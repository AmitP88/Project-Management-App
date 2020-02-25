import axios from 'axios';

 // POST a new project ("Create" method in CRUD)


// GET all projects ("Read all" method in CRUD)
export default {
  getAll: async () => {
    let res = await axios.get(`/api/project`);
    return res.data || [];
  }
}