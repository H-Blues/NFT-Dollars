import React, { useContext, useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { SuccessContext } from "../contexts/successContext";
import { convertToReadNumber } from "../utils/number";
import { contracts } from "../utils/contracts";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import ExtractionCard from "../components/card/extractionCard";
// import StabilityCard from "../components/card/stabilityPoolCard";
import RepayCard from "../components/card/repayCard";
import Dashboard from "../components/statistics/dashboard";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Borrow = () => {
  const { active, account, chainId } = useWeb3React();
  const { borrowSuccess, repaySuccess } = useContext(SuccessContext);
  const [alertOpen, setAlertOpen] = useState(!active);
  const [accountDebt, setAccountDebt] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [availableExtraction, setAvailableExtraction] = useState(0);
  const [userUSDBalance, setUserUSDBalance] = useState(0);

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

  useEffect(() => {
    const getExtraction = async () => {
      try {
        const factors = await contracts.pool.healthFactor(account);
        const accountDebt = convertToReadNumber(factors[0]);
        const totalNFTValue = convertToReadNumber(factors[2]);
        setAccountDebt(parseFloat(accountDebt).toFixed(2));
        setTotalValue(parseFloat(totalNFTValue).toFixed(2));
        setAvailableExtraction(totalNFTValue - accountDebt);
      } catch (error) {
        console.error(error);
        return;
      }
    };

    const getBalance = async () => {
      try {
        let usdBalance = await contracts.nftUSD.balanceOf(account);
        setUserUSDBalance(convertToReadNumber(usdBalance));
      } catch (error) {
        console.error(error);
        return;
      }
    };

    if (chainId === 97 && account) {
      getExtraction();
      getBalance();
    }
  }, [chainId, account, borrowSuccess, repaySuccess]);

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
          <ExtractionCard available={availableExtraction} debt={accountDebt} total={totalValue} />
          <RepayCard balance={userUSDBalance} debt={accountDebt} total={totalValue} />
          {/* <StabilityCard /> */}
        </div>
        <div className="col-span-2 xl:col-span-1">
          <Dashboard />
        </div>
      </div>
    </>
  );
};

export default Borrow;
