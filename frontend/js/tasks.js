document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = '/tasks'; // Adjusted URL for tasks API
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    
    // Fetch tasks and display them
    async function fetchTasks() {
      try {
        const response = await fetch(apiUrl);
        const tasks = await response.json();
        taskList.innerHTML = ''; // Clear the list before rendering new tasks
  
        tasks.forEach(task => {
          const li = document.createElement('li');
          li.className = task.completed ? 'completed' : '';
          li.innerHTML = ` 
            <span>${task.title}</span>
            <button class="delete-btn" data-id="${task._id}">Delete</button>
          `;
          taskList.appendChild(li);
        });
  
        // Add event listeners for the delete buttons
        document.querySelectorAll('.delete-btn').forEach(button => {
          button.addEventListener('click', deleteTask);
        });
      } catch (error) {
        console.error('Error fetching tasks:', error);
        alert('An error occurred while fetching tasks. Please try again.');
      }
    }
  
    // Add a new task
    async function addTask(e) {
      e.preventDefault();
      const taskTitle = taskInput.value.trim();
  
      if (taskTitle) {
        try {
          const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: taskTitle, completed: false })
          });
  
          const newTask = await response.json();
          if (response.ok) {
            taskInput.value = ''; // Clear input field
            fetchTasks(); // Refresh the task list
          } else {
            alert(newTask.error || 'Failed to add task');
          }
        } catch (error) {
          console.error('Error adding task:', error);
        }
      }
    }
  
    // Delete a task
    async function deleteTask(e) {
      const taskId = e.target.getAttribute('data-id');
      try {
        const response = await fetch(`${apiUrl}/${taskId}`, {
          method: 'DELETE',
        });
  
        const result = await response.json();
        if (response.ok) {
          fetchTasks(); // Refresh the task list after deletion
        } else {
          alert(result.error || 'Failed to delete task');
        }
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  
    // Event listeners
    taskForm.addEventListener('submit', addTask);
    fetchTasks(); // Initial task load
  });
  