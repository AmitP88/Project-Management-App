const express = require("express");
const ProjectModel = require("../models/ProjectModel");
const app = express();

// POST a new project to the projects collection (Create op in CRUD)
app.post("/api/projects", async (req, res) => {
  const project = new ProjectModel(req.body); // creates a new project object based off the ProjectModel Schema
  try {
    await project.save(); // save() method saves the new project to the database
    res.send(project);
  } catch (err) {
    res.status(500).send(err);
  }
});

// GET ALL projects (Read All op in CRUD) or GET ONE project (Read One op in CRUD) if a query is passed to the request
app.get("/api/projects", async (req, res) => {
  let projects = await ProjectModel.find(req.query);

  try {
    res.send(projects);
  } catch (err) {
    res.status(500).send(err);
  }
});

// UPDATE an existing project on the projects collection using _id property (UPDATE op in CRUD)
app.patch("/api/projects/:id", async (req, res) => {
  console.log("sent name: ", req.body.params.name);

  ProjectModel.findByIdAndUpdate(
    req.params.id,
    { name: req.body.params.name },
    function (err, response) {
      // Handle any possible database errors
      if (err) {
        console.log("we hit an error" + err);
        res.json({
          message: "Database Update Failure",
        });

        // send response from db back to frontend
      } else {
        console.log("This is the Response: " + response);

        res.send(response);
      }
    }
  );
});

// DELETE an existing project on the projects collection using _id property (DELETE op in CRUD)
app.delete("/api/projects/:id", async (req, res) => {
  try {
    const project = await ProjectModel.findByIdAndDelete(req.params.id);
    !project ? res.status(404).send("No item found") : res.status(200).send();
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = app;
