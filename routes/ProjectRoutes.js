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

// GET ALL projects (Read All op in CRUD) or GET ONE project (Read One op in CRUD) if a query is passed to the request
app.get('/api/projects', async (req, res) => {
  let projects = await ProjectModel.find(req.query);

  try {
    // console.log('req.query: ', req.query);
    // console.log('projects:', projects);
    res.send(projects);
  } catch (err) {
    res.status(500).send(err);
  }
});

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