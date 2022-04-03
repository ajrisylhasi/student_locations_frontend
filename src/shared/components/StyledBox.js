import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { grey } from "@mui/material/colors";

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

export default StyledBox;
