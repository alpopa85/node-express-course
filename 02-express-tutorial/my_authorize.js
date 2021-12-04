const authorize = (req, res, next) => {
    const { user } = req.query;
    if (user === 'john') {
        // attaching this object to the request object
        req.user = {
            name: 'John',
            id: 3
        };
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
}

module.exports = { authorize };