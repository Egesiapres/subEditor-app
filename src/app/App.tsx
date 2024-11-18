import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import UnauthenticatedRoutes from "../routes/UnauthenticatedRoutes";
import theme from "../theme/theme";

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />

    <UnauthenticatedRoutes />
  </ThemeProvider>
);

export default App;
