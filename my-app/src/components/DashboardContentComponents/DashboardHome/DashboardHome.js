import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './DashboardHome.css'
import translate from "../../../Translator/Translator";

const DashboardHome = ({currentActive, refs, colorMode, languageVersion}) => {
    return (
        <div className={`home-container ${colorMode}`} ref={refs[0]['ref']}>
            <div className="long-news">
                <div className="news-overlay">
                    <h1>{translate(languageVersion, 'Analizy wykresów kryptowalut')}</h1>
                    <div className="btn">{translate(languageVersion, 'kliknij po więcej')}</div>
                </div>
            </div>

            <div className="stats-container">
                <h1>{translate(languageVersion, 'Status konta')}: </h1>
                <h2>{translate(languageVersion, 'Wartość netto')}: 0$</h2>
                <h2>{translate(languageVersion, 'Pozostałe fundusze')}: 0$</h2>
                <div className="stars">
                    <FontAwesomeIcon icon={faStar} className="unactive-star" />
                    <FontAwesomeIcon icon={faStar} className="unactive-star" />
                    <FontAwesomeIcon icon={faStar} className="unactive-star" />
                    <FontAwesomeIcon icon={faStar} className="unactive-star" />
                    <FontAwesomeIcon icon={faStar} className="unactive-star" />
                </div>
            </div>

            <div className="dual-container">
                <article>
                    <div className="news-overlay">
                        <h1>{translate(languageVersion, 'Nowości o spadku bitcoina')}</h1>

                    </div>
                </article>

                <article className="second-article">
                    <div className="news-overlay">
                        <h1>{translate(languageVersion, 'Nowe nadchodzące kryptowaluty')}</h1>
                    </div>
                </article>
            </div>
        </div>

        
    );
}

export default DashboardHome;