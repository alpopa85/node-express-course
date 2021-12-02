const http = require('http');
const fs = require('fs');

const scriptFile = fs.readFileSync('./script.js');

const server = http.createServer((req, res) => {
    logServerHit();

    routeRequest(req, res);            
});

function logServerHit() {
    let date = new Date();
    let logHit = date.toDateString() + ' - ' + date.toTimeString();
    console.log(`Server hit at ${logHit}`);
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
        case '/time':            
            fs.readFile('./index.html', 'utf-8', (err, data) => {
                if (err) {
                    res.writeHead(500,{'content-type': 'text/html'});
                    res.write('BAD ERROR!');
                } else {
                    res.writeHead(200,{'content-type': 'text/html'});
                    res.write(data);         
                }
                res.end();
            });                        
            break;
        case '/script.js':
            res.writeHead(200,{'content-type': 'text/html'});
            res.write(scriptFile);
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