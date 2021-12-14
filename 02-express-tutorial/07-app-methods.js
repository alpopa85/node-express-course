const express = require('express');
const app = express();

const port = 5000;
let data = require('./data.js');

// static assets
// app.use(express.static('./methods-public'));
app.use(express.json()); // for parsing json requests (use req.body)
app.use(express.urlencoded({ extended: true })); // for parsing x-www-form-urlencoded (use req.body)

app.get('/api/people', (req, res) => {
    res.status(200).json({
        success: true,
        data: data.people
    });
});

app.post('/api/people', (req, res) => {
    console.log(req.body);
    res.status(200).json({
        success: true
    })
});

// using routes
app.route('/api/peoplerouter')
    .get((req, res) => {
        console.log(req.body);
        res.status(200).json({
            success: true,
            data: data.people
        });
    })
    .post((req, res) => {
        console.log(req.body);
        res.status(200).json({
            success: true
        })
    });

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});