var express = require('express');
var bodyParser = require("body-parser");
var app = express();
const logger = require('./logger');

const PORT = process.env.PORT || 5050;
var startPage = "index.html";


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("./public"));
app.use(express.static('utils'));

const { addCategory, viewCategories } = require('./utils/Categories')
const { editTask} = require('./utils/TaskEdit')
const { viewTask } = require('./utils/TaskDisplay')
const { addTask } = require('./utils/TaskCreate')

const statusMonitor = require('express-status-monitor');
app.use(statusMonitor());

//API routes
app.post('/add-category', addCategory);
app.get('/view-categories', viewCategories);
app.post('/add-tasks', addTask);
app.put('/tasks/:id', editTask);
//app.delete('/tasks/:id', deleteTask);
app.get('/view-tasks', viewTask);



app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/" + startPage);
});

server = app.listen(PORT, function () {
    const address = server.address();
    const baseUrl = `http://${address.address == "::" ? 'localhost' : address.address}:${address.port}`;
    console.log(`Demo project at: ${baseUrl}`);
    logger.info(`Demo project at: ${baseUrl}!`);
    logger.error(`Example or error log`)
});
module.exports = { app, server };
