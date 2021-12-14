const express = require('express');
const app = express();

const port = 5000;
let data = require('./data.js');

// static assets
app.use(express.static('./methods-public')); // built in middleware express.static -> sets up static public folder
app.use(express.json()); // for parsing json requests (use req.body)
app.use(express.urlencoded({ extended: true })); // for parsing x-www-form-urlencoded (use req.body)

// basic method implementation
app.get('/api/people', (req, res) => {
    res.status(200).json({
        success: true,
        data: data.people
    });
});

app.post('/api/people', (req, res) => {
    console.log(req.body);
    const { name } = req.body;
    if (name) {
        res.status(201).json({
            success: true,
            name: name
        });
        return res.end();
    } else {
        res.status(400).json({
            success: false,
            message: 'Name not provided'
        });
        return res.end();
    }    
});

app.put('/api/people/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    // console.log(id);
    // console.log(name);

    const targetObj = data.people.find((obj) => {
        if (obj.id === Number(id)) return obj;
    });

    if (name && targetObj) {
        const oldName = targetObj.name;
        targetObj.name = name;        
        res.status(201).json({
            success: true,
            name: targetObj.name,
            oldName: oldName
        });
        return res.end();
    } else {
        if (!name) {
            res.status(400).json({
                success: false,
                message: 'Name not provided'
            });
            return res.end();
        }

        if (!targetObj) {
            res.status(404).json({
                success: false,
                message: 'targetObj not found'
            });
            return res.end();
        }
    }    
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