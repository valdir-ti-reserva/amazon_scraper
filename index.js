const express = require('express');
const request = require('request-promise');

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

const generateUrl = (apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`

app.get('/', (_, res) => {
    res.status(200).json({
        message: 'Welcome to Amazon Scraper API.'
    });
})

//GET Product Details
app.get('/products/:productId', async (req, res) => {
    const { productId } = req.params
    const { api_key } = req.query
    try {
        const response = await request(`${generateUrl(api_key)}&url=https://www.amazon.com/dp/${productId}`)
        res.json(JSON.parse(response))
    } catch (err) {
        res.json(err)
    }
});

//GET Product Reviews
app.get('/products/:productId/reviews', async (req, res) => {
    const { productId } = req.params
    const { api_key } = req.query
    try {
        const response = await request(`${generateUrl(api_key)}&url=https://www.amazon.com/product-reviews/${productId}`)
        res.json(JSON.parse(response))
    } catch (err) {
        res.json(err)
    }
});

//GET Product Offers
app.get('/products/:productId/offers', async (req, res) => {
    const { productId } = req.params
    const { api_key } = req.query
    try {
        const response = await request(`${generateUrl(api_key)}&url=https://www.amazon.com/gp/offer-listing/${productId}`)
        res.json(JSON.parse(response))
    } catch (err) {
        res.json(err)
    }
});

//GET Search Results
app.get('/search/:searchQuery', async (req, res) => {
    const { searchQuery } = req.params
    const { api_key } = req.query
    try {
        const response = await request(`${generateUrl(api_key)}&url=https://www.amazon.com/s?k=${searchQuery}`)
        res.json(JSON.parse(response))
    } catch (err) {
        res.json(err)
    }
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))