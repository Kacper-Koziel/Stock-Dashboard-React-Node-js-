import React, { useEffect, useState } from "react";

import './DashboardTrending.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import translate from "../../../Translator/Translator";

const DashboardTrending = ({currentActive, refs, colorMode, languageVersion}) => {

    const [trending, setTrending] = useState([]);
    const [isFetched, setIsFetched] = useState(false)

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/toplist`).then(res => res.json())
        .then(async data => 
            {
                setTrending(data);
                setIsFetched(true);
            }
        ).catch(err => console.log(err));
    }, []);

    return(
        <div className={`trending-container ${colorMode}`} ref={refs[1]['ref']}>
            <div className="header">
                <h1>{translate(languageVersion, 'Trendujące')} <FontAwesomeIcon icon={faTrophy} /> </h1>
            </div>
            <div className="slider">

                {!isFetched ? (
                    <div className="waiting">
                        <h1>{translate(languageVersion, 'Oczekiwanie na dane')}...</h1>
                    </div>
                ) : (

                    trending.map((coin) => (
                        <div className="trendig-card" key={coin.id}>
                            <div className="image-frame" >
                                <img src={coin.large} alt={coin.name} />
                            </div>
                            <div className="text">
                                <h1>{coin.name} ({coin.symbol})</h1>
                                <h2>{translate(languageVersion, 'Cena')}: {coin.price > 0.01 ? coin.price.toFixed(2) : coin.price.toFixed(4)}$ </h2>
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