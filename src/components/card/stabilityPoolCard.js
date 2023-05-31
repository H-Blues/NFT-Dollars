import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Collapse,
} from "@material-tailwind/react";

import USDInput from "../input/usdInput";
import PoolShareInput from "../input/poolShareInput";
import poolIcon from "../../assets/avatar.svg";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

const title = "Stability Pool";
const icon = poolIcon;
const description = "Earn LQTY rewards and buy ETH at a discount by depositing LUSD. ";
const tip = "Enter the amount of NFTUSD";
const operation = "Deposit";

const StatbilityPoolCard = () => {
  const [open, setOpen] = useState(false);
  const [nftUSD, setNftUsd] = useState("");
  const toggleOpen = () => {
    setOpen((cur) => !cur);
  };

  const nftUsdChange = (value) => {
    setNftUsd(value);
    console.log("Received value from child component:", value);
  };

  return (
    <Card className="m-auto w-5/6 md:ml-12 mt-12 bg-transparent bg-white bg-opacity-50">
      <CardBody>
        <div className="flex mb-4">
          <Avatar src={icon} alt="pool" />
          <Typography variant="h3" className="ml-6">
            Stability Pool
          </Typography>
        </div>
        <Typography variant="paragraph" className="inline mb-0">
          {description}
          <a href="#" className="inline-flex font-bold items-center hover:underline">
            What is {title}?
            <ArrowTopRightOnSquareIcon className="w-6 mb-1" />
          </a>
        </Typography>

        <Collapse open={open}>
          <div className="md:flex space-x-10">
            <USDInput title={title} tip={tip} inputValueChange={nftUsdChange} />
            <PoolShareInput nftUSD={nftUSD} />
          </div>
        </Collapse>
      </CardBody>

      <CardFooter className="pt-0">
        <a href="#" className="flex justify-end">
          <Button color="amber" className="ml-auto text-white" onClick={toggleOpen}>
            {operation}
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
};

export default StatbilityPoolCard;
