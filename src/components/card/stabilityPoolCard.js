import React, { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Collapse,
} from "@material-tailwind/react";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";

import { AlertDialog, SuccessDialog } from "../dialog";
import poolIcon from "../../assets/avatar.svg";
import USDInput from "../input/usdInput";
import PoolShareInput from "../input/poolShareInput";
import { contracts } from "../../utils/contracts";
import { convertToBigNumber, convertToReadNumber } from "../../utils/number";

const title = "Stability Pool";
const icon = poolIcon;
const description = "Earn NFTDollars rewards and get NFTs by depositing NFTUSD. ";
const tip = "Enter the amount of NFTUSD";
const operation = "Deposit";

const StatbilityPoolCard = () => {
  const [contentOpen, setContentOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMsg, setAlertMsg] = useState("");
  const [nftUSD, setNftUsd] = useState(0);
  const [userNFTUSD, setUserNFTUSD] = useState(0);

  const { account } = useWeb3React();

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
    if (!userNFTUSD) {
      handleAlertOpen("Before Deposit", "You have not connected your wallet.");
      return;
    }
    try {
      await contracts.pool.deposit(convertToBigNumber(nftUSD));
    } catch (error) {
      handleAlertOpen(
        "Deposit Failure",
        "If you did not cancel the transaction, please check your NFTUSD balance and make sure your input is valid."
      );
      return;
    }

    handleSuccessOpen();
  };

  useEffect(() => {
    const getUserNFTUSD = async () => {
      try {
        const userNFTUSD = await contracts.nftUSD.balanceOf(account);
        setUserNFTUSD(convertToReadNumber(userNFTUSD));
      } catch (error) {
        return;
      }
    };
    getUserNFTUSD();
  }, [account]);

  return (
    <>
      <AlertDialog
        open={isAlertOpen}
        onClose={handleAlertClose}
        retry={submit}
        title={alertTitle}
        msg={alertMsg}
      />
      <SuccessDialog open={isSuccessOpen} onClose={handleSuccessClose} isBorrow={false} />
      <Card className="m-auto w-5/6 md:ml-12 mt-12 bg-transparent bg-white bg-opacity-50">
        <CardBody>
          <div className="flex mb-4">
            <Avatar src={icon} alt="pool" />
            <Typography variant="h3" className="ml-6">
              Stability Pool
            </Typography>
          </div>
          <Typography variant="paragraph" className="inline mb-0">
            {description}
            <a
              href="https://sylvain-code.gitbook.io/nftdollars-white-paper/stability-pool"
              className="inline-flex font-bold items-center hover:underline"
            >
              What is {title}?
              <ArrowTopRightOnSquareIcon className="w-6 mb-1" />
            </a>
          </Typography>

          <Collapse open={contentOpen}>
            <div className="md:flex space-x-10">
              <USDInput
                title={title}
                tip={tip}
                inputValueChange={nftUsdChange}
                maxValue={userNFTUSD}
              />
              <PoolShareInput nftUSD={nftUSD} />
            </div>
            <div className="ml-6">
              <Button color="orange" onClick={submit}>
                Submit
              </Button>
            </div>
          </Collapse>
        </CardBody>

        <CardFooter className="pt-0">
          <div className="flex justify-end">
            {!contentOpen && (
              <Button color="amber" className="ml-auto text-white" onClick={toggle}>
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

export default StatbilityPoolCard;
