import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";

import logo from "../../assets/logo.svg";
import Wallet from "../Wallet";

import { useWeb3React } from "@web3-react/core";
import { truncateAddress } from "../Wallet/utils";

const pages = ["Home", "Docs", "Borrow", "RiskyTroves"];

const TransitionUp = (props) => {
  return <Slide {...props} direction="up" />;
};

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [walletModal, setWalletModal] = useState(false);
  const { chainId, account, deactivate, active } = useWeb3React();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const openWalletConnection = () => {
    setWalletModal(true);
  };

  const closeWalletConnection = () => {
    setWalletModal(false);
  };

  const refreshState = () => {
    window.localStorage.setItem("provider", undefined);
  };

  const disconnect = () => {
    refreshState();
    deactivate();
  };

  return (
    <AppBar position="static" color="transparent">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: "none", md: "flex" }, mr: 5 }}>
            <img src={logo} width="80vw" alt="NFT-Dollars" />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ display: { xs: "flex", md: "none" }, flexGrow: 1 }}>
            <img src={logo} width="80vw" alt="NFT-Dollars" />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  textTransform: "capitalize",
                  fontWeight: 500,
                  fontSize: "1rem",
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {!active ? (
            <Button
              key="connect"
              onClick={openWalletConnection}
              sx={{
                mr: 2,
                color: "white",
                borderRadius: "50px",
                padding: "0.5% 3%",
                fontSize: "1%",
                border: "1px solid white",
              }}
            >
              Connect
            </Button>
          ) : (
            <Button
              key="connect"
              onClick={disconnect}
              sx={{
                mr: 2,
                color: "white",
                borderRadius: "50px",
                padding: "0.5% 3%",
                fontSize: "1%",
                border: "1px solid white",
              }}
            >
              {truncateAddress(account)}
            </Button>
          )}

          <Wallet open={walletModal} onClose={closeWalletConnection}></Wallet>
        </Toolbar>
      </Container>

      {/* <Snackbar
        open={chainId !== 1}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        TransitionComponent={TransitionUp}
        message="Please Connect to Ethereum Mainnet"
        key="notice"
      /> */}
    </AppBar>
  );
};
export default ResponsiveAppBar;
