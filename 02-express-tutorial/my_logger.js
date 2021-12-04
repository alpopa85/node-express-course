const logger = (req, res, next) => {
    const method = req.method;
    const url = req.url;
    const time = new Date().getFullYear();
    console.log(method, url, time);       
    next();
}

const aboutLogger = (req, res, next) => {
    console.log('About Middleware hit');
    next();
}

module.exports = { logger, aboutLogger };