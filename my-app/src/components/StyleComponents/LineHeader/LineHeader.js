import React from "react";
import './LineHeader.css'

const LineHeader = ({ text, colorMode }) => {
    return (
        <div className={`line-header ${colorMode}`}>
            <h3>{text}</h3>
        </div>
    );
}

export default LineHeader;