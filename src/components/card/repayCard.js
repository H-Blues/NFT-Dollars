import React, { useState, useContext } from "react";
import { useWeb3React } from "@web3-react/core";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import { Avatar, Collapse, Typography, Button } from "@material-tailwind/react";
import { Card, CardBody, CardFooter } from "@material-tailwind/react";
import { AlertDialog, SuccessDialog } from "../dialog";
import { contracts } from "../../utils/contracts";
import { SuccessContext } from "../../contexts/successContext";
import Divider from "@mui/material/Divider";
import repayIcon from "../../assets/avatar.svg";
import USDInput from "../input/usdInput";
import AvailableAmount from "../input/availableAmount";
import { convertToBigNumber } from "../../utils/number";

const title = "Repay";
const icon = repayIcon;
const description = "Repay NFTUSD and you can unlock your NFT then. ";
const tip = `Due to the security fee, 90% will be deducted. `;
const operation = "Repay";

const RepayCard = ({ balance, debt, total }) => {
  const { chainId, account } = useWeb3React();
  const { addRepaySuccess } = useContext(SuccessContext);
  const [contentOpen, setContentOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMsg, setAlertMsg] = useState("");
  const [nftUSD, setNftUsd] = useState(0);

  const toggle = () => {
    setContentOpen((cur) => !cur);
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

  const submit = async () => {
    handleAlertClose(false);
    if (!account) {
      handleAlertOpen("Before Repay", "You have not connected your wallet.");
      return;
    }
    try {
      await contracts.pool.repay(account, convertToBigNumber(nftUSD * (10 / 9)));
      handleSuccessOpen();
      addRepaySuccess();
    } catch (error) {
      console.error(error);
      handleAlertOpen(
        "Repay Failure",
        "If you did not cancel the transaction, please check your NFTUSD balance and make sure your input is valid."
      );
      return;
    }
  };

  return (
    <>
      <AlertDialog open={isAlertOpen} onClose={handleAlertClose} retry={submit} title={alertTitle} msg={alertMsg} />
      <SuccessDialog
        open={isSuccessOpen}
        onClose={handleSuccessClose}
        title={"Repay Success!"}
        message={`You have successfully repaied. Please confirm the balance in your wallet. `}
      />
      <Card className="m-auto w-5/6 md:ml-12 mt-12 bg-transparent bg-white bg-opacity-50">
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
                <USDInput title={title} tip={tip} inputValueChange={nftUsdChange} maxValue={balance} />
              </div>
              <AvailableAmount accountDebt={debt} totalValue={total} nftUSD={nftUSD} />
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
              <Button color="amber" className="ml-auto text-white" disabled={chainId !== 97} onClick={toggle}>
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
