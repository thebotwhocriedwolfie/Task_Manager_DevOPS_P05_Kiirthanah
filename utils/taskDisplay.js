const { read } = require('fs');

const fs = require('fs').promises;

// Reads JSON data from file
async function readJSON(filename) {
    try {
        const data = await fs.readFile(filename, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error(err);
        throw err;
    }
}

// Gets all tasks
async function viewTask(req, res) {
    try {
        const tasks = await readJSON('./utils/tasks.json');
        return res.status(200).json(tasks);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}

module.exports = { readJSON, viewTask };