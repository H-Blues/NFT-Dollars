import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import Dashboard from "../components/statistics/dashboard";
import LockNFTCard from "../components/card/lockNFTCard";
import UnlockNFTCard from "../components/card/unlockNFTCard";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const NFT = () => {
  const { active } = useWeb3React();
  const [alertOpen, setAlertOpen] = useState(!active);

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      const paddingBottom = window.innerWidth > 1024 ? "60vh" : "80vh";
      document.body.style.paddingBottom = paddingBottom;
    };
    handleResize();
    window.addEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setAlertOpen(!active);
  }, [active]);

  return (
    <>
      <Snackbar
        open={alertOpen}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        sx={{ marginTop: "3%", width: "70%" }}
      >
        <Alert onClose={handleAlertClose} severity="warning">
          Please connect your wallet.
        </Alert>
      </Snackbar>
      <div className="grid xl:grid-cols-3">
        <div className="col-span-2">
          <LockNFTCard />
          <UnlockNFTCard />
        </div>
        <div className="col-span-2 xl:col-span-1">
          <Dashboard />
        </div>
      </div>
    </>
  );
};

export default NFT;
