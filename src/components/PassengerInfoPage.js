import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import '../styles/passenger-info.scss';

const PassengerInfoPage = () => {
  const [passengers, setPassengers] = useState([{ name: '', birthDate: '', contact: '' }]);

  const history = useHistory();
  const location = useLocation();
  const selectedFlight = location.state.selectedFlight;

  const handleAddPassenger = () => {
    setPassengers([...passengers, { name: '', birthDate: '', contact: '' }]);

  };
  const handleRemovePassenger = (index) => {
    const updatedPassengers = passengers.filter((_, i) => i !== index);
    setPassengers(updatedPassengers);
  };

  const handleContinue = () => {
    // Burada yolcu bilgilerini işleme veya API'ye gönderme işlemleri gerçekleştirilecek.

    // Ödeme sayfasına yönlendir.
    history.push('/payment', {
      selectedFlight:selectedFlight,
      passengers:passengers
    });
  };

  return (
    <div className='bg-pass-container'>
    <div className='pas-container'>
      <h2>Yolcu Bilgileri</h2>
      <div className='selected-flight-info'>
      <p>
    Seçilen Uçuş Bilgisi: Kalkış Saati: {selectedFlight.depTime}, Varış Saati: {selectedFlight.arrTime}, Havayolu: {selectedFlight.airline}, Fiyat: {selectedFlight.priceDetail.basePrice.amount} {selectedFlight.priceDetail.basePrice.currency}
  </p>
  </div>
  <div className='pas-info'>
      {passengers.map((passenger, index) => (
        <div className='passenger-input-group' key={index}>
          <label>Ad Soyad</label>
          <input
            type="text"
            placeholder="Ad Soyad"
            value={passenger.name}
            onChange={(e) =>
              setPassengers(
                passengers.map((p, i) =>
                  i === index ? { ...p, name: e.target.value } : p
                )
              )
            }
          />
          <label>Doğum Tarihi</label>
          <input
            type="date"
            value={passenger.birthDate}
            onChange={(e) =>
              setPassengers(
                passengers.map((p, i) =>
                  i === index ? { ...p, birthDate: e.target.value } : p
                )
              )
            }
          />
        <label>İletişim </label>
          <input
            type="text"
            placeholder="İletişim Bilgisi"
            value={passenger.contact}
            onChange={(e) =>
              setPassengers(
                passengers.map((p, i) =>
                  i === index ? { ...p, contact: e.target.value } : p
                )
              )
            }
          />
           <button onClick={handleAddPassenger}>Yolcu Ekle
          </button>
          <button onClick={() => handleRemovePassenger(index)}>Yolcu Sil</button>
         
         
          <button onClick={handleContinue}>Devam Et</button>
        </div>
       
      ))}
       
          
        </div>
      </div>
    </div>
    
    
  );
};

export default PassengerInfoPage;