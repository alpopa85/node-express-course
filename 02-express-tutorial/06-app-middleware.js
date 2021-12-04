const express = require('express');
const app = express();

const port = 5000;
const data = require('./data.js');

const morgan = require('morgan');

// req => middleware => res
const {logger, aboutLogger} = require('./my_logger.js');
const {authorize} = require('./my_authorize.js');

// this will invoke the logger for every route!
// app.use(logger);

// this will invoke the middlewares only for the api route!
// app.use('/api', [logger, aboutLogger]);

app.get('/', logger, (req, res) => {    
    res.send('Home');
});

// a chain of middleware (logger -> next aboutLogger)
app.get('/about', [logger, aboutLogger], (req, res) => {
    res.send('about');
});

app.get('/api', logger, (req, res) => {    
    res.json({
        success: true
    });
});

app.get('/login/query', [logger, morgan('tiny'), authorize], (req, res) => {      
    console.log(req.user);
    res.json({
        success: true,
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});