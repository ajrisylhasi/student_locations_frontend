import { styled } from "@mui/material/styles";
import MuiCircularProgress from "@mui/material/CircularProgress";

const Loader = styled(MuiCircularProgress)(() => ({
  position: "absolute",
  top: "50%",
  left: "50%",
}));

export default Loader;
