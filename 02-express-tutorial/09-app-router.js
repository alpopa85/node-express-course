const express = require('express');
const app = express();

const port = 5000;

const peopleRouter = require('./router/people');

// static assets
app.use(express.static('./methods-public')); // built in middleware express.static -> sets up static public folder
app.use(express.json()); // for parsing json requests (use req.body)
app.use(express.urlencoded({ extended: true })); // for parsing x-www-form-urlencoded (use req.body)

app.use('/api/people', peopleRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});