import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import './DashboardHome.css'

const DashboardHome = ({currentActive}) => {
    return (
        <div className={`home-container ${currentActive === 1 ? 'shown' : 'hidden'}`}>
            <div className="long-news">
                <div className="news-overlay">
                    <h1>Stock analysis news</h1>
                    <div className="btn">Click for more</div>
                </div>
            </div>

            <div className="stats-container">
                <h1>Account status: </h1>
                <h2>Net worth: 0$</h2>
                <h2>Spare money: 0$</h2>
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
                        <h1>Bitcoin crush news</h1>

                    </div>
                </article>

                <article className="second-article">
                    <div className="news-overlay">
                        <h1>New groundbreaking crypto incomming</h1>
                    </div>
                </article>
            </div>
        </div>

        
    );
}

export default DashboardHome;