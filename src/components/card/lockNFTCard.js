import React, { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Avatar, Card, CardBody, CardFooter, Typography, Button, Collapse } from "@material-tailwind/react";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import Divider from "@mui/material/Divider";
import LockNFTStepper from "../stepper/lockNFT";
import poolIcon from "../../assets/avatar.svg";

const title = "Lock NFT";
const icon = poolIcon;
const description = "You can lock your NFT to borrow FRAX here. ";
const operation = "lock";

const LockNFTCard = () => {
  const [lockContentOpen, setLockContentOpen] = useState(false);
  const { chainId } = useWeb3React();

  const toggle = (event) => {
    setLockContentOpen(!lockContentOpen);
  };

  return (
    <>
      <Card className="m-auto w-5/6 md:ml-12 mt-12 bg-transparent bg-white bg-opacity-50  border-2 border-gray-700">
        <CardBody>
          <div className="flex mb-4">
            <Avatar src={icon} alt="pool" />
            <Typography variant="h3" className="ml-6">
              {title}
            </Typography>
          </div>
          <Typography variant="paragraph" className="inline mb-0">
            {description}
            <a href="https://docs.nftdollars.xyz/" className="inline-flex font-bold items-center hover:underline">
              What is {title}?
              <ArrowTopRightOnSquareIcon className="w-6 mb-1" />
            </a>
          </Typography>

          <Collapse open={lockContentOpen}>
            <Divider />
            <LockNFTStepper close={toggle} />
          </Collapse>
        </CardBody>

        <CardFooter className="pt-0">
          <div className="flex justify-end">
            {!lockContentOpen ? (
              <Button
                color="amber"
                className="ml-auto text-black"
                disabled={chainId !== 97}
                onClick={toggle}
                value={operation}
              >
                {operation}
              </Button>
            ) : (
              <Button color="amber" variant="outlined" className="ml-auto" onClick={toggle}>
                Cancel
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default LockNFTCard;
