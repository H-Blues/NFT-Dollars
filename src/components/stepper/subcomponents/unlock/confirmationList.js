import React, { useContext, useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import calculationFn from "../../../../utils/calculate";
import { contracts } from "../../../../utils/contracts";

import { Avatar, Box, Button, List, ListItem, ListItemAvatar } from "@mui/material";
import LayersIcon from "@mui/icons-material/Layers";
import TokenIcon from "@mui/icons-material/Token";
import TagIcon from "@mui/icons-material/Tag";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import CreditScoreIcon from "@mui/icons-material/CreditScore";

import { AlertDialog, SuccessDialog } from "../../../dialog";
import { convertToReadNumber } from "../../../../utils/number";
import { SuccessContext } from "../../../../contexts/successContext";

const ConfirmationList = ({ back, reset, nft }) => {
  const { account } = useWeb3React();
  const [totalExtraction, setTotalExtraction] = useState("0.0000");
  const [nftValue, setNFTValue] = useState("");
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMsg, setAlertMsg] = useState("");
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const { addNFTOperSuccess } = useContext(SuccessContext);

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
      value: getLayerName(nft.type + 1),
    },
    {
      icon: <TokenIcon fontSize="small" />,
      label: "NFT Name",
      value: `${nft.name}`,
    },
    {
      icon: <TagIcon fontSize="small" />,
      label: "NFT ID",
      value: `# ${nft.id}`,
    },
    {
      icon: <CurrencyExchangeIcon fontSize="small" />,
      label: "NFT Value",
      value: `${nftValue} NFTUSD`,
    },
    {
      icon: <CreditScoreIcon fontSize="small" />,
      label: "Available Amount",
      value: `${totalExtraction} NFTUSD`,
    },
  ];

  const unlockPersonalNFT = async () => {
    try {
      await contracts.pool.redeemNFT(nft.address, nft.id, 0);
      return true;
    } catch (error) {
      console.error("Error locking NFT:", error);
      return false;
    }
  };

  const submit = async () => {
    setIsAlertOpen(false);
    try {
      const isUnlock = await unlockPersonalNFT();

      if (!isUnlock) {
        const unlockFailTitle = "Unlock NFT Failed";
        const unlockFailMsg = "Something wrong. Please retry or check your NFTUSD balance.";
        handleAlertOpen(unlockFailTitle, unlockFailMsg);
        return;
      }

      handleSuccessOpen();
      addNFTOperSuccess();
    } catch (error) {
      console.error("Unlock NFT Failed:", error);
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

  useEffect(() => {
    const getNFTValue = async () => {
      const nftOriginValue = await calculationFn.calcExtraction(nft.address);
      const nftValue = nft.isUplayer ? nftOriginValue * 0.9 : nftOriginValue;
      setNFTValue(parseFloat(nftValue).toFixed(2));
    };

    nft && getNFTValue();
  }, [nft]);

  return (
    <>
      <AlertDialog open={isAlertOpen} onClose={handleAlertClose} retry={submit} title={alertTitle} msg={alertMsg} />
      <SuccessDialog
        open={isSuccessOpen}
        onClose={handleSuccessClose}
        title={"Unlock NFT Success!"}
        message={"We have successfully unlocked your NFT. Please confirm your transaction later. "}
      />
      <List sx={{ width: "95%", bgcolor: "transparent" }}>
        {confirmationData.map((item, index) => (
          <ListItem key={index} sx={{ paddingLeft: "1px", paddingTop: "1px" }}>
            <ListItemAvatar sx={{ minWidth: "40px" }}>
              <Avatar sx={{ bgcolor: "black", width: 28, height: 28 }}>{item.icon}</Avatar>
            </ListItemAvatar>
            <span style={{ fontWeight: "bold" }}>{item.label}</span>
            <span style={{ marginLeft: "auto", fontWeight: "350" }}>{item.value}</span>
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
