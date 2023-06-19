import React, { useState } from "react";
import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Collapse,
} from "@material-tailwind/react";

import Divider from "@mui/material/Divider";
import extractionIcon from "../../assets/avatar.svg";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import ExtractionStepper from "../stepper";
import { useWeb3React } from "@web3-react/core";

const title = "Extraction";
const icon = extractionIcon;
const description = "You can borrow NFTUSD from your NFT by opening a Trove. ";
const operation = "Deposit";

const ExtractionCard = () => {
  const [open, setOpen] = useState(false);
  const { chainId } = useWeb3React();

  const toggle = () => {
    setOpen((cur) => !cur);
  };

  return (
    <Card className="m-auto w-5/6 md:ml-12 mt-12 bg-transparent bg-white bg-opacity-50">
      <CardBody>
        <div className="flex mb-4">
          <Avatar src={icon} alt="pool" />
          <Typography variant="h3" className="ml-6">
            {title}
          </Typography>
        </div>
        <Typography variant="paragraph" className="inline mb-0">
          {description}
          <a
            href="https://docs.nftdollars.xyz/extract-nftusd"
            className="inline-flex font-bold items-center hover:underline"
          >
            What is {title}?
            <ArrowTopRightOnSquareIcon className="w-6 mb-1" />
          </a>
        </Typography>

        <Collapse open={open} className="space-y-4">
          <Divider />
          <ExtractionStepper close={toggle} />
        </Collapse>
      </CardBody>

      <CardFooter className="pt-0">
        <div className="flex justify-end">
          {!open && (
            <Button
              color="amber"
              className="ml-auto text-white"
              disabled={chainId !== 97}
              onClick={toggle}
            >
              {operation}
            </Button>
          )}
          {open && (
            <Button color="amber" variant="outlined" className="ml-auto" onClick={toggle}>
              Cancel
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ExtractionCard;
