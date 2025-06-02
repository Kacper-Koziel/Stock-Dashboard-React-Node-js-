import React from "react";
import './LineHeader.css'

const LineHeader = ({ text }) => {
    return (
        <div className="line-header">
            <h3>{text}</h3>
        </div>
    );
}

export default LineHeader;