import MenuIcon from "@mui/icons-material/Menu";
import { Box, IconButton, Toolbar, Typography, styled } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function DashboardAppBar({ open, toggleDrawer }) {
  // const [anchorElUser, setAnchorElUser] = useState(null);

  // const handleOpenUserMenu = event => {
  //   setAnchorElUser(event.currentTarget);
  // };

  // const handleCloseUserMenu = () => {
  //   setAnchorElUser(null);
  // };

  // const navigate = useNavigate();

  // const accountSettings = [
  //   {
  //     title: "Manage your account",
  //     action: () => navigate("/user/account"),
  //     icon: <SettingsIcon fontSize="small" />,
  //     name: "Account",
  //   },
  //   // {
  //   //   title: "Log out from your account",
  //   //   action: logout,
  //   //   icon: <LogoutIcon fontSize="small" />,
  //   //   name: "Log out",
  //   // },
  // ];

  return (
    <AppBar
      position="absolute"
      open={open}
    >
      <Toolbar
        sx={{
          pr: "24px", // keep right padding when drawer closed
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: "36px",
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          Subtitle Editor
        </Typography>

        <Box sx={{ display: "flex", flexGrow: 0 }}>
          {/* <Typography
            variant="subtitle1"
            mr={2}
          >
            {account?.name} {account?.surname}
          </Typography> */}

          {/* <Tooltip title="Open settings">
            <IconButton
              onClick={handleOpenUserMenu}
              sx={{ p: 0 }}
            >
              <AccountCircleIcon color="inherit" />
            </IconButton>
          </Tooltip> */}

          {/* <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {accountSettings.map(({ title, icon, name, action }, i) => (
              <Tooltip
                key={i}
                title={title}
                placement="left"
                arrow
              >
                <MenuItem onClick={action}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText>{name}</ListItemText>
                </MenuItem>
              </Tooltip>
            ))}
          </Menu> */}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
