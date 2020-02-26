const express = require('express');
const server = express();

const body_parser = require('body-parser');

// parse JSON (application/json content-type)
server.use(body_parser.json());

// for production only
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req,res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })

}

const port = 5000;

// db setup
const db = require("./db");
const dbName = "data";
const collectionName = "projects";

// db init
db.initialize(dbName, collectionName, function(dbCollection) {
  // get all items
  dbCollection.find().toArray(function(err, result) {
    if (err) throw err;
      console.log(result);
  });

  // db CRUD routes

  // POST a new project ("Create" method in CRUD)
  server.post("/api/project", (request, response) => {
    const project = request.body;
    dbCollection.insertOne(project, (error, result) => { // callback of insertOne
      if (error) throw error;
      // return updated list
      dbCollection.find().toArray((_error, _result) => { // callback of find
        if (_error) throw _error;
        response.json(_result);
      });
    });
  });

  // GET a single project based on it's ID ("Read one" method in CRUD)
  server.get("/api/project/:_id", (request, response) => {
    const projectId = request.params._id;
    dbCollection.findOne({ _id: projectId }, (error, result) => {
      if (error) throw error;
      // return item
      response.json(result);
    });
  });

  // Get all projects ("Read all" method in CRUD)
  server.get("/api/project", (request, response) => {
    // return updated list
    dbCollection.find().toArray((error, result) => {
        if (error) throw error;
        response.json(result);
    });
  });

  // Update a project using PUT ("Update" method in CRUD)
  server.put("/api/projects/:_id", (request, response) => {
    const projectId = request.params._id;
    const project = request.body;
    console.log("Editing project: ", projectId, " to be ", project);

    dbCollection.updateOne({ _id: projectId }, { $set: project }, (error, result) => {
      if (error) throw error;
      // send back entire updated list, to make sure frontend data is up-to-date
      dbCollection.find().toArray(function(_error, _result) {
          if (_error) throw _error;
          response.json(_result);
      });
    });
  });

  // Delete a project using ID ("Delete" method in CRUD)
  server.delete("/api/project/:_id", (request, response) => {
    const projectId = request.params._id;
    console.log("Delete project with _id: ", projectId);

    dbCollection.deleteOne({ _id: projectId }, function(error, result) {
        if (error) throw error;
        // send back entire updated list after successful request
        dbCollection.find().toArray(function(_error, _result) {
            if (_error) throw _error;
            response.json(_result);
        });
    });
  });



}, function(err) { //failureCallback
    throw (err);
});



server.listen(port, () => {
  console.log(`Server listening at ${port}`);
});
