import React, { useContext } from "react";
import { Avatar, Box, Button, List, ListItem, ListItemAvatar } from "@mui/material";
import LayersIcon from "@mui/icons-material/Layers";
import TokenIcon from "@mui/icons-material/Token";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import { NFTSelectContext } from "../../../contexts/nftSelectContext";

const ConfirmationList = ({ next, back }) => {
  const { layer, nftUSD, obtained } = useContext(NFTSelectContext);

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
      label: "USD Amount",
      value: `${nftUSD} nftUSD`,
    },
    {
      icon: <CurrencyExchangeIcon fontSize="small" />,
      label: "Borrowing Fee",
      value: "4%",
    },
    {
      icon: <CreditScoreIcon fontSize="small" />,
      label: "Total debt",
      value: `${nftUSD * 0.99 * 0.96} nftUSD`,
    },
  ];

  return (
    <>
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
        <div>
          <Button
            variant="contained"
            onClick={next}
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
        </div>
      </Box>
    </>
  );
};

export default ConfirmationList;
