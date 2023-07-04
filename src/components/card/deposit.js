import React, { useContext, useState } from "react";
import { Select, MenuItem } from "@mui/material";
import { Button } from "@material-tailwind/react";
import { layerOptions } from "../stepper/data/selectOptions";
import { SuccessContext } from "../../contexts/successContext";
import { AlertDialog, SuccessDialog, WaitDialog } from "../dialog";
import { contracts } from "../../utils/contracts";
import { convertToBigNumber } from "../../utils/number";
import Notice from "../input/notice";
import USDInput from "../input/usdInput";

const Deposit = ({ isReceiver, balance }) => {
  const normalNotice =
    "You can choose to become a receiver to receive NFTs after each liquidation or remain a regular deposit user and receive NDL rewards after each liquidation. Your choice is: ";

  const receiverNotice =
    "You are currently a receiver. You can choose to deposit at different layers,  where different layers mean you will receive NFT rewards at different price levels. If you don't want NFT rewards any more, you can withdraw all your deposit in pools.";

  const [wantReceiver, setWantReceiver] = useState(true);
  const [isWaitOpen, setIsWaitOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMsg, setAlertMsg] = useState("");
  const notice = isReceiver ? receiverNotice : normalNotice;
  const [layer, setLayer] = useState("");
  const [nftUSD, setNftUsd] = useState(0);
  const { addDepositSuccess } = useContext(SuccessContext);

  const nftUsdChange = (value) => {
    setNftUsd(value);
  };

  const handleLayerChange = (event) => {
    setLayer(event.target.value);
  };

  const minValue = (layer) => {
    switch (parseInt(layer)) {
      case 1:
        return 100;
      case 2:
        return 500;
      case 3:
        return 1000;
      default:
        return 0;
    }
  };

  const handleAlertOpen = (title, msg) => {
    setAlertTitle(title);
    setAlertMsg(msg);
    setIsAlertOpen(true);
  };

  const handleAlertClose = () => {
    setIsAlertOpen(false);
  };

  const handleSuccessOpen = () => {
    setIsSuccessOpen(true);
  };

  const handleSuccessClose = () => {
    setIsSuccessOpen(false);
  };

  const handleWaitOpen = () => {
    setIsWaitOpen(true);
  };

  const handleWaitClose = () => {
    setIsWaitOpen(false);
  };

  const toBeReceiver = () => {
    setWantReceiver(true);
    setLayer("");
  };

  const toBeNormal = () => {
    setWantReceiver(false);
    setLayer(0);
  };

  const deposit = async () => {
    try {
      await contracts.pool.deposit(layer, convertToBigNumber(nftUSD));
      return true;
    } catch (error) {
      console.error("Error in deposit: ", error);
      return false;
    }
  };

  const validateInput = () => {
    if (parseFloat(nftUSD) < minValue(layer) || parseFloat(nftUSD) > parseFloat(balance)) {
      const errorTitle = "Input Invalid";
      const errorMsg = "Please check your balance and input.";
      handleAlertOpen(errorTitle, errorMsg);
      return false;
    } else {
      handleAlertClose();
      return true;
    }
  };

  const submit = async () => {
    handleAlertClose();
    const isInputError = validateInput();
    if (!isInputError) {
      return;
    }
    try {
      const isDeposited = await deposit();
      if (!isDeposited) {
        const depositFailTitle = "Deposit Failed";
        const depositFailMsg = "Sorry. You cannot deposit NFTUSD now. Please try other layers to deposit.";
        handleAlertOpen(depositFailTitle, depositFailMsg);
        return;
      }

      handleWaitOpen();
      setTimeout(() => {
        handleWaitClose();
        handleSuccessOpen();
        addDepositSuccess();
      }, 40000);
    } catch (error) {
      console.error("");
    }
  };

  return (
    <>
      <WaitDialog open={isWaitOpen} onClose={handleWaitClose} />
      <AlertDialog open={isAlertOpen} onClose={handleAlertClose} title={alertTitle} msg={alertMsg} />
      <SuccessDialog
        open={isSuccessOpen}
        onClose={handleSuccessClose}
        title={"Deposit Success"}
        message={"You have successfully deposited your NFTUSD. After each liquidation, you perhaps get NFTs as rewards"}
      />
      <Notice hasButton={!isReceiver} message={notice} toBeReceiver={toBeReceiver} toBeNormal={toBeNormal} />

      {isReceiver ? (
        <div className="md:flex space-x-10">
          <Select value={layer} onChange={handleLayerChange} className="mt-4 w-1/2 rounded-lg h-10 border-amber-100">
            {layerOptions.map((option) => (
              <MenuItem key={option.value} value={parseInt(option.value) + 1}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          <div className="w-1/2">
            <USDInput
              title="Deposit"
              tip="Enter NFTUSD you want to deposit"
              maxValue={balance}
              minValue={minValue(layer)}
              inputValueChange={nftUsdChange}
            />
          </div>
        </div>
      ) : wantReceiver ? (
        <div className="md:flex space-x-10">
          <Select value={layer} onChange={handleLayerChange} className="mt-4 w-1/2 rounded-lg h-10 border-amber-100">
            {layerOptions.map((option) => (
              <MenuItem key={option.value} value={parseInt(option.value) + 1}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          <div className="w-1/2">
            <USDInput
              title="Deposit"
              tip="Enter NFTUSD you want to deposit"
              maxValue={balance}
              minValue={minValue(layer)}
              inputValueChange={nftUsdChange}
            />
          </div>
        </div>
      ) : (
        <USDInput
          title="Deposit"
          tip="Enter NFTUSD you want to deposit"
          maxValue={balance}
          minValue={0}
          inputValueChange={nftUsdChange}
        />
      )}

      <div className="ml-6">
        <Button color="orange" onClick={submit}>
          Submit
        </Button>
      </div>
    </>
  );
};

export default Deposit;
