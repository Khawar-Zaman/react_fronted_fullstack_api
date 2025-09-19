/* App.js */
import './App.css';
import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:5000/api/tasks';

function App() {
  // 1. Initialize state with an empty array
  const [tasks, setTasks] = useState([]);
  const [inputText, setInputText] = useState('');
  const [error, setError] = useState(null);

  // 2. Fetching Tasks (GET) with useEffect
  useEffect(() => {
    // This function fetches data from the API
    const fetchTasks = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTasks(data); // Update state with fetched tasks
      } catch (e) {
        console.error("Failed to fetch tasks:", e);
        setError("Could not fetch tasks. Is the server running?");
      }
    };

    fetchTasks();
  }, []); // The empty dependency array [] means this effect runs once when the component mounts

  // 3. Adding a Task (POST)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return; // Don't add empty tasks

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Tell the server we're sending JSON
        },
        body: JSON.stringify({ text: inputText }), // Convert the JS object to a JSON string
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newTask = await response.json(); // The new task returned by the server

      // Update state optimally without re-fetching
      setTasks(prevTasks => [...prevTasks, newTask]);
      setInputText(''); // Clear the input field
      setError(null); // Clear any previous errors

    } catch (e) {
       console.error("Failed to add task:", e);
       setError("Failed to add the task. Please try again.");
    }
  };

  return (
    <div className='task-container'>
      <h1>My Tasks</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Add a new task"
        />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;