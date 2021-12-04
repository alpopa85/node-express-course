const express = require('express');
const app = express();

const port = 5000;
const data = require('./data.js');

app.get('/', (req, res) => {
    res.send('<h1>HOME PAGE</h1><br/><a href="/api/products">See Products</a>');
});

// get all products
app.get('/api/products', (req, res) => {
    const newProducts = data.products.map((product) => {
        // const {id, name, image} = product;
        // return {id, name, image};

        return {
            id: product.id,
            name: product.name,
            image: product.image
        };
    });
    res.json(newProducts);
});

// get product w ID = 1
// app.get('/api/products/1', (req, res) => {
//     const singleProduct = data.products.find(product => product.id === 1);
//     res.json(singleProduct);
// });

// using route parameters
app.get('/api/products/:productID', (req, res) => {
    console.log('Request params: ', req.params);
    const { productID } = req.params;

    const singleProduct = data.products.find(product => product.id === Number(productID));
    
    if (!singleProduct) {
        res.status(404).send('Product does not exist!');
    }
    res.json(singleProduct);
});

// multiple request params
app.get('/api/products/:productID/reviews/:reviewID', (req, res) => {
    console.log(req.params);
    res.send('hi');
});

// using query params
app.get('/api/v1/query', (req, res) => {
    console.log(req.query);
    const { search, limit } = req.query;
    let sortedProducts = [...data.products];

    if (search) {
        sortedProducts = sortedProducts.filter((product) => {
            return product.name.startsWith(search);
        });
    };

    if (limit) {
        sortedProducts = sortedProducts.slice(0, Number(limit));
    };

    if (sortedProducts.length < 1) {
        return res.status(200).json({success: false, message: 'No match!'});        
    }
    return res.status(200).json({success: true, data: sortedProducts});
});

app.listen(port, () => {
    console.log(`Server running on ${port}`);
});