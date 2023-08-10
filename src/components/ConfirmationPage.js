import React, { useEffect, useState } from 'react';
import '../styles/confirmation.scss';
import { Link, useLocation } from 'react-router-dom';

const ConfirmationPage = () => {
  const location = useLocation();
  const [reservationNumber, setReservationNumber] = useState('');
  const { selectedFlight, passengers } = location.state;

  // Rastgele rezervasyon numarası oluşturma fonksiyonu
  const generateReservationNumber = () => {
    const randomNum = Math.floor(100000000 + Math.random() * 900000000); // 9 haneli rastgele numara
    setReservationNumber(randomNum.toString());
  };

  // Sayfa yüklendiğinde rastgele rezervasyon numarası oluştur
  useEffect(() => {
    generateReservationNumber();
  }, []);

  return (
    <div className='conf-container'>
      <div className='confirmation-container'>
        <h2>Ödeme Onayı</h2>
        <p>Seçilen Uçuş Bilgisi: {selectedFlight.airline}, Kalkış Saati: {selectedFlight.depTime} Fiyat: {selectedFlight.priceDetail.basePrice.amount} {selectedFlight.priceDetail.basePrice.currency}</p>
      <h3>Yolcu Bilgileri:</h3>
      <ul>
        {passengers.map((passenger, index) => (
          <li key={index}>
            Ad Soyad: {passenger.name}, Doğum Tarihi: {passenger.birthDate}, İletişim: {passenger.contact}
          </li>
        ))}
      </ul>
        <p>Bilet satın alımı başarıyla tamamlandı.</p>
        <p>Rezervasyon numaranız: {reservationNumber}</p>
          
        <Link to="/">Ana Sayfaya Dön</Link>
      </div>
    </div>
  );
};

export default ConfirmationPage;