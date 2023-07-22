import React, { useState, useEffect, createRef } from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import PlaceDetails from './PlaceDetails';



const ListComponent = ({ places, childClicked, isLoading }) => {
    const [elRefs, setElRefs] = useState([]);

    useEffect(() => {
        setElRefs((refs) => Array(places?.length).fill().map((_, i) => refs[i] || createRef()));
    }, [places]);


    return (
        <div >
          <Typography variant="p">{places.length} places sorted by traveler Faviroites</Typography>
          {isLoading ? (
            <div >
              <CircularProgress size="5rem" />
            </div>
          ) : (
            <>
              
              <Grid container spacing={3} >
                {places?.map((place, i) => (
                  <Grid ref={elRefs[i]} key={i} item xs={12}>
                    <PlaceDetails selected={Number(childClicked) === i} refProp={elRefs[i]} place={place} />
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </div>
      );
    };

export default ListComponent;
    