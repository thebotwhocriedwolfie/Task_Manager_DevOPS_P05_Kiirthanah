const fs = require('fs').promises;
const path = require('path');
const Tasks = require('../models/Tasks'); // Import Tasks class

const filePath = path.join(__dirname, 'tasks.json');

async function readJSON() {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error("Error reading tasks:", err);
        throw err;
    }
}

async function writeJSON(task) {
    try {
        const allTasks = await readJSON();
        allTasks.push(task);
        await fs.writeFile(filePath, JSON.stringify(allTasks, null, 2), 'utf8');
        return allTasks;
    } catch (err) {
        console.error("Error writing task:", err);
        throw err;
    }
}


async function addTask(req, res) {
    const { name, description, category, start_time, end_time, timestamp } = req.body;

    if (!name || !description || !category || !start_time || !end_time || !timestamp) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const newTask = new Tasks(name, description, category, start_time, end_time, timestamp);
    try {
        const updatedTasks = await writeJSON(newTask);
        res.status(201).json(updatedTasks);
    } catch (error) {
        console.error("Error adding task:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = { readJSON, writeJSON, addTask };



