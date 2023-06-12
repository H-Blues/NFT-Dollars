import React, { useContext, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Avatar, Box, Button, List, ListItem, ListItemAvatar } from "@mui/material";
import LayersIcon from "@mui/icons-material/Layers";
import TokenIcon from "@mui/icons-material/Token";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import CreditScoreIcon from "@mui/icons-material/CreditScore";

import { AlertDialog, SuccessDialog } from "../../dialog";
import { convertToBigNumber } from "../../../utils/number";
import { NFTSelectContext } from "../../../contexts/nftSelectContext";
import { contracts } from "../../../utils/contracts";

const ConfirmationList = ({ back, reset }) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMsg, setAlertMsg] = useState("");

  const { layer, address, id, customId, nftUSD } = useContext(NFTSelectContext);
  const bigNumberUSD = convertToBigNumber(nftUSD);
  const nftContract = contracts.createNFTContract(address);
  const nftId = id ? id : customId;
  const { account } = useWeb3React();

  const handleAlertOpen = (title, msg) => {
    setAlertTitle(title);
    setAlertMsg(msg);
    setIsAlertOpen(true);
  };

  const handleAlertClose = () => {
    setIsAlertOpen(false);
    reset();
  };

  const handleSuccessOpen = () => {
    setIsSuccessOpen(true);
  };

  const handleSuccessClose = () => {
    setIsSuccessOpen(false);
  };

  const getLayerName = (layer) => {
    const layerNames = {
      0: "Unit Layer",
      1: "Cross Layer",
      2: "Reserve Layer",
    };
    return layerNames[layer] || "Unknown Layer";
  };

  const confirmationData = [
    {
      icon: <LayersIcon fontSize="small" />,
      label: "Layer",
      value: getLayerName(layer),
    },
    {
      icon: <TokenIcon fontSize="small" />,
      label: "NFTUSD Amount",
      value: `${parseFloat(nftUSD).toFixed(2)} nftUSD`,
    },
    {
      icon: <CurrencyExchangeIcon fontSize="small" />,
      label: "Borrowing Fee",
      value: "4.00%",
    },
    {
      icon: <CreditScoreIcon fontSize="small" />,
      label: "Total debt",
      value: `${(nftUSD * 0.9).toFixed(2)} nftUSD`,
    },
  ];

  const checkOwnership = async () => {
    try {
      const owner = await nftContract.ownerOf(nftId);
      return owner === account;
    } catch (error) {
      console.error("Error checking ownership:", error);
      return false;
    }
  };

  const approveNFT = async () => {
    try {
      await nftContract.approve(contracts.loan, nftId);
      return true;
    } catch (error) {
      console.error("Error approving NFT:", error);
      return false;
    }
  };

  const borrowNFTUSD = async () => {
    try {
      await contracts.pool.borrow(account, bigNumberUSD, address, nftId, account);
      return true;
    } catch (error) {
      console.error("Error borrowing NFTUSD:", error);
      return false;
    }
  };

  const submit = async () => {
    setIsAlertOpen(false);
    const isOwner = await checkOwnership();
    const isInLoan = isOwner === contracts.loan;
    let isBorrowed = true;

    if (!isOwner && !isInLoan) {
      const ownerErrorTitle = "Before NFT Approval";
      const ownerErrorMsg =
        "This NFT belongs to others or dose not exist. Please make sure the ownership is yours.";
      handleAlertOpen(ownerErrorTitle, ownerErrorMsg);
      return;
    }

    if (isInLoan) {
      isBorrowed = await borrowNFTUSD();
    } else {
      const isApproved = await approveNFT();
      if (!isApproved) {
        const cancelTitle = "Cancel NFT Approval?";
        const cancelMsg = "Before borrowing the NFTUSD, you need to make your NFT approved.";
        handleAlertOpen(cancelTitle, cancelMsg);
        console.error("User denied transaction signature: NFT approval is cancelled");
        return;
      }
      isBorrowed = await borrowNFTUSD();
    }

    if (!isBorrowed) {
      const cancelTitle = "Transaction Failure";
      const cancelMsg =
        "Please check the NFT status and the value of NFTUSD you want to borrow. You can retry through the following button.";
      handleAlertOpen(cancelTitle, cancelMsg);
      return;
    }

    handleSuccessOpen();
  };

  return (
    <>
      <AlertDialog
        open={isAlertOpen}
        onClose={handleAlertClose}
        retry={submit}
        title={alertTitle}
        msg={alertMsg}
      />
      <SuccessDialog open={isSuccessOpen} onClose={handleSuccessClose} isBorrow={true} />
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "transparent" }}>
        {confirmationData.map((item, index) => (
          <ListItem key={index}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: "black", width: 30, height: 30 }}>{item.icon}</Avatar>
            </ListItemAvatar>
            <span style={{ fontWeight: "bold" }}>{item.label}</span>
            <span style={{ marginLeft: "auto" }}>{item.value}</span>
          </ListItem>
        ))}
      </List>
      <Box sx={{ mb: 1 }}>
        <Button
          variant="contained"
          onClick={submit}
          sx={{
            mt: 1,
            mr: 1,
            backgroundColor: "orange",
            color: "white",
            "&:hover": {
              backgroundColor: "orange",
            },
          }}
        >
          Submit
        </Button>
        <Button color="warning" onClick={back} sx={{ mt: 1, mr: 1 }}>
          Back
        </Button>
      </Box>
    </>
  );
};

export default ConfirmationList;
