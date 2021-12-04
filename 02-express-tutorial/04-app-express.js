const express = require('express');
const path = require('path');
const app = express();
const port = 5000;

// setup static and middleware
app.use(express.static('./my_public')); // that's all I need to do to use those dependencies

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './navbar-app/index.html'));
});

app.all('*', (req, res) => {
    res.status(404).send('<h1>Resource not found</h1>');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});