const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: false,
    uppercase: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  deadline: {
    type: Date,
    required: true,
    trim: true
  },
  tasks_completed: {
    type: Number,
    required: true,
    trim: true,
    validate(value) {
      if (value < 0) throw new Error("Negative tasks aren't real.");
    }
  },
  total_tasks: {
    type: Number,
    required: true,
    trim: true,
    validate(value) {
      if (value < 0) throw new Error("Negative tasks aren't real.");
    }
  }
});

const Project = mongoose.model("Project", ProjectSchema);
module.exports = Project;