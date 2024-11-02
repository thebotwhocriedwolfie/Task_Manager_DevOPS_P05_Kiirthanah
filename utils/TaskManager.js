const { Tasks } = require('../models/Tasks'); // Corrected import
const fs = require('fs').promises;

async function readJSON(filename) {
    try {
        const data = await fs.readFile(filename, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error(err);
        throw err;
    }
}

async function writeJSON(object, filename) {
    try {
        const allObjects = await readJSON(filename);
        allObjects.push(object);
        await fs.writeFile(filename, JSON.stringify(allObjects, null, 2), 'utf8'); // Added spacing for readability
        return allObjects;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

async function addTask(req, res) { // Changed function name from addResource to addTask
    try {
        const { name, description, start_time, end_time, owner } = req.body;

        // Input validation
        if (!owner.includes('@') || !owner.includes('.') || description.length < 6) {
            return res.status(400).json({ message: 'Validation error' });
        }

        // Create a new task
        const newTask = new Tasks(name, description, start_time, end_time); // Changed variable name from newResource to newTask
        const updatedTasks = await writeJSON(newTask, 'utils/tasks.json'); // Changed filename reference to tasks.json

        return res.status(201).json(updatedTasks);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    readJSON,
    writeJSON,
    addTask // Changed export from addResource to addTask
};
