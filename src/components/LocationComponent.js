import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLocations } from './store/actions/locationActions';

const LocationComponent = () => {
  const locations = useSelector((state) => state.location.locations);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch locations from the API using Axios
    // For example:
    // axios.get('/api/locations').then((response) => {
    //   dispatch(setLocations(response.data));
    // });
  }, [dispatch]);

  return (
    <div>
      {/* Display locations from Redux state */}
      {locations.map((location) => (
        <div key={location.id}>{location.name}</div>
      ))}
    </div>
  );
};
