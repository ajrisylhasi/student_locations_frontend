import * as React from "react";
import { Global } from "@emotion/react";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { useContext, useEffect } from "react";
import { storeContext } from "components/provider/Provider";
import StyledBox from "shared/components/StyledBox";
import Puller from "shared/components/Puller";
import { usersActions } from "store/users-reducer";
import SelectedUserFields from "components/users/SelectedUserFields";

const drawerBleeding = 56;

const SwipeableSelectedUser = () => {
  const { state, dispatch } = useContext(storeContext);
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    setOpen(state.users.selectedDrawer);
  }, [state.users.selectedDrawer]);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
    dispatch({
      type: usersActions.USERS_SET_ALL,
      payload: {
        selectedDrawer: newOpen,
      },
    });
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
            {state.users.allUsers?.length ? `Selected User` : "No Users"}
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
          <SelectedUserFields />
        </StyledBox>
      </SwipeableDrawer>
    </>
  );
};
export default SwipeableSelectedUser;
