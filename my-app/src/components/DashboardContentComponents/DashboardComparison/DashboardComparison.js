import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PopUp from "../../Alerts/PopUpAlert/PopUp";

import './DashboardComparison.css'
import { faScaleBalanced, faSearch } from "@fortawesome/free-solid-svg-icons";
import CryptoChart from "../../StyleComponents/Chart/Chart";

import translate from "../../../Translator/Translator";

const DashboardComparison = ({currentActive, refs, colorMode, languageVersion}) => {

    const [searchSwitch, setSearchSwitch] = useState('first');

    const [coins, setCoins] = useState([]);
    
    const [cryptoResults, setCryptoResults] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [isPopUpDisplayed, setIsPopUpDisplayed] = useState(false);
    
    
    const searchBarRef = useRef(null);
    const submBtn = useRef(null);

    const [firstCoin, setFirstCoin] = useState(null);
    const [secondCoin, setSecondCoin] = useState(null)

    const [firstCoinLabel, setFirstCoinLabel] = useState('Wyszukaj pierwszego coina');
    const [secondCoinLabel, setSecondCoinLabel] = useState('Wyszukaj drugiego coina');

    const [firstChartData, setFirstChartData] = useState([]);
    const [secondChartData, setSecondChartData] = useState([]);
    
    const handleClick = (e) => {
        if(searchBarRef.current && !searchBarRef.current.contains(e.target) && !submBtn.current.contains(e.target))
        {
            setCryptoResults([]);
        }
    }

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/coinlist`)
        .then(res => res.json())
        .then(data => {setCoins(data);})
        .catch(err => console.error(err));

        document.addEventListener('click', handleClick);

        return () => {document.removeEventListener('click', handleClick)}
    }, [])
    
    const filterResults = async (target) => {
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

            return limited;
        }

    const handleHintUse = (coin) => {
        setInputValue(`(${coin.symbol.toUpperCase()}) ${coin.name}`);
        
        if (searchSwitch === 'first') {
            setFirstCoin(coin);
            setFirstCoinLabel(`(${coin.symbol.toUpperCase()}) ${coin.name}`);
            setSearchSwitch('second');
            setInputValue(secondCoin ? `(${secondCoin.symbol.toUpperCase()}) ${secondCoin.name}` : '');
        } else {
            setSecondCoin(coin);
            setSecondCoinLabel(`(${coin.symbol.toUpperCase()}) ${coin.name}`);
            setSearchSwitch('first');
        }

        setCryptoResults([]); 
    };

    const compare = async () => {
        let selectedFirstCoin = firstCoin;
        let selectedSecondCoin = secondCoin;

        if (!selectedFirstCoin || !selectedSecondCoin) {
            const lowerTarget = inputValue.toLowerCase();
            const filtered = coins.filter(coin =>
                coin.name.toLowerCase().includes(lowerTarget) ||
                coin.symbol.toLowerCase().includes(lowerTarget)
            );

            if (filtered.length === 0) {
                setIsPopUpDisplayed(true);
                return;
            }

            const coin = filtered[0];

            if (!selectedFirstCoin) {
                selectedFirstCoin = coin;
                setFirstCoin(coin);
                setFirstCoinLabel(`(${coin.symbol.toUpperCase()}) ${coin.name}`);
            }

            if (!selectedSecondCoin) {
                selectedSecondCoin = coin;
                setSecondCoin(coin);
                setSecondCoinLabel(`(${coin.symbol.toUpperCase()}) ${coin.name}`);
            }
        }

        try {
            const firstChartRes = await fetch(`${process.env.REACT_APP_API_URL}/chartData?searchedCoin=${encodeURIComponent(selectedFirstCoin.id)}`);
            const firstChartRecievedData = await firstChartRes.json();

            if (firstChartRes.status !== 200) {
                setIsPopUpDisplayed(true);
                return;
            }

            setFirstChartData(firstChartRecievedData.chartData);

            if (selectedFirstCoin.id !== selectedSecondCoin.id) {
                const secondChartRes = await fetch(`${process.env.REACT_APP_API_URL}/chartData?searchedCoin=${encodeURIComponent(selectedSecondCoin.id)}`);
                const secondChartRecievedData = await secondChartRes.json();

                if (secondChartRes.status !== 200) {
                    setIsPopUpDisplayed(true);
                    return;
                }

                setSecondChartData(secondChartRecievedData.chartData);
            } 
            else {
                setSecondChartData(firstChartRecievedData.chartData);
            }

        } catch (err) {
            console.error(err);
            setIsPopUpDisplayed(true);
        }
    };

    
    return (
        <div className={`comparison-container ${colorMode}`} ref={refs[3]['ref']}>
            <div className="header">
                <h1>{translate(languageVersion, 'Porównania')} <FontAwesomeIcon icon={faScaleBalanced} /> </h1>
            </div>

            <form onSubmit={(e) => e.preventDefault()}>
                <div className="search-bar" ref={searchBarRef}>
                    <FontAwesomeIcon icon={faSearch} className="search-icon" />
                    <input type="text" className="search-bar" placeholder={`${translate(languageVersion, `${searchSwitch === 'first' ? 'Wpisz nazwę pierwszej kryptowaluty' : 'Wpisz nazwę drugiej kryptowaluty'}`)}..`} value={inputValue} onChange={(change) => {filterResults(change.target.value.toLowerCase());}} onClick={(change) => filterResults(change.target.value.toLowerCase())}/>
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

                
                <button type="submit" value={'Compare'} className="subm-btn" onClick={compare} ref={submBtn}> {translate(languageVersion, 'Porównaj')} </button>
            </form>

            <div className="rows">
                <div className="row" onClick={ () => { setSearchSwitch('first'); setInputValue(firstCoin ? `(${firstCoin.symbol.toUpperCase()}) ${firstCoin.name}` : '')} }>
                    <h2 className="coin-name">{translate(languageVersion, firstCoinLabel)}</h2>

                    {firstChartData.length > 0 ? (
                        <>
                            <CryptoChart chartData={firstChartData} colorMode={colorMode} />
                            <div className="text">
                                <h2>{translate(languageVersion, 'Aktualna cena')}: {firstChartData[firstChartData.length - 1].price > 0.01 ? firstChartData[firstChartData.length - 1].price.toFixed(2) : firstChartData[firstChartData.length - 1].price.toFixed(4)} USD</h2>
                            </div>
                        </>
                        
                        
                    ) : <></>}

                    
                </div>

                <div className="row" onClick={ () => { setSearchSwitch('second'); setInputValue(secondCoin ? `(${secondCoin.symbol.toUpperCase()}) ${secondCoin.name}` : '')} }>
                    <h2 className="coin-name">{translate(languageVersion, secondCoinLabel)}</h2>

                    {secondChartData.length > 0 ? (                        
                        <>
                            <CryptoChart chartData={secondChartData} colorMode={colorMode}/>
                            <div className="text">
                                <h2>{translate(languageVersion, 'Aktualna cena')}: {secondChartData[secondChartData.length - 1].price > 0.01 ? secondChartData[secondChartData.length - 1].price.toFixed(2) : secondChartData[secondChartData.length - 1].price.toFixed(4)} USD</h2>
                            </div>
                        </>
                    ) : <></>}
                </div>
            </div>

            <PopUp text={"Przekroczono limit wywołań API. Proszę zaczekać i spróbować ponownie później"} isPopUpDisplayed={isPopUpDisplayed} setIsPopUpDisplayed={setIsPopUpDisplayed} colorMode={colorMode} languageVersion={languageVersion}/>
        </div>
    )
}

export default DashboardComparison;