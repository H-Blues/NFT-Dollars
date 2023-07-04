import React, { useContext, useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Avatar, Box, Button, List, ListItem, ListItemAvatar } from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import LayersIcon from "@mui/icons-material/Layers";
import TokenIcon from "@mui/icons-material/Token";
import TagIcon from "@mui/icons-material/Tag";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import CreditScoreIcon from "@mui/icons-material/CreditScore";

import { AlertDialog, SuccessDialog, WaitDialog } from "../../../dialog";
import { convertToBigNumber, convertToReadNumber } from "../../../../utils/number";
import { NFTSelectContext } from "../../../../contexts/nftSelectContext";
import { SuccessContext } from "../../../../contexts/successContext";
import { contracts } from "../../../../utils/contracts";

const ConfirmationList = ({ back, reset }) => {
  const { layer, address, id, customId, nftName, maxExtraction, isLayerUp, threshold } = useContext(NFTSelectContext);
  const { account } = useWeb3React();
  const [totalExtraction, setTotalExtraction] = useState("0.0000");
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMsg, setAlertMsg] = useState("");
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isWaitOpen, setIsWaitOpen] = useState(false);
  const { addNFTOperSuccess } = useContext(SuccessContext);
  const nftContract = contracts.createNFTContract(address);
  const nftId = id ? id : customId;

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
    reset();
  };

  const handleWaitOpen = () => {
    setIsWaitOpen(true);
  };

  const handleWaitClose = () => {
    setIsWaitOpen(false);
  };

  const getLayerName = (layer) => {
    const layerNames = {
      0: "Unit",
      1: "Cross",
      2: "Reserve",
    };
    return layerNames[layer] || "Unknown Layer";
  };

  const confirmationData = [
    {
      icon: <LayersIcon fontSize="small" />,
      label: "Layer",
      value: getLayerName(isLayerUp ? parseInt(layer) + 1 : layer),
    },
    {
      icon: <TokenIcon fontSize="small" />,
      label: "NFT Name",
      value: `${nftName}`,
    },
    {
      icon: <TagIcon fontSize="small" />,
      label: "NFT ID",
      value: `# ${nftId}`,
    },
    {
      icon: <CurrencyExchangeIcon fontSize="small" />,
      label: "NFT Value",
      value: `${parseFloat(maxExtraction).toFixed(2)} NFTUSD`,
    },
    {
      icon: <CreditScoreIcon fontSize="small" />,
      label: "Max NFTUSD",
      value: `${totalExtraction} NFTUSD`,
    },
  ];

  const getOwnership = async () => {
    try {
      const owner = await nftContract.ownerOf(nftId);
      return owner;
    } catch (error) {
      console.error("Error getting ownership:", error);
      return null;
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

  const lockNFT = async () => {
    try {
      await contracts.pool.LockedNFT(address, nftId, isLayerUp, convertToBigNumber(threshold, 4));
      return true;
    } catch (error) {
      console.error("Error locking NFT:", error);
      return false;
    }
  };

  const submit = async () => {
    setIsAlertOpen(false);
    try {
      const owner = await getOwnership();
      const isOwner = owner === account;
      const isInLoan = owner === contracts.loan;

      if (!isOwner && !isInLoan) {
        const ownerErrorTitle = "Before NFT Approval";
        const ownerErrorMsg = "This NFT belongs to others or does not exist. Please make sure the ownership is yours.";
        handleAlertOpen(ownerErrorTitle, ownerErrorMsg);
        return;
      }

      if (isInLoan) {
        const duplErrorTitle = "NFT is Already Locked";
        const duplErrorMsg =
          "Sorry. This NFT is in the pool now. You can borrow NFTUSD against it or approve a new NFT.";
        handleAlertOpen(duplErrorTitle, duplErrorMsg);
        return;
      }

      const isApproved = await approveNFT();
      if (!isApproved) {
        const cancelTitle = "Cancel NFT Approval?";
        const cancelMsg = "Before borrowing the NFTUSD, you need to make your NFT approved.";
        handleAlertOpen(cancelTitle, cancelMsg);
        console.error("User denied transaction signature: NFT approval is cancelled");
        return;
      }

      handleWaitOpen();
      setTimeout(async () => {
        handleWaitClose();
        const isLocked = await lockNFT();
        if (!isLocked) {
          const lockErrorTitle = "Lock NFT Failed";
          const lockErrorMsg = "Something wrong. Please retry or use another NFT.";
          handleAlertOpen(lockErrorTitle, lockErrorMsg);
          return;
        }

        handleWaitOpen();
        setTimeout(() => {
          handleWaitClose();
          handleSuccessOpen();
          addNFTOperSuccess();
        }, 12000);
      }, 8000);
    } catch (error) {
      console.error("Lock NFT Failed:", error);
    }
  };

  useEffect(() => {
    const getTotalExtraction = async () => {
      try {
        const factors = await contracts.pool.healthFactor(account);
        setTotalExtraction(parseFloat(convertToReadNumber(factors[2])).toFixed(2));
      } catch (error) {
        console.error(error);
        return;
      }
    };
    getTotalExtraction();
  }, [account]);

  return (
    <>
      <WaitDialog open={isWaitOpen} onClose={handleWaitClose} />
      <AlertDialog open={isAlertOpen} onClose={handleAlertClose} retry={submit} title={alertTitle} msg={alertMsg} />
      <SuccessDialog
        open={isSuccessOpen}
        onClose={handleSuccessClose}
        title={"Lock NFT Success!"}
        message={
          "We have successfully locked your NFT, and now you can borrow NFTUSD. Please click on the Borrow page. Thank you for using it."
        }
      />
      <List sx={{ width: "95%", bgcolor: "transparent" }}>
        {confirmationData.map((item, index) => (
          <ListItem key={index} sx={{ paddingLeft: "1px", paddingTop: "1px" }}>
            <ListItemAvatar sx={{ minWidth: "40px" }}>
              <Avatar sx={{ bgcolor: "black", width: 28, height: 28 }}>{item.icon}</Avatar>
            </ListItemAvatar>
            <span style={{ fontWeight: "bold" }}>{item.label}</span>
            {index === 0 && isLayerUp && (
              <>
                <span style={{ marginLeft: "auto" }}>{getLayerName(layer)}</span>
                <EastIcon style={{ color: "green", padding: "4px" }} />
                <span>{item.value}</span>
              </>
            )}
            {(index !== 0 || !isLayerUp) && <span style={{ marginLeft: "auto" }}>{item.value}</span>}
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
