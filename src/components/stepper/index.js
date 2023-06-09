import React, { useState } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Paper,
  Typography,
} from "@mui/material";

import NFTSelectContextProvider from "../../contexts/nftSelectContext";
import NFTSelect from "././subcomponents/nftSelect";
import ConfirmationList from "./subcomponents/confirmationList";
import PreviewList from "./subcomponents/previewList";

const STEPS = [
  {
    label: "Select the layer and NFT",
    description: `Choose the layer you to continue your transaction`,
  },
  {
    label: "Enter USD to Deposit",
    description: "Enter the USD your would like to deposit",
  },
  {
    label: "Check and Confirm",
    description: `Confirm your transaction information`,
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

const ExtractionStepper = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
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
                {index === 0 && <NFTSelect next={handleNext} />}
                {index === 1 && <PreviewList next={handleNext} back={handleBack} />}
                {index === 2 && <ConfirmationList back={handleBack} />}
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Box>
    </NFTSelectContextProvider>
  );
};

export default ExtractionStepper;
