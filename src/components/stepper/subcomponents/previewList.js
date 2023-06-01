import React, { useState } from "react";

import USDInput from "../../input/usdInput";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

const dataList = [
  {
    type: "Max Extraction",
    value: "500 nftUSD",
  },
  {
    type: "Collateral Ratio",
    value: "100%",
  },
  {
    type: "Liquidation Price",
    value: "9 nftUSD",
  },
  {
    type: "Security Deposit",
    value: "0.90 nftUSD",
  },
  {
    type: "Obtained",
    value: "8.10 nftUSD",
  },
];

const PreviewList = () => {
  const [nftUSD, setNftUsd] = useState("");
  const nftUsdChange = (value) => {
    setNftUsd(value);
    console.log("Received value from child component:", value);
  };

  return (
    <>
      <USDInput title="USD" tip="Enter the USD" inputValueChange={nftUsdChange} isMax="false" />

      <List dense="true" sx={{ backgroundColor: "white", opacity: "0.6", borderRadius: "10px" }}>
        {dataList.map((item, index) => (
          <ListItem key={index} className="list-item">
            <span style={{ fontWeight: "bold" }}>{item.type}</span>
            <span style={{ marginLeft: "auto" }}>{item.value}</span>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default PreviewList;
