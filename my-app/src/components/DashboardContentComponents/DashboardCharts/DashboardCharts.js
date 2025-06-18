import React, { useEffect, useRef, useState } from "react";

import './DashboardCharts.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartColumn, faSearch } from "@fortawesome/free-solid-svg-icons";
import CryptoChart from "../../StyleComponents/Chart/Chart";
import PopUp from "../../Alerts/PopUpAlert/PopUp";

const DashboardCharts = ({currentActive, refs}) => {

    const [coins, setCoins] = useState([]);

    const [cryptoResults, setCryptoResults] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [chartData, setChartData] = useState([]);
    const [isPopUpDisplayed, setIsPopUpDisplayed] = useState(false)

    const searchBarRef = useRef(null);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/coinlist`)
        .then(res => res.json())
        .then(data => {setCoins(data);})
        .catch(err => console.error(err));

        document.addEventListener('mousedown', handleClick);

        return () => {document.removeEventListener('mousedown', handleClick)}
    }, [])

    const filterResults = (target) => {
        setInputValue(target);
        const lowerTarget = target.toLowerCase();

        const filtered = coins.filter(coin => 
            coin.name.toLowerCase().includes(lowerTarget) || 
            coin.symbol.toLowerCase().includes(lowerTarget)
        );

        filtered.sort((a, b) => {
            const aName = a.name.toLowerCase();
            const aSymbol = a.symbol.toLowerCase();
            const bName = b.name.toLowerCase();
            const bSymbol = b.symbol.toLowerCase();

            const aStarts = aName.startsWith(lowerTarget) || aSymbol.startsWith(lowerTarget);
            const bStarts = bName.startsWith(lowerTarget) || bSymbol.startsWith(lowerTarget);

            if (aStarts && !bStarts) return -1;
            if (!aStarts && bStarts) return 1;
            return 0;
        });

        const limited = filtered.slice(0, 8);

        setCryptoResults(limited);
    }

    const createChart = async (e, coin) => {
        e.preventDefault();

        if(!coin)
        {
            filterResults(inputValue);
            coin = cryptoResults[0];
            setInputValue(`(${coin.symbol.toUpperCase()}) ${coin.name}`);
        }

        try
        {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/chartData?searchedCoin=${encodeURIComponent(coin.id)}`);
            const data = await res.json();
            if(res.status !== 200)
            {
                setIsPopUpDisplayed(true);
            }
            else
            {
                setChartData(data.chartData);
            }
        }
        catch(err)
        {
            console.log(err);
            return;
        }
    }

    const handleHintUse = (coin) => {
        setInputValue(`(${coin.symbol.toUpperCase()}) ${coin.name}`);
        createChart({ preventDefault: () => {}}, coin);
    }

    const handleClick = (e) => {
        if(searchBarRef.current && !searchBarRef.current.contains(e.target))
        {
            setCryptoResults([]);
        }
    }

    return (
        <div className="charts-container" ref={refs[2]['ref']}>
            <div className="header">
                <h1>Charts <FontAwesomeIcon icon={faChartColumn} /> </h1>
            </div>

            <form onSubmit={(e) => {createChart(e)}} ref={searchBarRef}>
                <div className="search-bar">
                    <FontAwesomeIcon icon={faSearch} className="search-icon" />
                    <input type="text" className="search-bar" placeholder="Enter crypto name.." value={inputValue} onChange={(change) => {filterResults(change.target.value.toLowerCase());}} onClick={(change) => filterResults(change.target.value.toLowerCase())}/>
                </div>

                {cryptoResults.length > 0 ? (
                    <div className="hints">
                        {cryptoResults.map((coin) => (
                            <div className="hint" key={coin.id} onClick={() => {handleHintUse(coin)}}>
                                ({coin.symbol.toUpperCase()}) {coin.name}
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                    </>
                )}
            </form>
            
            {chartData.length > 0 ? (<CryptoChart chartData={chartData} />) : (<h2 className="shadow-text">Search a coin to see its chart</h2>)}
            
            <PopUp text={"API Calls limit exceeded, please wait and try again later"} isPopUpDisplayed={isPopUpDisplayed} setIsPopUpDisplayed={setIsPopUpDisplayed}/>
        </div>
    );
}   

export default DashboardCharts;