/* Server.js */
const express = require('express');
const cors = require('cors'); // 1. Import cors
const app = express();
const PORT = 5000;

// --- MIDDLEWARE ---
app.use(cors()); // 2. Use cors to allow cross-origin requests
app.use(express.json()); // To parse JSON from request bodies

// In-memory data store for demonstration
let tasks = [
  { id: 1, text: 'Learn Docker' },
  { id: 2, text: 'Build a project' }
];
let nextId = 3;

// --- API ROUTES ---
// GET all tasks
app.get('/api/tasks', (req, res) => {
  console.log('GET /api/tasks - Responding with all tasks');
  res.json(tasks);
});

// POST a new task
app.post('/api/tasks', (req, res) => {
  if (!req.body || !req.body.text) {
    return res.status(400).json({ error: 'Task text is required' });
  }
  const newTask = {
    id: nextId++,
    text: req.body.text.trim()
  };
  tasks.push(newTask);
  console.log('POST /api/tasks - Added new task:', newTask);
  res.status(201).json(newTask); // Respond with the newly created task
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});