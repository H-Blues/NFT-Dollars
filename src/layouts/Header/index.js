import React, { useState } from "react";
import { Link } from "react-router-dom";

import { AppBar, Container, Box } from "@mui/material";
import { Button, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useWeb3React } from "@web3-react/core";
import { truncateAddress } from "../Wallet/utils";

import logo from "../../assets/logo.svg";
import Wallet from "../Wallet";

const PAGES = ["Home", "Docs", "Borrow", "RiskyTroves"];
const ROUTES = [
  "/",
  "https://sylvain-code.gitbook.io/nftdollars-white-paper/",
  "/borrow",
  "/record",
];

// const TransitionUp = (props) => {
//   return <Slide {...props} direction="up" />;
// };

const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [walletModal, setWalletModal] = useState(false);
  const { account, deactivate, active } = useWeb3React();

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
          {/* Desktop Logo */}
          <Box sx={{ display: { xs: "none", md: "flex" }, mr: 5 }}>
            <img src={logo} width="80vw" alt="NFT-Dollars" />
          </Box>

          {/* Mobile Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              keepMounted
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {/* Menu Items */}
              {PAGES.map((page, index) => {
                let route = ROUTES[index];
                return (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center" component={Link} to={route}>
                      {page}
                    </Typography>
                  </MenuItem>
                );
              })}
            </Menu>
          </Box>

          {/* Mobile Logo */}
          <Box sx={{ display: { xs: "flex", md: "none" }, flexGrow: 1 }}>
            <img src={logo} width="80vw" alt="NFT-Dollars" />
          </Box>

          {/* Desktop Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {/* Menu Buttons */}
            {PAGES.map((page, index) => {
              let route = ROUTES[index];
              return (
                <Link to={route} key={page}>
                  <Button
                    sx={{
                      my: 2,
                      color: "white",
                      textTransform: "capitalize",
                      fontWeight: 500,
                      fontSize: "1rem",
                    }}
                  >
                    {page}
                  </Button>
                </Link>
              );
            })}
          </Box>

          {/* Wallet Connection */}
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

          {/* Wallet Modal */}
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
export default Header;
