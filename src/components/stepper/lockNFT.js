import React, { useState } from "react";
import { Box, Stepper, Step, StepLabel, StepContent, Typography } from "@mui/material";

import NFTSelectContextProvider from "../../contexts/nftSelectContext";
import LockNFTSelect from "./subcomponents/lock/lockNFTSelect";
import ConfirmationList from "./subcomponents/lock/confirmationList";
import PreviewList from "./subcomponents/lock/previewList";

const STEPS = [
  {
    label: "Select the layer and lock NFT",
    description: "Lock your NFT in stability pool to borrow NFTUSD.",
  },
  {
    label: "NFTUSD calculator",
    description: "Calculate how much NFTUSD you can obtain.",
  },
  {
    label: "Preview transaction information",
    description: "Confirm your NFT and account balance information.",
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

const LockNFTStepper = ({ close }) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
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
                {index === 0 && <LockNFTSelect next={handleNext} />}
                {index === 1 && <PreviewList isLock={true} next={handleNext} back={handleBack} />}
                {index === 2 && <ConfirmationList isLock={true} back={handleBack} reset={reset} />}
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Box>
    </NFTSelectContextProvider>
  );
};

export default LockNFTStepper;
