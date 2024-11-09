const express = require('express');
const path = require('path');
const app = express();
const indexRoutes = require('./index');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Use the routes defined in index.js
app.use('/', indexRoutes);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
