import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setFlightResults } from '../reducers/actions';
import '../styles/main.scss';
import FlightSelectComponent from "./FlightSelectComponent";
import searchData from '../data/search.json';


const HomePage = () => {
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [passengerCount, setPassengerCount] = useState(1);
  const [tripType, setTripType] = useState('oneWay');
  const [returnDate, setReturnDate] = useState('');
  const [multiFlights, setMultiFlights] = useState([{ departure: '', destination: '', date: '' }]);

  const history = useHistory();
  const dispatch = useDispatch();


  const handleDepartureValue = (event) => {
    setDeparture(event.target.value);
  };

  const handleDestinationValue = (event) => {
    setDestination(event.target.value);
  };

  const handleSearch = () => {
    // Direkt sonuç bulunamadı işlemi için kontrol ekleniyor.

    if (departure !== "DUS" && destination !== "AYT") {
      alert("Bu seçimde herhangi bir uçuş bulunamadı!")
    } else {
      // Burada uçuş arama işlemleri gerçekleştirilecek (API çağrısı vb.).
      // Sonuçları redux state'e kaydedelim.

      const selectedFlightResults = searchData.departureLegs.filter(
          (flight) => flight.depPort === departure
      );

      dispatch(setFlightResults(selectedFlightResults));


      // Uçuş sonuçları sayfasına yönlendir.
      history.push('/flight-results');
    }
  };

  const handleAddFlight = () => {
    setMultiFlights([...multiFlights, { departure: '', destination: '', date: '' }]);
  };

  const handleRemoveFlight = (index) => {
    const updatedFlights = [...multiFlights];
    updatedFlights.splice(index, 1);
    setMultiFlights(updatedFlights);
  };

  const handleChangeFlight = (index, field, value) => {
    const updatedFlights = [...multiFlights];
    updatedFlights[index][field] = value;
    setMultiFlights(updatedFlights);
  };

  return (
    <div className='big-container'>
    <div className="home-page-container">
      <h2>Uçuş Arama</h2>
      <div className="trip-type-container">
        <label>
          <input
            type="radio"
            name="tripType"
            value="oneWay"
            checked={tripType === 'oneWay'}
            onChange={() => setTripType('oneWay')}
          />
          Tek Uçuş
        </label>
        <label>
          <input
            type="radio"
            name="tripType"
            value="roundTrip"
            checked={tripType === 'roundTrip'}
            onChange={() => setTripType('roundTrip')}
          />
          Gidiş-Dönüş
        </label>
        <label>
          <input
            type="radio"
            name="tripType"
            value="multiCity"
            checked={tripType === 'multiCity'}
            onChange={() => setTripType('multiCity')}
          />
          Çoklu Uçuş
        </label>
      </div>

      {tripType === 'multiCity' && (
        <>
          {multiFlights.map((flight, index) => (
            <div key={index} className="multi-flight-container">
              <FlightSelectComponent/>
              <FlightSelectComponent/>

              <label>
                Tarih:
                <input
                  type="date"
                  value={flight.date}
                  onChange={(e) => handleChangeFlight(index, 'date', e.target.value)}
                />
              </label>
              {index > 0 && (
                <button className="remove-flight-btn" onClick={() => handleRemoveFlight(index)}>
                  Uçuşu Sil
                </button>
              )}
            </div>
          ))}

          <button className="add-flight-btn" onClick={handleAddFlight}>
            Yeni Uçuş Ekle
          </button>
        </>
      )}

      {/* Diğer uçuş türleri için giriş alanları */}
      <FlightSelectComponent onChange={handleDepartureValue} value={departure}/>
      <FlightSelectComponent onChange={handleDestinationValue} value={destination}/>
      {/* Gidiş tarihi */}
      <label>
        Gidiş Tarihi:
        <input
          type="date"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
        />
      </label>
      {/* Dönüş tarihi - Sadece gidiş-dönüş seçeneği seçildiğinde göster */}
      {tripType === 'roundTrip' && (
        <label>
          Dönüş Tarihi:
          <input
            type="date"
            value={returnDate}
            min={departureDate ? new Date(new Date(departureDate).getTime() + 86400000).toISOString().split("T")[0] : ''}
            onChange={(e) => setReturnDate(e.target.value)}
          />
        </label>
      )}

      <input
        type="number"
        min="1"
        value={passengerCount}
        onChange={(e) => setPassengerCount(e.target.value)}
      />

      <button onClick={handleSearch}>Ara</button>

      <div className="image-container">
        {/* <img
          className="home-page-image"
          src="https://example.com/path/to/your/image.jpg" // Görüntü URL'sini buraya ekleyin
          alt="Görüntü"
        /> */}
      </div>
    </div>
    </div>
  );
};

export default HomePage;