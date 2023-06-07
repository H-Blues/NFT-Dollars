import React, { useContext, useState } from "react";
import { Box, Button } from "@mui/material";

import { NFTSelectContext } from "../../../contexts/nftSelectContext";
import USDInput from "../../input/usdInput";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import calculateData from "../../../utils/calculate";

const PreviewList = ({ next, back }) => {
  const [nftUSD, setNftUsd] = useState("");
  const { address, id } = useContext(NFTSelectContext);

  const [dataList, setDataList] = useState([
    {
      type: "Max Extraction",
      value: "0 nftUSD",
    },
    {
      type: "Collateral Ratio",
      value: "100%",
    },
    {
      type: "Liquidation Price",
      value: "0 nftUSD",
    },
    {
      type: "Security Deposit",
      value: "0 nftUSD",
    },
    {
      type: "Obtained",
      value: "0 nftUSD",
    },
  ]);

  const nftUsdChange = async (value) => {
    setNftUsd(value);
    const data = await calculateData(value, address);
    setDataList(data);
  };

  return (
    <>
      <USDInput
        title="USD"
        tip="Enter the USD you would like to deposit"
        inputValueChange={nftUsdChange}
        isMax="false"
      />

      <List dense={true} sx={{ backgroundColor: "white", opacity: "0.6", borderRadius: "10px" }}>
        {dataList.map((item, index) => (
          <ListItem key={index} className="list-item">
            <span style={{ fontWeight: "bold" }}>{item.type}</span>
            <span style={{ marginLeft: "auto" }}>{item.value}</span>
          </ListItem>
        ))}
      </List>

      <Box sx={{ mb: 1 }}>
        <div>
          <Button
            variant="contained"
            disabled={!nftUSD}
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
            Continue
          </Button>
          <Button color="warning" onClick={back} sx={{ mt: 1, mr: 1 }}>
            Back
          </Button>
        </div>
      </Box>
    </>
  );
};

export default PreviewList;
