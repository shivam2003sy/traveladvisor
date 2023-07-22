const defaultMapState = {
  mapStyle: 'mapbox://styles/mapbox/streets-v11',
  viewState: {
    latitude: 25.4502,
    longitude: 78.5698,
    zoom: 10
  }
};

function mapStateReducer(state = defaultMapState, action) {
  switch (action.type) {
    case 'setViewState':
      return {...state, viewState: action.payload};
    default:
      return state;
  }
}
  
  export default mapStateReducer;
  