import React, { useContext, useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Avatar, Box, Button, List, ListItem, ListItemAvatar } from "@mui/material";
import LayersIcon from "@mui/icons-material/Layers";
import TokenIcon from "@mui/icons-material/Token";
import TagIcon from "@mui/icons-material/Tag";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import { SuccessContext } from "../../../../contexts/successContext";
import { NFTSelectContext } from "../../../../contexts/nftSelectContext";
import { AlertDialog, SuccessDialog } from "../../../dialog";
import { convertToBigNumber, convertToReadNumber } from "../../../../utils/number";
import { contracts } from "../../../../utils/contracts";
import calculationFn from "../../../../utils/calculate";

const ConfirmationList = ({ personal, back, reset, nft, nftUSD }) => {
  const { account } = useWeb3React();
  const [nftValue, setNFTValue] = useState("");
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMsg, setAlertMsg] = useState("");
  const [accountDebt, setAccountDebt] = useState(0);
  const [totalExtraction, setTotalExtraction] = useState("0.00");
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const { addNFTOperSuccess } = useContext(SuccessContext);
  const { layer, address, nftName, id, setLayer, setAddress, setId } = useContext(NFTSelectContext);

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
    setLayer("");
    setAddress("");
    setId("");
  };

  const getLayerName = (layer) => {
    const layerNames = {
      0: "Unit",
      1: "Cross",
      2: "Reserve",
    };
    return layerNames[layer];
  };

  const personalConfirmation = [
    {
      icon: <LayersIcon fontSize="small" />,
      label: "Layer",
      value: getLayerName(nft.type + 1),
    },
    {
      icon: <TokenIcon fontSize="small" />,
      label: "NFT Name",
      value: nft.name,
    },
    {
      icon: <TagIcon fontSize="small" />,
      label: "NFT ID",
      value: `# ${nft.id}`,
    },
    {
      icon: <CurrencyExchangeIcon fontSize="small" />,
      label: nftValue ? "NFT Value" : "Input Value",
      value: `${nftValue} NFTUSD`,
    },
    {
      icon: <CreditScoreIcon fontSize="small" />,
      label: "Available Amount",
      value: `${totalExtraction} NFTUSD`,
    },
  ];

  const publicConfirmation = [
    {
      icon: <LayersIcon fontSize="small" />,
      label: "Layer",
      value: getLayerName(layer),
    },
    {
      icon: <TokenIcon fontSize="small" />,
      label: "NFT Name",
      value: nftName,
    },
    {
      icon: <TagIcon fontSize="small" />,
      label: "NFT ID",
      value: `# ${id}`,
    },
    {
      icon: <CurrencyExchangeIcon fontSize="small" />,
      label: nftValue ? "NFT Value" : "Input Value",
      value: `${nftUSD} NFTUSD`,
    },
  ];

  const confirmationData = personal ? personalConfirmation : publicConfirmation;

  const unlockPersonalNFT = async () => {
    try {
      const amount = accountDebt - (totalExtraction - nftValue);
      const value = amount < 0 ? 0 : amount;
      await contracts.pool.redeemNFT(nft.address, nft.id, amount);
      return true;
    } catch (error) {
      console.error("Error unlocking NFT:", error);
      return false;
    }
  };

  const unlockPoolNFT = async () => {
    try {
      await contracts.pool.redeemNFT(address, id, convertToBigNumber(nftUSD));
      return true;
    } catch (error) {
      console.error("Error unlocking NFT:", error);
      return false;
    }
  };

  const submit = async () => {
    setIsAlertOpen(false);
    try {
      let isUnlock;
      if (personal) {
        isUnlock = await unlockPersonalNFT();
      } else {
        isUnlock = await unlockPoolNFT();
      }

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
        const accountDebt = convertToReadNumber(factors[0]);
        const totalNFTValue = convertToReadNumber(factors[2]);
        setAccountDebt(parseFloat(accountDebt).toFixed(2));
        setTotalExtraction(parseFloat(totalNFTValue).toFixed(2));
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
