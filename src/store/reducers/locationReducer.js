const initialState = {
  lat: 38.8951,
  lng:  -77.0364,
};


  const locationReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_LOCATIONS':
        return {
          locations: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default locationReducer;
  