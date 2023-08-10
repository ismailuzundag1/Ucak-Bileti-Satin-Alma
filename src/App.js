import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import FlightResultsPage from './components/FlightResultsPage';
import PassengerInfoPage from './components/PassengerInfoPage';
import PaymentPage from './components/PaymentPage';
import ConfirmationPage from './components/ConfirmationPage';

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/flight-results" component={FlightResultsPage} />
          <Route path="/passenger-info" component={PassengerInfoPage} />
          <Route path="/payment" component={PaymentPage} />
          <Route path="/confirmation" component={ConfirmationPage} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;