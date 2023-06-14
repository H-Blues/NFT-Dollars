import React, { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import { Avatar, Collapse, Typography, Button } from "@material-tailwind/react";
import { Card, CardBody, CardFooter } from "@material-tailwind/react";
import { Select, MenuItem } from "@mui/material";

import { AlertDialog, SuccessDialog } from "../dialog";
import repayIcon from "../../assets/avatar.svg";
import USDInput from "../input/usdInput";
import { contracts } from "../../utils/contracts";
import { convertToBigNumber, convertToReadNumber } from "../../utils/number";

const title = "Unlock NFT";
const icon = repayIcon;
const description = "Repay NFTUSD to get your NFT back. ";
const tip = "Enter the amount of NFTUSD";
const operation = "Repay";

const RepayCard = () => {
  const [contentOpen, setContentOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMsg, setAlertMsg] = useState("");
  const [nft, setNFT] = useState("");
  const [nftList, setNFTList] = useState([]);
  const [nftUSD, setNftUsd] = useState(0);
  const [nftAmountLeft, setNFTAmountLeft] = useState(0);
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

  const handleNFThandle = (event) => {
    const nft = event.target.value;
    setNFT(nft);
  };

  const submit = async () => {
    setNFTAmountLeft(nft.amount - nftUSD);
    handleAlertClose(false);
    if (!userNFTUSD) {
      handleAlertOpen("Before Repay", "You have not connected your wallet.");
      return;
    }
    try {
      await contracts.pool.repay(nft.address, nft.id, convertToBigNumber(nftUSD));
    } catch (error) {
      handleAlertOpen(
        "Repay Failure",
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

        const nftInfo = await contracts.pool.getAllLoanMessage(account);
        const addressList = nftInfo[1];
        const idList = nftInfo[2];
        const amountList = nftInfo[3];
        const nftList = [];
        for (let i = 0; i < addressList.length; i++) {
          const item = {
            address: addressList[i],
            id: parseInt(convertToReadNumber(idList[i], 0, 1)),
            amount: convertToReadNumber(amountList[i]),
          };
          nftList.push(item);
        }
        // const nftList = await contracts.test.getData();
        setNFTList(nftList);
      } catch (error) {
        console.error(error);
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
      <SuccessDialog
        open={isSuccessOpen}
        onClose={handleSuccessClose}
        title={"Repay Success!"}
        message={
          nftAmountLeft > 0
            ? `You have successfully repaied. To get your NFT back, you need to repay ${nftAmountLeft} NFTUSD more. `
            : "You have successfully repaied. The NFT will send to you later, please check your wallet for details. "
        }
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
              href="https://sylvain-code.gitbook.io/nftdollars-white-paper/unlock-nft"
              className="inline-flex font-bold items-center hover:underline"
            >
              What is {title}?
              <ArrowTopRightOnSquareIcon className="w-6 mb-1" />
            </a>
          </Typography>

          <Collapse open={contentOpen}>
            <div className="md:flex space-x-10">
              <div className="mt-4 w-5/6">
                <Select
                  value={nft}
                  color="warning"
                  onChange={handleNFThandle}
                  disabled={!userNFTUSD}
                  className="w-full rounded-lg h-10"
                >
                  {nftList &&
                    nftList.map((item) => (
                      <MenuItem key={item.id} value={item}>
                        Game Item
                      </MenuItem>
                    ))}
                </Select>
              </div>

              <USDInput
                title={title}
                tip={tip}
                inputValueChange={nftUsdChange}
                maxValue={userNFTUSD}
              />
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

export default RepayCard;
