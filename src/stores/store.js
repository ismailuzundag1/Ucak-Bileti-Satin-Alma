import { createStore, combineReducers } from 'redux';
import flightResultsReducer from '../reducers/flightResultsReducer';

// Root reducer oluştur
const rootReducer = combineReducers({
  flightResults: flightResultsReducer,
});

// Redux store oluştur
const store = createStore(rootReducer);

export default store;