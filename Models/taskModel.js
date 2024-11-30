const mongoose = require('mongoose');

// Task Schema
const taskSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true, 
    trim: true, // Removes leading/trailing spaces from title
    unique: true // Ensures that each task title is unique (optional)
  },
  description: { 
    type: String, 
    required: false, // Optional field for task description
    trim: true // Remove leading/trailing spaces
  },
  completed: { 
    type: Boolean, 
    default: false // Default value is false for tasks not yet completed
  },
  createdAt: { 
    type: Date, 
    default: Date.now // Automatically set the creation date of the task
  },
  updatedAt: { 
    type: Date, 
    default: Date.now // Set the initial updatedAt date to now
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', // If you want to associate the task with a user (assuming User model exists)
    required: false
  }
}, {
  timestamps: true // Mongoose will automatically manage createdAt and updatedAt fields
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;

