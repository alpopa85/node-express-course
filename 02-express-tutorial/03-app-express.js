const express = require('express');
const app = express();
const port = 5000;

app.get('/', (req, res) => {
    console.log('User hit ' + req.url);
    res.send('Home Page');
    // res.status(200).send('Home Page');
});

app.get('/home', (req, res) => {
    console.log('User hit ' + req.url);
    res.status(200).send('Home Page');
});

app.get('/about', (req, res) => {
    console.log('User hit ' + req.url);
    res.status(200).send('About Page');
});

app.all('/time', (req, res) => {
    res.status(404).send('<h1>Time not found</h1>');
});

app.all('*', (req, res) => {
    res.status(404).send('<h1>Resource not found</h1>');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});