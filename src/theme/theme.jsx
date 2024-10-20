import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#023e8a",
      light: "#0077b6",
      dark: "#03045e",
      contrastText: "#fff",
    },
    secondary: {
      main: "#00b4d8",
      light: "#48cae4",
      dark: "#0096c7",
      contrastText: "#fff",
    },
    background: {
      default: "#F3F4F6",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#1F2937",
      secondary: "#4B5563",
    },
  },
});

export default theme;
