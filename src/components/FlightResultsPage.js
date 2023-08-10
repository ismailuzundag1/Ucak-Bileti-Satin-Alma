//import React from 'react';
import { useSelector } from 'react-redux';
import '../styles/flight-results.scss';
import { useHistory } from 'react-router-dom';
import React, { useState } from 'react';


const FlightResultsPage = () => {
  const [selectedFlight, setSelectedFlight] = useState(null);
  const flightResults = useSelector((state) => state.flightResults);
  const history = useHistory();

  const handleSelectFlight = (flight) => {

    setSelectedFlight(flight);
    // Seçilen uçuşa göre yolcu bilgileri sayfasına yönlendir
    history.push({
      pathname:'/passenger-info',
      state: {selectedFlight: flight}
  });
};

  return (
    <div className='bg-container'>
    <div className='flight-results-page'>
      <h2>Uçuş Sonuçları</h2>
      {flightResults.length === 0 ? (
        <p>Uçuş Bulunamadı</p>
      ) : (
        <div className='flight-card'>
        <ul>
          {flightResults.map((flight, index) => (
            <li key={index}>
              
              Kalkış Saati: {flight.depTime}, Varış Saati: {flight.arrTime}, Havayolu: {flight.airline}, Fiyat: {flight.priceDetail.basePrice.amount + " " + flight.priceDetail.basePrice.currency}
              <button onClick={() => handleSelectFlight(flight)}>Seç</button>
           </li>
          ))}
        </ul>
       
        </div>
      )}
    </div>
    </div>
  );
};

export default FlightResultsPage;