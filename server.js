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

  // POST a new item ("Create" method in CRUD)
  server.post("/api", (request, response) => {
    const item = request.body;
    dbCollection.insertOne(item, (error, result) => { // callback of insertOne
      if (error) throw error;
      // return updated list
      dbCollection.find().toArray((_error, _result) => { // callback of find
        if (_error) throw _error;
        response.json(_result);
      });
    });
  });

  // GET a single item based on it's ID ("Read one" method in CRUD)
  server.get("/api/:id", (request, response) => {
    const itemId = request.params.id;
    dbCollection.findOne({ id: itemId }, (error, result) => {
      if (error) throw error;
      // return item
      response.json(result);
    });
  });

  // Get all items ("Read all" method in CRUD)
  server.get("/api", (request, response) => {
    // return updated list
    dbCollection.find().toArray((error, result) => {
        if (error) throw error;
        response.json(result);
    });
  });

  // Update an item using PUT ("Update" method in CRUD)
  server.put("/api/:id", (request, response) => {
    const itemId = request.params.id;
    const item = request.body;
    console.log("Editing item: ", itemId, " to be ", item);

    dbCollection.updateOne({ id: itemId }, { $set: item }, (error, result) => {
      if (error) throw error;
      // send back entire updated list, to make sure frontend data is up-to-date
      dbCollection.find().toArray(function(_error, _result) {
          if (_error) throw _error;
          response.json(_result);
      });
    });
  });

  // Delete an item using ID ("Delete" method in CRUD)
  server.delete("/api/:id", (request, response) => {
    const itemId = request.params.id;
    console.log("Delete item with id: ", itemId);

    dbCollection.deleteOne({ id: itemId }, function(error, result) {
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

