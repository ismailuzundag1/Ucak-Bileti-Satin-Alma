import React, {useState} from 'react';
import data from '../data/destination.json';

const FlightSelectComponent = ({value, onChange}) => {
    const options = data.ports.map((port) => (
        <option key={port.code} value={port.code}>
            {port.explanation}
        </option>
    ));

    return (
        <div>
            <select value={value} onChange={onChange}>
                <option value="">Havaalanı seçimi</option>
                {options}
            </select>
        </div>
    );
};


export default FlightSelectComponent;
