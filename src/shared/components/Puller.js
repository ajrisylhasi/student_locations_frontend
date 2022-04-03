import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { grey } from "@mui/material/colors";

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

export default Puller;
