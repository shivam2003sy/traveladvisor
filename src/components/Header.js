import React, { useState } from "react";

import { Button, Select, MenuItem, InputBase, Stack, Grid ,Typography } from "@mui/material";
import { Search, CalendarToday } from "@mui/icons-material";
import MapboxAutocomplete from "react-mapbox-autocomplete";

import {  useDispatch } from 'react-redux'
import {setLocations} from '../store/actions/locationActions'



import "./Header.css"
const mapAccess = {
  mapboxApiAccessToken: "pk.eyJ1Ijoiam9uc2VuIiwiYSI6IkR6UU9oMDQifQ.dymRIgqv-UV6oz0-HCFx1w",
};

const Header = () => {
  const dispatch = useDispatch()
  const [selectedOption, setSelectedOption] = useState(0);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  function _suggestionSelect(result, lat, long, text) {
    const latitude = parseFloat(lat).toFixed(4);
    const longitude = parseFloat(long).toFixed(4);
  
    if (isNaN(latitude) || isNaN(longitude)) {
      console.error('Invalid latitude or longitude provided.');
      return; 
    }
  
    console.log(latitude, longitude);
  
    dispatch(setLocations({
      lat: latitude,
      lng: longitude,
    }));
  }
  return (
      <Grid container spacing={1} alignItems="center" m={0.00001}>
        <Grid item xs={2} >
          <Button
            variant="outlined"
            style={{
              border: "2px solid #000000",
              padding: "6px",
              minWidth: "120px",
              borderRadius: "20px",
              textAlign: "center",
              color: "black",
             }}
            startIcon={<CalendarToday />}
          >
            Enter Dates
          </Button>
        </Grid>
        <Grid item xs={7} >
          <Stack direction="row" alignItems="center" spacing={1} 
          style={{
            flexBasis: "100%",
            outline: "none",
            boxShadow: "5px 5px 5px 5px rgba(0.5, 0, 0, 0.2)",
            borderRadius: "10px",
          }}
          >
            <Search style={{ margin: "2px" }} />
            <MapboxAutocomplete
              publicKey={mapAccess.mapboxApiAccessToken}
              inputClass="form-control w-100"
              onSuggestionSelect={_suggestionSelect}
              resetSearch={false}
              placeholder="Where to?"
              style={{ flexBasis: "100%", outline: "none", boxShadow: "none" }}
            />
          </Stack>
        </Grid>
        {/* 4-column section */}
        <Grid item xs={3} >
          <Stack direction="row">
            <Typography style={{ 
              margin: "5px",  
            border: "1px solid grey",
            padding: "2px",
            borderRadius: "20px",
            minWidth: "70px",
            textAlign: "center",
            }}>
              Filter
            </Typography>
            <Select
            style={{
              border: "2px solid #000000",
              padding: "2px",
              minWidth: "120px",
              borderRadius: "20px",
              textAlign: "center",
            }}
              value={selectedOption}
              onChange={handleOptionChange}
              input={<InputBase style={{ border: "2px solid #000000", padding: "2px", minWidth: "70px" }} />}
            >
              <MenuItem value="0">Attractions</MenuItem>
              <MenuItem value="1">One</MenuItem>
              <MenuItem value="2">Two</MenuItem>
              <MenuItem value="3">Three</MenuItem>
            </Select>
          </Stack>
        </Grid>
      </Grid>
  );
};

export default Header;
