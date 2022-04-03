import React, { useContext, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { storeContext } from "components/provider/Provider";
import Paper from "@mui/material/Paper";
import { useMediaQuery } from "react-responsive";
import Map from "components/maps/Map";
import { layoutActions } from "store/layout-reducer";
import axios from "axios";
import { mapsActions } from "store/maps-reducer";
import { useParams } from "react-router-dom";
import { eventsActions } from "store/events-reducer";
import NewEventForm from "components/events/NewEventForm";
import Marker from "components/maps/Marker";
import SwipeableEventForm from "components/events/SwipeableEventForm";

const { REACT_APP_SITE_URL } = process.env;
const NewEvent = () => {
  const { placeId } = useParams();
  const { state, dispatch } = useContext(storeContext);
  const isPhone = useMediaQuery({ query: "(max-width: 768px)" });
  const [center, setCenter] = useState({
    lat: state.maps.selectedPlace.lat,
    lng: state.maps.selectedPlace.lng,
  });
  const [places, setPlaces] = useState(state.maps.myPlaces);
  const [eventPlace, setEventPlace] = useState(state.maps.selectedPlace);

  useEffect(() => {
    if (!placeId) {
      axios.get(`${REACT_APP_SITE_URL}/api/me/places/`).then((res) => {
        dispatch({
          type: mapsActions.MAPS_SET_ALL,
          payload: {
            myPlaces: res.data,
          },
        });
        setPlaces(res.data);
      });
    } else {
      axios.get(`${REACT_APP_SITE_URL}/api/me/places/`).then((res) => {
        dispatch({
          type: mapsActions.MAPS_SET_ALL,
          payload: {
            myPlaces: res.data,
          },
        });
        setPlaces(res.data);
      });
      axios.get(`${REACT_APP_SITE_URL}/api/places/${placeId}`).then((res) => {
        dispatch({
          type: eventsActions.EVENTS_SET_ALL,
          payload: {
            eventPlace: res.data,
          },
        });
        setEventPlace(res.data);
        setCenter({ lat: res.data.lat, lng: res.data.lng });
      });
    }
  }, []);

  useEffect(() => {
    dispatch({
      type: layoutActions.LAYOUT_SET_ALL,
      payload: {
        pageTitle: "Add New Event",
      },
    });
  }, []);

  return (
    <Grid container spacing={3} sx={{ height: "100%" }}>
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
            <NewEventForm place={eventPlace} />
          </Paper>
        </Grid>
      ) : (
        <SwipeableEventForm place={eventPlace} />
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
          <Map lng={center.lng} zoom={14} lat={center.lat}>
            {places.map((place) => (
              <Marker
                key={place.id}
                lat={place.lat}
                lng={place.lng}
                handleClick={() => {
                  setEventPlace(place);
                  setCenter({ lat: place.lat, lng: place.lng });
                  dispatch({
                    type: eventsActions.EVENTS_SET_ALL,
                    payload: {
                      newEventForm: true,
                    },
                  });
                }}
              />
            ))}
          </Map>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default NewEvent;
