// store/reducers/locationReducer.js
const initialState = {
    locations: {
      lat: 0,
      long: 0,
    },
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
  