var express = require('express');
var bodyParser = require("body-parser");
var app = express();

const PORT = process.env.PORT || 5050;
var startPage = "index.html";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("./public"));

const { addCategory, viewCategories } = require('./utils/Categories')
const { editTask, deleteTask } = require('./public/js/edit')

//API routes
app.post('/add-category', addCategory);
app.get('/view-categories', viewCategories);
app.put('/tasks/:id', editTask);
app.delete('/tasks/:id', deleteTask);

const { addTask } = require('./utils/TaskManager'); // Corrected import to match function name
app.post('/tasks', addTask); // Add the route to handle task creation

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/" + startPage);
});

server = app.listen(PORT, function () {
    const address = server.address();
    const baseUrl = `http://${address.address == "::" ? 'localhost' : address.address}:${address.port}`;
    console.log(`Demo project at: ${baseUrl}`);
});
module.exports = { app, server };
