const fs = require('fs').promises;

// Reads JSON data from a file
async function readJSON(filename) {
    try {
        const data = await fs.readFile(filename, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        // If file doesn't exist, return an empty array
        if (err.code === 'ENOENT') {
            return []; // Initialize with an empty array
        }
        console.error('Error reading JSON file:', err);
        throw err;
    }
}

// Writes an object to a JSON file
async function writeJSON(object, filename) {
    try {
        const allObjects = await readJSON(filename); // Read existing objects
        allObjects.push(object); // Add the new object
        await fs.writeFile(filename, JSON.stringify(allObjects, null, 2), 'utf8'); // Write updated objects
        return allObjects; // Return updated list of objects
    } catch (err) {
        console.error('Error writing JSON file:', err);
        throw err;
    }
}

// Adds a new task
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

        // Write the new task to the JSON file
        const updatedTasks = await writeJSON(newTask, './utils/tasks.json'); // Ensure correct path

        return res.status(201).json(newTask); // Return only the newly added task
    } catch (error) {
        console.error('Error adding task:', error); // Log the error
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    readJSON,
    writeJSON,
    addTask // Ensure this matches the import in index.js
};
