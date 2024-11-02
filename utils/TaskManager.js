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

async function addTask(req, res) {
    try {
        const { name, description, start_time, end_time, owner } = req.body;

        // Input validation
        if (!owner.includes('@') || !owner.includes('.') || description.length < 6) {
            return res.status(400).json({ message: 'Validation error' });
        }

        // Create a new task object
        const newTask = {
            name,
            description,
            start_time,
            end_time,
            id: new Date().getTime() + "" + Math.floor(Math.random() * 1000).toString().padStart(3, '0') // Generating a new ID
        };

        const updatedTasks = await writeJSON(newTask, './utils/tasks.json'); // Ensure correct path

        return res.status(201).json(updatedTasks);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    readJSON,
    writeJSON,
    addTask // Ensure this matches the import in index.js
};
