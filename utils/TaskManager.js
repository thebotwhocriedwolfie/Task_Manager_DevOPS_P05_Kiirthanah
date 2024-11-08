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

module.exports = { readJSON, writeJSON };
