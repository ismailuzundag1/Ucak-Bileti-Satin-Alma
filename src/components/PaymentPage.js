import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import '../styles/payment.scss';

const PaymentPage = () => {
  const location = useLocation();
  const { selectedFlight, passengers } = location.state;
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');

  const history = useHistory();

  const handlePayment = () => {
    // Burada ödeme işlemleri gerçekleştirilecek.

    // Onay sayfasına yönlendir.
    history.push('/confirmation',{
      selectedFlight:selectedFlight,
      passengers: passengers
    });
  };

  return (
    <div className='py-bg-container'>
    <div  className='py-container'>
      <h2>Ödeme Bilgileri</h2>
      <div className='py-pas'>
      <p>Seçilen Uçuş Bilgisi: {selectedFlight.airline}, Kalkış Saati: {selectedFlight.depTime} Fiyat: {selectedFlight.priceDetail.basePrice.amount} {selectedFlight.priceDetail.basePrice.currency}</p>
      
      <h3>Yolcu Bilgileri:</h3>
      <ul>
        {passengers.map((passenger, index) => (
          <li key={index}>
           <label> Ad Soyad: {passenger.name}, Doğum Tarihi: {passenger.birthDate}, İletişim: {passenger.contact}</label>
          </li>
          
        ))}
      </ul>
      </div>

      <input
        type="text"
        placeholder="Kredi Kartı Numarası"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
      />
      <input
        type="text"
        placeholder="Son Kullanma Tarihi (AA/YY)"
        value={expirationDate}
        onChange={(e) => setExpirationDate(e.target.value)}
      />
      <input
        type="text"
        placeholder="CVV"
        value={cvv}
        onChange={(e) => setCvv(e.target.value)}
      />
      <button onClick={handlePayment}>Ödeme Yap</button>
    </div>
    </div>
  );
};

export default PaymentPage;