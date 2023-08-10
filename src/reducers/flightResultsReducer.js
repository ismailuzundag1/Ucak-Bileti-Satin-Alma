const flightResultsReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_FLIGHT_RESULTS':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default flightResultsReducer;