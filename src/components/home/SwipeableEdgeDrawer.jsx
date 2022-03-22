import * as React from "react";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { useContext, useEffect } from "react";
import { storeContext } from "components/provider/Provider";

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

const SwipeableEdgeDrawer = () => {
  const { state } = useContext(storeContext);
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    setOpen(state.maps.selectedDrawer);
  }, [state.maps.selectedDrawer]);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <Global
        styles={{
          ".swipeable-drawer.MuiDrawer-root > .MuiPaper-root": {
            height: `calc(50% - ${drawerBleeding}px)`,
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
            {state.maps.allPlaces?.length
              ? `${state.maps.allPlaces?.length} Places`
              : "No Places"}
          </Typography>
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: "100%",
            overflow: "auto",
          }}
        >
          <Typography variant="h4" component="h4">
            {state.maps.selectedPlace?.name}
          </Typography>
          <Typography variant="subtitle2" component="p" mt={2}>
            {state.maps.selectedPlace?.category}
          </Typography>
          {state.maps.selectedPlace?.average_rating && (
            <Typography variant="subtitle2" component="p" mt={2}>
              Average Rating: {state.maps.selectedPlace?.average_rating}/5
            </Typography>
          )}
          <Typography variant="body2" component="p" mt={2}>
            {state.maps.selectedPlace?.description}
          </Typography>
        </StyledBox>
      </SwipeableDrawer>
    </>
  );
};
export default SwipeableEdgeDrawer;
