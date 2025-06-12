import React, { useEffect, useState } from "react";

import './DashboardTrending.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";

const DashboardTrending = ({currentActive, refs}) => {

    const [trending, setTrending] = useState([]);
    const [isFetched, setIsFetched] = useState(false)

    useEffect(() => {
        fetch('https://api.coingecko.com/api/v3/search/trending').then(res => res.json())
        .then(async data => 
            {
                const trendingCoins = data.coins.map(({ item }) => item);
                const ids = trendingCoins.map(coin => coin.id).join(',');

                const pricesResponse = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`);
                const prices = await pricesResponse.json();

                const trendingWithPrices = trendingCoins.map(coin => ({...coin, price: prices[coin.id]?.usd ?? 'N/A'}));

                setTrending(trendingWithPrices);
                setIsFetched(true);
            }
        ).catch(err => console.log(err));
    }, []);

    return(
        <div className={`trending-container`} ref={refs[1]['ref']}>
            <div className="header">
                <h1>Trending <FontAwesomeIcon icon={faTrophy} /> </h1>
            </div>
            <div className="slider">

                {!isFetched ? (
                    <div className="waiting">
                        <h1>Waiting for data...</h1>
                    </div>
                ) : (

                    trending.map((coin) => (
                        <div className="trendig-card">
                            <div className="image-frame" >
                                <img src={coin.large} alt={coin.name} />
                            </div>
                            <div className="text">
                                <h1>{coin.name} ({coin.symbol})</h1>
                                <h2>Price: {coin.price > 0.01 ? coin.price.toFixed(2) : coin.price.toFixed(4)}$ </h2>
                                <h2>Ranking: {coin.market_cap_rank}</h2>
                            </div>
                        </div>
                    ))
                )}
                
            </div>

        </div>
    );
}

export default DashboardTrending;