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
        const coinsResponse = await fetch('https://api.coingecko.com/api/v3/search/trending');
        const coinsData = await coinsResponse.json();

        const trendingCoins = coinsData.coins.map(({ item }) => item);
        const ids = trendingCoins.map(coin => coin.id).join(',');

        const pricesResponse = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`);
        const prices = await pricesResponse.json();

        const trendingWithPrices = trendingCoins.map(coin => ({...coin, price: prices[coin.id]?.usd ?? 'N/A'}));

        cachedData = trendingWithPrices;
        lastFetched = now;
        return res.json(trendingWithPrices);
    }
    catch(err)
    {
        console.log(err);
        return res.status(400).json({error: 'Failed to fetch coin data'});
    }
})

module.exports = router;