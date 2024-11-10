var express = require('express');
var bodyParser = require("body-parser");
var cors = require('cors');
var app = express();

const PORT = process.env.PORT || 5050;
var startPage = "index.html";

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("./public"));

const { addCategory, viewCategories } = require('./utils/Categories')
const { addTasks } = require('./utils/TaskManager')


//API routes
app.post('/add-category', addCategory);
app.get('/view-categories', viewCategories);
app.post('/add-tasks', addTasks);



app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/" + startPage);
});

server = app.listen(PORT, function () {
    const address = server.address();
    const baseUrl = `http://${address.address == "::" ? 'localhost' : address.address}:${address.port}`;
    console.log(`Demo project at: ${baseUrl}`);
});
module.exports = { app, server };
