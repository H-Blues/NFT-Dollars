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
import ExtractionStepper from "../stepper/extractionStepper";
import extractionIcon from "../../assets/avatar.svg";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

const title = "Extraction";
const icon = extractionIcon;
const description = "You can borrow LUSD against ETH collateral by opening a Trove. ";
const operation = "Deposit";

const ExtractionCard = () => {
  const [open, setOpen] = useState(false);
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
          <a href="#" className="inline-flex font-bold items-center hover:underline">
            What is {title}?
            <ArrowTopRightOnSquareIcon className="w-6 mb-1" />
          </a>
        </Typography>

        <Collapse open={open} className="space-y-4">
          <Divider />
          <ExtractionStepper />
        </Collapse>
      </CardBody>

      <CardFooter className="pt-0">
        <a href="#" className="flex justify-end">
          {!open && (
            <Button color="amber" className="ml-auto text-white" onClick={toggle}>
              {operation}
            </Button>
          )}
          {open && (
            <Button color="amber" variant="outlined" className="ml-auto" onClick={toggle}>
              Cancel
            </Button>
          )}
        </a>
      </CardFooter>
    </Card>
  );
};

export default ExtractionCard;
