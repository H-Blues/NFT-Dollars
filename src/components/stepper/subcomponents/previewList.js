import React, { useContext, useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { Spinner } from "@material-tailwind/react";

import { NFTSelectContext } from "../../../contexts/nftSelectContext";
import USDInput from "../../input/usdInput";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import calculationFn from "../../../utils/calculate";

const PreviewList = ({ next, back }) => {
  const { address, nftUSD, setNftUsd } = useContext(NFTSelectContext);
  const [maxExtraction, setMaxExtraction] = useState(null);
  const [collateral, setCollateral] = useState(null);
  const [securityDeposit, setSecurityDeposit] = useState(0);
  const [obtained, setObtained] = useState(0);

  const nftUsdChange = (value) => {
    setNftUsd(value);
    setSecurityDeposit(calculationFn.calcSecurityDeposit(value));
    setObtained(calculationFn.calcObtained(value));
  };

  useEffect(() => {
    const getExtraction = async () => {
      const [maxExtraction, collateral] = await calculationFn.calcExtractionAndCollateral(address);
      if (!maxExtraction && !collateral) {
        back();
      }
      setMaxExtraction(maxExtraction);
      setCollateral(collateral);
    };

    getExtraction();
    setNftUsd(0);
  }, []);

  return (
    <>
      <USDInput
        title="USD"
        tip="Enter the USD you would like to deposit"
        maxValue={maxExtraction}
        inputValueChange={nftUsdChange}
      />

      <List dense={true} sx={{ backgroundColor: "white", opacity: "0.6", borderRadius: "10px" }}>
        <ListItem>
          <span style={{ fontWeight: "bold" }}>Max Extraction</span>
          <span style={{ marginLeft: "auto" }}>
            {maxExtraction && `${maxExtraction} nftUSD`}
            {!maxExtraction && <Spinner className="h-6 w-6" />}
          </span>
        </ListItem>
        <ListItem>
          <span style={{ fontWeight: "bold" }}>Collateral Ratio</span>
          <span style={{ marginLeft: "auto" }}>
            {collateral && `${collateral * 100} %`}
            {!collateral && <Spinner className="h-6 w-6" />}
          </span>
        </ListItem>
        <ListItem>
          <span style={{ fontWeight: "bold" }}>Liquidation Price</span>
          <span style={{ marginLeft: "auto" }}>{nftUSD} nftUSD</span>
        </ListItem>
        <ListItem>
          <span style={{ fontWeight: "bold" }}>Security Deposit</span>
          <span style={{ marginLeft: "auto" }}>{securityDeposit} nftUSD</span>
        </ListItem>
        <ListItem>
          <span style={{ fontWeight: "bold" }}>Obtained</span>
          <span style={{ marginLeft: "auto" }}>{obtained} nftUSD</span>
        </ListItem>
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
