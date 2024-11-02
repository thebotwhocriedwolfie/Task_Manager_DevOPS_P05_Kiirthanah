var express = require('express');
var bodyParser = require("body-parser");
var app = express();

const PORT = process.env.PORT || 5050;
var startPage = "index.html";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("./public"));

// Import the function to add tasks
const { addTasks } = require('utils/TaskManager');

// Define the POST route for adding tasks
app.post('/tasks', async (req, res) => {
    try {
        // Retrieve task data from the request body
        const { name, description, start_time, end_time, owner } = req.body;

        // Validate the input data
        if (!name || !description || !start_time || !end_time || !owner) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Call the addTasks function to process the data
        const newTask = await addTasks({ name, description, start_time, end_time, owner });
        
        // Send a success response with the created task
        return res.status(201).json(newTask);
    } catch (error) {
        // Handle any errors
        return res.status(500).json({ message: error.message });
    }
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/" + startPage);
});

// Start the server
const server = app.listen(PORT, function () {
    const address = server.address();
    const baseUrl = `http://${address.address === "::" ? 'localhost' : address.address}:${address.port}`;
    console.log(`Demo project at: ${baseUrl}`);
});

module.exports = { app, server };
