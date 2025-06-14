const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

let cachedData = null;
let lastFetched = 0;
const CACHE_DURATION = 60 * 1000;

router.get('/', async (req, res) => {

    const now = Date.now();

    if (cachedData && (now - lastFetched < CACHE_DURATION)) {
        return res.json(cachedData);
    }


    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/list');
        const data = await response.json();
        cachedData = data;
        lastFetched = now;
        return res.json(data);
    }
    catch(err)
    {
        console.log(err);
        return res.status(400).json({error: 'Failed to fetch coin data'});
    }
})

module.exports = router;