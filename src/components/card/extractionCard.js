import React, { useContext, useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Avatar, Card, CardBody, CardFooter, Typography, Button, Collapse } from "@material-tailwind/react";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import { AlertDialog, ConfirmDialog, SuccessDialog, WaitDialog } from "../dialog";
import { contracts } from "../../utils/contracts";
import { convertToBigNumber } from "../../utils/number";
import { SuccessContext } from "../../contexts/successContext";
import Divider from "@mui/material/Divider";
import extractionIcon from "../../assets/avatar.svg";
import USDInput from "../input/usdInput";
import AvailableAmount from "../input/availableAmount";

const title = "Extraction";
const icon = extractionIcon;
const description = "You can borrow NFTUSD from your locked NFT. ";
const tip = "Enter the amount you want to borrow.";
const operation = "Borrow";

const ExtractionCard = ({ available, total, debt }) => {
  const { chainId, account, active } = useWeb3React();
  const { addBorrowSuccess } = useContext(SuccessContext);
  const [open, setOpen] = useState(false);
  const [isWaitOpen, setIsWaitOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [toConfirm, setToConfirm] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMsg, setAlertMsg] = useState("");
  const [nftUSD, setNftUsd] = useState(0);

  const toggle = () => {
    if (!active) {
      setOpen(false);
    } else {
      setOpen((cur) => !cur);
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

  const confirm = () => {
    setIsConfirmOpen(false);
    setToConfirm(true);
  };

  const handleConfirmOpen = () => {
    setIsConfirmOpen(true);
  };

  const handleConfirmClose = () => {
    setIsConfirmOpen(false);
    setToConfirm(false);
  };

  const handleAlertOpen = (title, msg) => {
    setAlertTitle(title);
    setAlertMsg(msg);
    setIsAlertOpen(true);
  };

  const handleAlertClose = () => {
    setToConfirm(false);
    setIsAlertOpen(false);
  };

  const handleWaitOpen = () => {
    setIsWaitOpen(true);
  };

  const handleWaitClose = () => {
    setIsWaitOpen(false);
  };

  const borrowNFTUSD = async () => {
    try {
      await contracts.pool.extraction(account, convertToBigNumber(nftUSD));
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const submit = async () => {
    handleAlertClose();
    if (!toConfirm && nftUSD >= available) {
      handleConfirmOpen();
      return;
    }

    try {
      const isBorrowed = await borrowNFTUSD();
      if (!isBorrowed) {
        const borrowFailTitle = "Borrow Failed";
        const borrowFailMsg = "Sorry. You cannot borrow NFTUSD now. Please make sure you have locked at least one NFT.";
        handleAlertOpen(borrowFailTitle, borrowFailMsg);
        return;
      }

      handleWaitOpen();
      setTimeout(() => {
        handleWaitClose();
        handleSuccessOpen();
        addBorrowSuccess();
      }, 15000);
    } catch (error) {
      console.error("Borrow Failed: " + error);
      return;
    }
  };

  useEffect(() => {
    if (toConfirm) {
      submit();
    }
    // eslint-disable-next-line
  }, [toConfirm]);

  useEffect(() => {
    if (!active) {
      toggle();
    }
  }, [active]);

  return (
    <>
      <WaitDialog open={isWaitOpen} onClose={handleWaitClose} />
      <AlertDialog open={isAlertOpen} onClose={handleAlertClose} retry={submit} title={alertTitle} msg={alertMsg} />
      <SuccessDialog
        open={isSuccessOpen}
        onClose={handleSuccessClose}
        title={"Borrow Success!"}
        message={"You have successfully borrowed NFTUSD. Please check your wallet for details. "}
      />
      <ConfirmDialog
        open={isConfirmOpen}
        onClose={handleConfirmClose}
        confirm={confirm}
        title={"Are You Sure?"}
        msg={
          "The amount of NFTUSD you want to borrow may expose you to the risk of liquidation. Are you sure you want to proceed?"
        }
      />
      <Card className="m-auto w-5/6 md:ml-12 mt-12 bg-transparent bg-white bg-opacity-50  border-2 border-gray-700">
        <CardBody>
          <div className="flex mb-4">
            <Avatar src={icon} alt="pool" />
            <Typography variant="h3" className="ml-6">
              {title}
            </Typography>
          </div>
          <Typography variant="paragraph" className="inline mb-0">
            {description}
            <a
              href="https://docs.nftdollars.xyz/extract-nftusd"
              className="inline-flex font-bold items-center hover:underline"
            >
              What is {title}?
              <ArrowTopRightOnSquareIcon className="w-6 mb-1" />
            </a>
          </Typography>

          <Collapse open={open} className="space-y-2">
            <Divider />
            <div className="md:flex space-x-10">
              <div className="w-full">
                <USDInput
                  title={operation}
                  tip={tip}
                  inputValueChange={nftUsdChange}
                  maxValue={available}
                  minValue={0}
                />
              </div>
              <AvailableAmount accountDebt={debt} totalValue={total} nftUSD={nftUSD} />
            </div>

            <div className="ml-6">
              <Button color="orange" onClick={submit} disabled={parseFloat(nftUSD) > parseFloat(available)}>
                Submit
              </Button>
            </div>
          </Collapse>
        </CardBody>

        <CardFooter className="pt-0">
          <div className="flex justify-end">
            {!open && (
              <Button color="amber" className="ml-auto text-black" disabled={chainId !== 97} onClick={toggle}>
                {operation}
              </Button>
            )}
            {open && (
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

export default ExtractionCard;
