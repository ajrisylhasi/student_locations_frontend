import Avatar from "@mui/material/Avatar";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import React, { useContext } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { layoutActions } from "store/layout-reducer";
import { useHistory } from "react-router-dom";
import { storeContext } from "components/provider/Provider";
import { mapsActions } from "store/maps-reducer";
import { MenuItem } from "@mui/material";

const { REACT_APP_SITE_URL } = process.env;

const NewPlaceForm = ({ center, place }) => {
  const history = useHistory();
  const { state, dispatch } = useContext(storeContext);
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      place: {
        name: formData.get("name"),
        category: formData.get("category"),
        description: formData.get("description"),
        lng: center.lng,
        lat: center.lat,
        user_id: state.auth.user.id,
      },
    };
    if (place) {
      axios
        .patch(`${REACT_APP_SITE_URL}/api/places/${place?.id}`, data)
        .then((res) => {
          if (res.status === 200) {
            history.push("/");
            dispatch({
              type: layoutActions.LAYOUT_SET_ALL,
              payload: {
                openMessage: true,
                error: false,
                signalMessage: "Edited Place!",
              },
            });
            dispatch({
              type: mapsActions.MAPS_SET_ALL,
              payload: {
                newPlaceForm: false,
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
              signalMessage: "Something went wrong! Please try again.",
            },
          });
        });
    } else {
      axios
        .post(`${REACT_APP_SITE_URL}/api/places/`, data)
        .then((res) => {
          if (res.status === 200) {
            history.push("/");
            dispatch({
              type: layoutActions.LAYOUT_SET_ALL,
              payload: {
                openMessage: true,
                error: false,
                signalMessage: "Added New Place!",
              },
            });
            dispatch({
              type: mapsActions.MAPS_SET_ALL,
              payload: {
                newPlaceForm: false,
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
              signalMessage: "Something went wrong! Please try again.",
            },
          });
        });
    }
  };
  return (
    <>
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <AddLocationAltIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        {place ? "Edit Place" : "Add New Place"}
      </Typography>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{ mt: 3 }}
        key={place?.id}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="name"
              defaultValue={place?.name ?? ""}
              label="Name"
              name="name"
              autoComplete="name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="category"
              label="Category"
              select
              defaultValue={place?.category ?? ""}
              name="category"
              autoComplete="category"
            >
              <MenuItem value="" />
              <MenuItem value="Campus">Campus</MenuItem>
              <MenuItem value="Entertainment">Entertainment</MenuItem>
              <MenuItem value="Education Building">Education Building</MenuItem>
              <MenuItem value="Food & Drinks">Food & Drinks</MenuItem>
              <MenuItem value="Library">Library</MenuItem>
              <MenuItem value="Living Building">Living Building</MenuItem>
              <MenuItem value="Transportation">Transportation</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="description"
              label="Description"
              defaultValue={place?.description ?? ""}
              multiline
              rows={3}
              id="description"
              autoComplete="description"
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {place ? "Edit Place" : "Add Place"}
        </Button>
      </Box>
    </>
  );
};

NewPlaceForm.propTypes = {
  center: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }).isRequired,
  place: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    category: PropTypes.string,
    description: PropTypes.string,
    lng: PropTypes.number,
    lat: PropTypes.number,
  }),
};

NewPlaceForm.defaultProps = {
  place: null,
};

export default NewPlaceForm;
