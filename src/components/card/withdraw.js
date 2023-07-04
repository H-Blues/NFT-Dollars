import React, { useContext, useState } from "react";
import { Select, MenuItem } from "@mui/material";
import { Button } from "@material-tailwind/react";
import { SuccessContext } from "../../contexts/successContext";
import { AlertDialog, SuccessDialog, WaitDialog } from "../dialog";
import { contracts } from "../../utils/contracts";
import { convertToBigNumber, convertToReadNumber } from "../../utils/number";
import Notice from "../input/notice";
import USDInput from "../input/usdInput";

const layerOptions = [
  { value: "-1", label: "Stability Pool" },
  { value: "0", label: "Unit Layer" },
  { value: "1", label: "Cross Layer" },
  { value: "2", label: "Reserve Layer" },
];

const Withdraw = ({ layer0Deposit, layer1Deposit, layer2Deposit, layer3Deposit }) => {
  const notice =
    "You can choose to withdraw from the following layers. Please note that some layers have deposit threshold. Check your balance and have a happy transaction!";
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isWaitOpen, setIsWaitOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMsg, setAlertMsg] = useState("");
  const [layer, setLayer] = useState("");
  const [nftUSD, setNftUsd] = useState(0);
  const { addWithdrawSuccess } = useContext(SuccessContext);
  const maxValue = [
    Math.max(convertToReadNumber(layer0Deposit), 0),
    Math.max(convertToReadNumber(layer1Deposit) - 100, 0),
    Math.max(convertToReadNumber(layer2Deposit) - 500, 0),
    Math.max(convertToReadNumber(layer3Deposit) - 1000, 0),
  ];

  const nftUsdChange = (value) => {
    setNftUsd(value);
  };

  const handleLayerChange = (event) => {
    setLayer(event.target.value);
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

  const withdraw = async () => {
    try {
      await contracts.pool.withdraw(layer, convertToBigNumber(nftUSD));
      return true;
    } catch (error) {
      console.error("Error in withdraw: ", error);
      return false;
    }
  };

  const validateInput = () => {
    if (maxValue[layer] <= 0) {
      const errorTitle = "Input Invalid";
      const errorMsg = "Your balance is not enough. Please check your input value.";
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
      const isWithdrawed = await withdraw();
      if (!isWithdrawed) {
        const withdrawFailTitle = "Withdraw Failed";
        const withdrawFailMsg = "Sorry. The withdraw transaction failed. Please check your deposit and balance.";
        handleAlertOpen(withdrawFailTitle, withdrawFailMsg);
        return;
      }
      handleWaitOpen();
      setTimeout(() => {
        handleWaitClose();
        handleSuccessOpen();
        addWithdrawSuccess();
      }, 30000);
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
      <Notice hasButton={false} message={notice} />

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
            maxValue={maxValue[layer]}
            minValue={0}
            inputValueChange={nftUsdChange}
          />
        </div>
      </div>

      <div className="ml-6">
        <Button color="orange" onClick={submit}>
          Submit
        </Button>
      </div>
    </>
  );
};

export default Withdraw;
