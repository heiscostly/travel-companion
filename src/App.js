import React, { useState, useEffect } from "react";
import { CssBaseline, Grid } from "@material-ui/core";
import Header from "./components/Header/header";
import List from "./components/List/list";
import PlaceDetail from "./components/PlaceDetails/placeDetails";
import Map from "./components/Map/map";

import { getPlaceData } from "./api";

export default function App() {
  const [places, setPlaces] = useState([]);

  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  });

  useEffect(() => {
    console.log(coordinates, bounds, "hey guys");
    getPlaceData(bounds?.ne, bounds?.sw).then((data) => {
      console.log(data);
      setPlaces(data);
    });
  }, [coordinates, bounds]);

  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
          />
          console.log(bounds, 'helloo')
        </Grid>
      </Grid>
    </>
  );
}
