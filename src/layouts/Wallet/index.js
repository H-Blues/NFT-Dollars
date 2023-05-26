import React from "react";
import { Modal, Button, Box, Typography, SvgIcon } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useWeb3React } from "@web3-react/core";
import { connectors } from "./connectors";
import { ReactComponent as MetamaskSvg } from "../../assets/metamask-logo.svg";
import { ReactComponent as WallerSvg } from "../../assets/index-wallet.svg";
import { ReactComponent as CoinbaseSvg } from "../../assets/index-coinbase.svg";

const modalStyle = {
  position: "absolute",
  padding: "2em",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "20%",
  maxWidth: "400px",
  minWidth: "300px",
  bgcolor: "background.paper",
  borderRadius: "1rem",
  fontFamily: "PingFang SC",
};

const closeButtonStyle = {
  position: "absolute",
  top: "10px",
  right: "10px",
  cursor: "pointer",
};

const optionButtonStyle = {
  textTransform: "capitalize",
  color: "black",
  border: "none",
  padding: "2%",
  transition: "background-color 0.3s, color 0.3s",
  "&:hover": {
    backgroundColor: "orange",
    color: "white",
  },
};

const Wallet = ({ open, onClose }) => {
  const { activate } = useWeb3React();

  const setProvider = (type) => {
    window.localStorage.setItem("provider", type);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="modal-content" sx={modalStyle}>
        <div style={closeButtonStyle} onClick={onClose}>
          <ClearIcon color="transparent" />
        </div>
        <div>
          <Typography variant="h5" style={{ display: { xs: "none", md: "flex" } }}>
            Connect Wallet
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", marginTop: "1rem" }}>
            <Button
              key="metamask"
              startIcon={<SvgIcon component={MetamaskSvg} />}
              sx={{ ...optionButtonStyle }}
              onClick={() => {
                activate(connectors.injected);
                setProvider("injected");
                onClose();
              }}
            >
              Metamask
            </Button>

            <Button
              key="walletconnection"
              startIcon={<SvgIcon component={WallerSvg} />}
              sx={{ ...optionButtonStyle }}
              onClick={() => {
                activate(connectors.walletConnect);
                setProvider("walletConnect");
                onClose();
              }}
            >
              Wallet Connection
            </Button>
            <Button
              key="coinbase"
              startIcon={<SvgIcon component={CoinbaseSvg} />}
              sx={optionButtonStyle}
              onClick={() => {
                activate(connectors.coinbaseWallet);
                setProvider("coinbaseWallet");
                onClose();
              }}
            >
              Coinbase Wallet
            </Button>
          </Box>
        </div>
      </Box>
    </Modal>
  );
};

export default Wallet;
