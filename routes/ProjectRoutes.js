const express  = require('express');
const ProjectModel = require('../models/ProjectModel');
const app = express();

// POST a new project to the projects collection (Create op in CRUD)
app.post('/api/projects', async (req, res) => {
  const project = new ProjectModel(req.body); // creates a new project object based off the ProjectModel Schema
  try {
    await project.save(); // save() method saves the new project to the database
    res.send(project);
  } catch (err) {
    res.status(500).send(err);
  }
});

// GET ALL projects (Read All op in CRUD)
app.get('/api/projects', async (req, res) => {
  const projects = await ProjectModel.find({}); // an empty object {} will return all projects
  try {
    res.send(projects);
  } catch (err) {
    res.status(500).send(err);
  }
});

// GET a project by a specific name (Read One op in CRUD)
// app.get('/projects', async (req, res) => {
//   // search query for name goes here stored in a variable
//   const search_name = "insert search query here";
//   const projects = await ProjectModel.find({ name: `${search_name}` });
//   try {
//     res.send(projects);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// UPDATE an existing project on the projects collection using _id property (UPDATE op in CRUD)
app.patch('/api/projects/:id', async (req, res) => {
  try {
    await ProjectModel.findByIdAndUpdate(req.params.id, req.body);
    await ProjectModel.save();
    res.send(projects);
  } catch(err) {
    res.status(500).send(err);
  }
});


// DELETE an existing project on the projects collection using _id property (DELETE op in CRUD)
app.delete('/api/projects/:id', async (req, res) => {
  try {
    const project = await ProjectModel.findByIdAndDelete(req.params.id);
    !project ? res.status(404).send('No item found') : res.status(200).send();
  } catch(err) {
    res.status(500).send(err);
  }
});

module.exports = app;