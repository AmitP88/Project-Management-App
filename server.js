const express = require('express');
const mongoose = require('mongoose');
const projectRouter = require('./routes/ProjectRoutes');

const app = express();
app.use(express.json()); // Makes sure that it comes back as json

// MongoDB Atlas URI to connect to cluster
const connectURI = 'mongodb+srv://Amit:watertemple89@cluster0-d2htt.mongodb.net/Project_Management_App?retryWrites=true&w=majority';
const connectURI_Starbucks = 'mongodb://Amit:watertemple89@cluster0-shard-00-00-d2htt.mongodb.net:27017,cluster0-shard-00-01-d2htt.mongodb.net:27017,cluster0-shard-00-02-d2htt.mongodb.net:27017/Project_Management_App?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority';

mongoose.connect(connectURI_Starbucks, {useNewUrlParser: true, useUnifiedTopology: true});

app.use(projectRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});