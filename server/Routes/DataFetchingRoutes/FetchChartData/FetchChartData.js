const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.get('/', async (req, res) => {

    if(!req.query.searchedCoin)
    {
        console.log(req.query);
        return res.status(400).json({error: 'No coin to fetch'});
    }

    try
    {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${req.query.searchedCoin}/market_chart?vs_currency=usd&days=30`);
        const data = await response.json();

        if (!data.prices) {
            return res.status(429).json({ error: 'No price data returned' });
        }


        const charData = data.prices.map(([timestamp, price]) => ({
            time: new Date(timestamp).toLocaleDateString(),
            price,
        }));

        console.log('Retrived data for ' + req.query.searchedCoin);

        return res.status(200).json({ chartData: charData });
    }
    catch(err)
    {
        console.log(err);
        return res.status(400).json({error: 'Fetching error'});
    }

});

module.exports = router;