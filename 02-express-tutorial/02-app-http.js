const http = require('http');
const fs = require('fs');

const appIndexFile = fs.readFileSync('./navbar-app/index.html');
const stylesFile = fs.readFileSync('./navbar-app/styles.css');
const logoFile = fs.readFileSync('./navbar-app/logo.svg');
const logicFile = fs.readFileSync('./navbar-app/browser-app.js');

const server = http.createServer((req, res) => {
    logServerHit(req);

    routeRequest(req, res);            
});

function logServerHit(req) {
    let date = new Date();
    let logHit = date.toDateString() + ' - ' + date.toTimeString();
    // console.log(`Server hit at ${logHit}`);

    console.log(req.url);
}

function routeRequest(req, res) {
    switch (req.url) {
        case '/':
        case '/home':
            res.writeHead(200,{'content-type': 'text/html'});
            res.write('<h1>HOME PAGE</h1>');
            res.end();
            break;
        case '/about':
            res.writeHead(200,{'content-type': 'text/html'});
            res.write('<h1>ABOUT PAGE</h1>');
            res.end();
            break;
        case '/app':
            res.writeHead(200,{'content-type': 'text/html'});
            res.write(appIndexFile);
            res.end();
            break;
        case '/styles.css':            
            res.writeHead(200,{'content-type': 'text/css'});
            res.write(stylesFile);
            res.end();
            break;
        case '/logo.svg':            
            res.writeHead(200,{'content-type': 'image/svg+xml'});
            res.write(logoFile);
            res.end();
            break;
        case '/browser-app.js':            
            res.writeHead(200,{'content-type': 'text/javascript'});
            res.write(logicFile);
            res.end();
            break;
        default:
            res.writeHead(404,{'content-type': 'text/html'});
            res.write('<h1>PAGE NOT FOUND</h1>');
            res.end();
            break;
    }
}

try {
    server.listen(5000);
    console.log('Server running on port 5000');
} catch (err) {
    console.log(`Cannot start server. Error: ${err}`);
}