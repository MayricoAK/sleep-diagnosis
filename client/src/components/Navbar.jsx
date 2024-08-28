import React, { useState } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  HomeOutlined,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setMode } from "state";
import profileImage from "assets/profile.jpeg";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Menu,
  MenuItem,
  useTheme,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = ({ user }) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const logout = () => {
    localStorage.removeItem('token');
    navigate(`/`);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2, color: theme.palette.secondary.main }}>
        Nyenyak - Sleep Diagnosis
      </Typography>
      <List>
        {["Home", "Profile"].map((text) => {
          const lcText = text.toLowerCase();
          return (
            <ListItem key={text} disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate(`/${lcText}`);
                  setActive(text);
                }}
                sx={{
                  backgroundColor:
                    active === text
                      ? theme.palette.secondary[300]
                      : "transparent",
                  color:
                    active === text
                      ? theme.palette.primary[600]
                      : theme.palette.secondary[100],
                }}
              >
                <ListItemIcon
                  sx={{
                    color:
                      active === text
                        ? theme.palette.primary[600]
                        : theme.palette.secondary[200],
                  }}
                >
                  {text === "Home" ? <HomeOutlined /> : <SettingsOutlined />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Left Side */}
        <Box display="flex" alignItems="center" gap="1rem">
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h4"
            noWrap
            sx={{
              display: { xs: "none", sm: "block" },
              color: theme.palette.secondary.main,
            }}
          >
            Nyenyak - Sleep Diagnosis
          </Typography>
        </Box>

        {/* Right Side */}
        <Box display="flex" alignItems="center" gap="1rem">
          <List sx={{ display: { xs: "none", sm: "flex" } }}>
            {["Home", "Profile"].map((text) => {
              const lcText = text.toLowerCase();
              return (
                <ListItem key={text} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      navigate(`/${lcText}`);
                      setActive(text);
                    }}
                    sx={{
                      backgroundColor:
                        active === text
                          ? theme.palette.secondary[300]
                          : "transparent",
                      color:
                        active === text
                          ? theme.palette.primary[600]
                          : theme.palette.secondary[100],
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color:
                          active === text
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[200],
                      }}
                    >
                      {text === "Home" ? <HomeOutlined /> : <SettingsOutlined />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>

          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>

          <Button
            onClick={handleMenuClick}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              textTransform: "none",
              gap: "1rem",
            }}
          >
            <Box
              component="img"
              alt="profile"
              src={profileImage}
              height="32px"
              width="32px"
              borderRadius="50%"
              sx={{ objectFit: "cover" }}
            />
            <Box textAlign="left">
              <Typography
                fontWeight="bold"
                fontSize="0.85rem"
                sx={{ color: theme.palette.secondary[100] }}
              >
                {user.name}
              </Typography>
            </Box>
            <ArrowDropDownOutlined
              sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
            />
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={isOpen}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <MenuItem onClick={logout}>Log Out</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;