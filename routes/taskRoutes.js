const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Define routes for tasks
router.get('/', taskController.getAllTasks); // Get all tasks
router.post('/', taskController.addTask);    // Add a new task
router.delete('/:id', taskController.deleteTask); // Delete a task by ID

module.exports = router;
