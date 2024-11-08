const express = require('express');
const router = express.Router();
const { writeJSON, readJSON } = require('./utils/TaskManager');
const Tasks = require('./models/Tasks');

router.post('/tasks', async (req, res) => {
    try {
        const { name, description, start_time, end_time, owner } = req.body;

        // Validate data
        if (!name || !description || !start_time || !end_time || !owner) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newTask = new Tasks(name, description, start_time, end_time, owner);
        const updatedTasks = await writeJSON(newTask);
        res.status(201).json(updatedTasks);
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await readJSON();
        res.status(200).json(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
