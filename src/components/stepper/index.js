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

  const handleReset = () => {
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
              {index === 0 && <NFTSelect next={handleNext} back={handleBack} />}
              {index === 1 && <PreviewList next={handleNext} back={handleBack} />}
              {index === 2 && <ConfirmationList next={handleNext} back={handleBack} />}
            </StepContent>
          </Step>
        ))}
      </Stepper>

      {activeStep === STEPS.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All STEPS completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
};

export default ExtractionStepper;
