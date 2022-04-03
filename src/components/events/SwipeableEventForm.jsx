import React, { useContext, useEffect, useState } from "react";
import { Global } from "@emotion/react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { storeContext } from "components/provider/Provider";
import { eventsActions } from "store/events-reducer";
import StyledBox from "shared/components/StyledBox";
import Puller from "shared/components/Puller";
import NewEventForm from "components/events/NewEventForm";

const drawerBleeding = 56;

const SwipeableEventForm = ({ place }) => {
  const { state, dispatch } = useContext(storeContext);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(state.events.newEventForm);
  }, [state.events.newEventForm]);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
    dispatch({
      type: eventsActions.EVENTS_SET_ALL,
      payload: {
        newEventForm: newOpen,
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
            Add New Event
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
          <NewEventForm place={place} />
        </StyledBox>
      </SwipeableDrawer>
    </>
  );
};

SwipeableEventForm.propTypes = {
  place: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
};

SwipeableEventForm.defaultProps = {
  place: null,
};

export default SwipeableEventForm;
