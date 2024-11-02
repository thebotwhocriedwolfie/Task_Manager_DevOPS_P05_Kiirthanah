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

async function addResource(req, res) {
    try {
        const { name, description, start_time, end_time, owner } = req.body;

        // Input validation
        if (!owner.includes('@') || !owner.includes('.') || description.length < 6) {
            return res.status(400).json({ message: 'Validation error' });
        }

        // Create a new task
        const newResource = new Tasks(name, description, start_time, end_time);
        const updatedResources = await writeJSON(newResource, 'utils/tasks.json');
        
        return res.status(201).json(updatedResources);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    readJSON,
    writeJSON,
    addResource
};
