import React, { useContext, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { storeContext } from "components/provider/Provider";
import Paper from "@mui/material/Paper";
import { useMediaQuery } from "react-responsive";
import Map from "components/maps/Map";
import { layoutActions } from "store/layout-reducer";
import SwipeablePlaceForm from "components/places/SwipeablePlaceForm";
import NewPlaceForm from "components/places/NewPlaceForm";
import axios from "axios";
import { useParams } from "react-router-dom";
import { mapsActions } from "store/maps-reducer";
import Loader from "shared/components/Loader";

const { REACT_APP_SITE_URL } = process.env;

const EditPlace = () => {
  const { id } = useParams();
  const { dispatch } = useContext(storeContext);
  const isPhone = useMediaQuery({ query: "(max-width: 768px)" });
  const [place, setPlace] = useState({});
  const [center, setCenter] = useState({ lat: 47.5399565, lng: 21.6286541 });
  const [isFetching, setFetched] = useState(true);

  const loadMap = (map, maps) => {
    const marker = new maps.Marker({
      position: center,
      map,
      draggable: true,
    });

    marker.addListener("dragend", (event) => {
      setCenter({
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      });
      dispatch({
        type: mapsActions.MAPS_SET_ALL,
        payload: {
          newPlaceForm: true,
        },
      });
    });
  };

  useEffect(() => {
    dispatch({
      type: layoutActions.LAYOUT_SET_ALL,
      payload: {
        pageTitle: "Edit Place",
      },
    });
  }, []);

  useEffect(() => {
    axios.get(`${REACT_APP_SITE_URL}/api/places/${id}`).then((res) => {
      if (res.status === 200) {
        dispatch({
          type: mapsActions.MAPS_SET_ALL,
          payload: {
            editPlace: res.data,
          },
        });
        setPlace(res.data);
        setCenter({ lat: res.data.lat, lng: res.data.lng });
        setFetched(false);
      }
    });
  }, []);

  return (
    <Grid container spacing={3} sx={{ height: "100%" }}>
      {!isFetching ? (
        <>
          {!isPhone ? (
            <Grid item xs={12} md={5} xl={5}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  alignItems: "center",
                  margin: "auto",
                }}
              >
                <NewPlaceForm center={center} place={place} />
              </Paper>
            </Grid>
          ) : (
            <SwipeablePlaceForm place={place} center={center} />
          )}
          <Grid item xs={12} md={7} xl={7}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <Map
                lng={center.lng}
                zoom={14}
                lat={center.lat}
                onGoogleApiLoaded={({ map, maps }) => loadMap(map, maps)}
                yesIWantToUseGoogleMapApiInternals
              />
            </Paper>
          </Grid>
        </>
      ) : (
        <Loader />
      )}
    </Grid>
  );
};

export default EditPlace;
