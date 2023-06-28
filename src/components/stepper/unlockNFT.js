import React, { useState } from "react";
import { Box, Stepper, Step, StepLabel, StepContent, Typography } from "@mui/material";

import UnlockNFTSelect from "./subcomponents/unlock/unlockNFTSelect";
import ConfirmationList from "./subcomponents/unlock/confirmationList";

const STEPS = [
  {
    label: "Select your locked NFT",
    description: "Choose your NFT in stability pool",
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

const UnlockNFTStepper = ({ close }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [nft, setNFT] = useState("");

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
    <Box sx={{ maxWidth: 500 }}>
      <Stepper activeStep={activeStep} orientation="vertical" sx={stepStyle}>
        {STEPS.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              {index === 0 && <UnlockNFTSelect next={handleNext} nft={nft} handleNFTChange={handleNFTChange} />}
              {index === 1 && <ConfirmationList back={handleBack} reset={reset} nft={nft} />}
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default UnlockNFTStepper;
