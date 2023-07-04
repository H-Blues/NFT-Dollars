import React, { useState } from "react";
import { Box, Stepper, Step, StepLabel, StepContent, Typography } from "@mui/material";
import NFTSelectContextProvider from "../../contexts/nftSelectContext";
import UnlockNFTSelect from "./subcomponents/unlock/unlockNFTSelect";
import ConfirmationList from "./subcomponents/unlock/confirmationList";
import PoolNFTSelect from "./subcomponents/unlock/poolNFTSelect";

const STEPS = [
  {
    label: "Select your locked NFT",
    description: "Choose the NFT you want to unlock / redeem",
  },
  {
    label: "Preview balance change",
    description: "Confirm your max extraction change in stability pool",
  },
];

// change the color of stepper component
const stepStyle = {
  "& .Mui-active": {
    "&.MuiStepIcon-root": {
      color: "orange",
    },
    "& .MuiStepConnector-line": {
      borderColor: "warning.main",
    },
  },
  "& .Mui-completed": {
    "&.MuiStepIcon-root": {
      color: "orange",
    },
    "& .MuiStepConnector-line": {
      borderColor: "warning.main",
    },
  },
};

const UnlockNFTStepper = ({ personal, close }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [nft, setNFT] = useState("");
  const [nftUSD, setNFTUSD] = useState(0);

  const handleNFTChange = (event) => {
    const nft = event.target.value;
    if (nft) {
      setNFT(nft);
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setNFT("");
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const reset = () => {
    close();
    setActiveStep(0);
  };

  return (
    <NFTSelectContextProvider>
      <Box sx={{ maxWidth: 500 }}>
        <Stepper activeStep={activeStep} orientation="vertical" sx={stepStyle}>
          {STEPS.map((step, index) => (
            <Step key={step.label}>
              <StepLabel>{step.label}</StepLabel>
              <StepContent>
                <Typography>{step.description}</Typography>
                {index === 0 && personal && (
                  <UnlockNFTSelect next={handleNext} nft={nft} handleNFTChange={handleNFTChange} />
                )}
                {index === 0 && !personal && <PoolNFTSelect next={handleNext} setNFTUSD={setNFTUSD} />}
                {index === 1 && (
                  <ConfirmationList personal={personal} back={handleBack} reset={reset} nft={nft} nftUSD={nftUSD} />
                )}
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Box>
    </NFTSelectContextProvider>
  );
};

export default UnlockNFTStepper;
