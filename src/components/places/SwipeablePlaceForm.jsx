import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { storeContext } from "components/provider/Provider";
import { mapsActions } from "store/maps-reducer";
import NewPlaceForm from "components/places/NewPlaceForm";

const drawerBleeding = 56;

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

const SwipeablePlaceForm = ({ center }) => {
  const { state, dispatch } = useContext(storeContext);
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    setOpen(state.maps.newPlaceForm);
  }, [state.maps.newPlaceForm]);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
    dispatch({
      type: mapsActions.MAPS_SET_ALL,
      payload: {
        newPlaceForm: newOpen,
      },
    });
  };

  return (
    <>
      <Global
        styles={{
          ".swipeable-drawer.MuiDrawer-root > .MuiPaper-root": {
            height: `calc(70% - ${drawerBleeding}px)`,
            overflow: "visible",
            touchAction: "none",
          },
        }}
      />
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
        className="swipeable-drawer"
      >
        <StyledBox
          sx={{
            position: "absolute",
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: "visible",
            right: 0,
            left: 0,
          }}
        >
          <Puller />
          <Typography sx={{ p: 2, color: "text.secondary" }}>
            Add New Place
          </Typography>
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            p: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "auto",
            height: "100%",
            overflow: "auto",
          }}
        >
          <NewPlaceForm center={center} />
        </StyledBox>
      </SwipeableDrawer>
    </>
  );
};

SwipeablePlaceForm.propTypes = {
  center: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }).isRequired,
};
export default SwipeablePlaceForm;
