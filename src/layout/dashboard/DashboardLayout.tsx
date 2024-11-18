import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import { useState } from "react";
import DashboardAppBar from "./DashboardAppBar";
import DashboardDrawer from "./DashboardDrawer";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const dashboardProps = {
    open: open,
    toggleDrawer: toggleDrawer,
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <DashboardAppBar {...dashboardProps} />

      <DashboardDrawer {...dashboardProps} />

      <Box
        component="main"
        sx={{
          backgroundColor: theme =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />

        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
