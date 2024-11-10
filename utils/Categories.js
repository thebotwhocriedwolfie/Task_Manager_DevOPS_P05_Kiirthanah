const { Category } = require('../models/Category');
const fs = require('fs').promises;

async function readJSON(filename) {
    try {
        const data = await fs.readFile(filename, 'utf8');
        return JSON.parse(data);
    } catch (err) { console.error(err); throw err; }
}
async function writeJSON(object, filename) {
    try {
        const allObjects = await readJSON(filename);
        allObjects.push(object);

        await fs.writeFile(filename, JSON.stringify(allObjects), 'utf8');
        return allObjects;
    } catch (err) { console.error(err); throw err; }
}

async function addCategory(req, res) {
    try {
        const name = req.body.name;
        const nameNoSpace = name.replace(/\s/g, ''); // Remove all spaces (\s is a regex for space and g is for global which means all spaces)
        const allCategories = await readJSON('utils/categories.json') // Read all categories
        let index = allCategories.findIndex(item => item.name === name); // Check if category already exists (index = -1 if not found)
        if (index !== -1) { // If category already exists
            return res.status(500).json({ message: 'Category already exists!' });
        }
        if (name == "") { // If name is empty
            return res.status(500).json({ message: 'Enter the name of the category!' });
        }
        if (nameNoSpace == "") { // If name is empty
            return res.status(500).json({ message: 'Name cannot be only spaces!' });
        }
        const newCategory = new Category(name);
        const updatedCategories = await writeJSON(newCategory, 'utils/categories.json');
        return res.status(201).json(updatedCategories);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function viewCategories(req, res) {
    try {
        const allCategories = await readJSON('utils/categories.json');
        return res.status(201).json(allCategories);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    readJSON, writeJSON, addCategory, viewCategories
};