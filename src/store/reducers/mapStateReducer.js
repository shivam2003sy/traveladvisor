const defaultMapState = {
  mapStyle: 'mapbox://styles/mapbox/streets-v11',
  viewState: {
    latitude: 37.8,
    longitude: -122.4,
    zoom: 8
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
  