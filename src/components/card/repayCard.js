import React, { useState, useEffect, useContext } from "react";
import { useWeb3React } from "@web3-react/core";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import { Avatar, Collapse, Typography, Button } from "@material-tailwind/react";
import { Card, CardBody, CardFooter } from "@material-tailwind/react";
import { AlertDialog, SuccessDialog, WaitDialog } from "../dialog";
import { convertToBigNumber } from "../../utils/number";
import { contracts } from "../../utils/contracts";
import { SuccessContext } from "../../contexts/successContext";
import Divider from "@mui/material/Divider";
import repayIcon from "../../assets/png/repay.png";
import USDInput from "../input/usdInput";
import SecurityAmount from "../input/securityAmount";

const title = "Repay";
const icon = repayIcon;
const description = "Repay FRAX and you can unlock your NFT then. ";
const tip = "The amount you pay will be actual payment with the security deposit.";
const operation = "Repay";

const RepayCard = ({ balance, debt, total }) => {
  const { chainId, account, active } = useWeb3React();
  const { addRepaySuccess } = useContext(SuccessContext);
  const [contentOpen, setContentOpen] = useState(false);
  const [isWaitOpen, setIsWaitOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMsg, setAlertMsg] = useState("");
  const [nftUSD, setNftUsd] = useState(0);

  const toggle = () => {
    if (!active) {
      setContentOpen(false);
    } else {
      setContentOpen((cur) => !cur);
    }
  };

  const nftUsdChange = (value) => {
    setNftUsd(value);
  };

  const handleSuccessOpen = () => {
    setIsSuccessOpen(true);
  };

  const handleSuccessClose = () => {
    setIsSuccessOpen(false);
  };

  const handleAlertOpen = (title, msg) => {
    setAlertTitle(title);
    setAlertMsg(msg);
    setIsAlertOpen(true);
  };

  const handleAlertClose = () => {
    setIsAlertOpen(false);
  };

  const handleWaitOpen = () => {
    setIsWaitOpen(true);
  };

  const handleWaitClose = () => {
    setIsWaitOpen(false);
  };

  const submit = async () => {
    handleAlertClose(false);
    if (!account) {
      handleAlertOpen("Before Repay", "You have not connected your wallet.");
      return;
    }

    try {
      await contracts.pool.repay(account, convertToBigNumber(parseFloat(nftUSD) * (10 / 9)));
      handleWaitOpen();
      setTimeout(() => {
        handleWaitClose();
        handleSuccessOpen();
        addRepaySuccess();
      }, 12000);
    } catch (error) {
      console.error(error);
      handleAlertOpen(
        "Repay Failure",
        "If you did not cancel the transaction, please check your NFTUSD balance and make sure your input is valid."
      );
      return;
    }
  };

  useEffect(() => {
    if (!active) {
      toggle();
    }
    // eslint-disable-next-line
  }, [active]);

  return (
    <>
      <WaitDialog open={isWaitOpen} onClose={handleWaitClose} />
      <AlertDialog open={isAlertOpen} onClose={handleAlertClose} retry={submit} title={alertTitle} msg={alertMsg} />
      <SuccessDialog
        open={isSuccessOpen}
        onClose={handleSuccessClose}
        title={"Repay Success!"}
        message={`You have successfully repaied NFTUSD. Please confirm the balance in your wallet. After this transaction you still have ${parseFloat(
          debt
        ).toFixed(2)} NFTUSD waiting to be repaid. `}
      />
      <Card className="m-auto w-5/6 md:ml-12 mt-12 bg-transparent bg-white bg-opacity-50  border-2 border-gray-700">
        <CardBody>
          <div className="flex mb-4">
            <Avatar src={icon} alt="pool" />
            <Typography variant="h3" className="ml-6">
              Repay
            </Typography>
          </div>
          <Typography variant="paragraph" className="inline mb-0">
            {description}
            <a
              href="https://docs.nftdollars.xyz/unlock-nft"
              className="inline-flex font-bold items-center hover:underline"
            >
              What is {title}?
              <ArrowTopRightOnSquareIcon className="w-6 mb-1" />
            </a>
          </Typography>

          <Collapse open={contentOpen} className="space-y-2">
            <Divider />
            <div className="md:flex space-x-10">
              <div className="w-full">
                <USDInput title={title} tip={tip} inputValueChange={nftUsdChange} maxValue={balance} minValue={0} />
              </div>
              <SecurityAmount accountDebt={debt} totalValue={total} nftUSD={nftUSD} />
            </div>

            <div className="ml-6">
              <Button color="orange" onClick={submit} disabled={parseFloat(nftUSD) > parseFloat(balance)}>
                Submit
              </Button>
            </div>
          </Collapse>
        </CardBody>

        <CardFooter className="pt-0">
          <div className="flex justify-end">
            {!contentOpen && (
              <Button color="amber" className="ml-auto text-black" disabled={chainId !== 97} onClick={toggle}>
                {operation}
              </Button>
            )}
            {contentOpen && (
              <Button color="amber" variant="outlined" className="ml-auto" onClick={toggle}>
                Cancel
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default RepayCard;
