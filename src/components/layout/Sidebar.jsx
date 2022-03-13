import React from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import AppBar from "shared/components/AppBar";
import Drawer from "shared/components/Drawer";
import logo from "images/logo.svg";
import MainListItems from "components/layout/MainListItems";
import SecondaryListItems from "components/layout/SecondaryListItems";
import MobileDrawer from "./MobileDrawer";

const Sidebar = () => {
  const [open, setOpen] = React.useState(false);

  const isPhone = useMediaQuery({ query: "(max-width: 768px)" });

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const closeDrawer = () => {
    setOpen(false);
  };

  const drawerContent = () => (
    <>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          px: [1],
        }}
      >
        <Box width="50%">
          <Link to="/">
            <img
              src={logo}
              alt="Debrecen Student Locations"
              width="50px"
              height="50px"
            />
          </Link>
        </Box>
        <Box width="50%" textAlign="right">
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Box>
      </Toolbar>
      <Divider />
      <List component="nav">
        <MainListItems closeDrawer={closeDrawer} />
        <Divider sx={{ my: 1 }} />
        <SecondaryListItems closeDrawer={closeDrawer} />
      </List>
    </>
  );

  return (
    <>
      <AppBar position="absolute" open={open && !isPhone}>
        <Toolbar
          sx={{
            pr: "24px",
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && !isPhone && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h5"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Dashboard
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      {isPhone ? (
        <MobileDrawer open={open} closeDrawer={closeDrawer}>
          {drawerContent()}
        </MobileDrawer>
      ) : (
        <Drawer variant="permanent" open={open}>
          {drawerContent()}
        </Drawer>
      )}
    </>
  );
};

export default Sidebar;
