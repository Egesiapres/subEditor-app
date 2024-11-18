import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Divider, IconButton, List, Toolbar, styled } from "@mui/material";
import MuiDrawer, { DrawerProps } from "@mui/material/Drawer";
import ListItems from "./ListItems";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(7.5),
      },
    }),
  },
}));
interface DashboardDrawer extends DrawerProps {
  toggleDrawer: () => void;
}

const DashboardDrawer: React.FC<DashboardDrawer> = ({ open, toggleDrawer }) => (
  <Drawer
    variant="permanent"
    open={open}
  >
    <Toolbar
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        px: [1],
      }}
    >
      <IconButton onClick={toggleDrawer}>
        <ChevronLeftIcon />
      </IconButton>
    </Toolbar>

    <Divider />

    <List component="nav">
      <ListItems />
    </List>
  </Drawer>
);

export default DashboardDrawer;
