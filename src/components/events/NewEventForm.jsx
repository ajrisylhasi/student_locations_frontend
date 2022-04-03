import Avatar from "@mui/material/Avatar";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React, { useContext, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { layoutActions } from "store/layout-reducer";
import { useHistory } from "react-router-dom";
import { storeContext } from "components/provider/Provider";
import { MenuItem } from "@mui/material";
import { eventsActions } from "store/events-reducer";
import DateTimePicker from "@mui/lab/DateTimePicker";
import DateAdapter from "@mui/lab/AdapterDateFns";
import { LocalizationProvider } from "@mui/lab";

const { REACT_APP_SITE_URL } = process.env;

const NewEventForm = ({ place }) => {
  const history = useHistory();
  const { state, dispatch } = useContext(storeContext);
  const today = new Date();
  const [eventTime, setEventTime] = useState(
    new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
  );
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      event: {
        name: formData.get("name"),
        place_id: formData.get("place"),
        time: eventTime,
      },
    };
    axios
      .post(`${REACT_APP_SITE_URL}/api/events/`, data)
      .then((res) => {
        if (res.status === 200) {
          history.push("/");
          dispatch({
            type: layoutActions.LAYOUT_SET_ALL,
            payload: {
              openMessage: true,
              error: false,
              signalMessage: "Added New Event!",
            },
          });
          dispatch({
            type: eventsActions.EVENTS_SET_ALL,
            payload: {
              newEventForm: false,
            },
          });
        }
      })
      .catch(() => {
        dispatch({
          type: layoutActions.LAYOUT_SET_ALL,
          payload: {
            openMessage: true,
            error: true,
            signalMessage:
              "Something went wrong! Please try again. Make sure that the Place and Name aren't empty.",
          },
        });
      });
  };
  return (
    <>
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <AddLocationAltIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Add New Event
      </Typography>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{ mt: 3 }}
        key={place.id}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="place"
              label="Place"
              select
              defaultValue={place.id ?? ""}
              name="place"
              autoComplete="place"
            >
              <MenuItem value="">Select Place</MenuItem>
              {state.maps.myPlaces.map((loopedPlace) => (
                <MenuItem value={loopedPlace.id} key={loopedPlace.id}>
                  {loopedPlace.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={DateAdapter}>
              <DateTimePicker
                id="time"
                label="Event Time"
                name="time"
                autoComplete="time"
                value={eventTime}
                onChange={(newTime) => setEventTime(newTime)}
                required
                renderInput={(params) => <TextField fullWidth {...params} />}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Add Event
        </Button>
      </Box>
    </>
  );
};

NewEventForm.propTypes = {
  place: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
};

NewEventForm.defaultProps = {
  place: null,
};

export default NewEventForm;
