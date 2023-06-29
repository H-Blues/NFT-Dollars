import React, { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { Avatar, Card, CardBody, CardFooter, Typography, Button, Collapse } from "@material-tailwind/react";
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from "@material-tailwind/react";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import UnlockNFTStepper from "../stepper/unlockNFT";
import poolIcon from "../../assets/avatar.svg";

const title = "Unlock NFT";
const icon = poolIcon;
const description = "You can unlock your NFT here. And your available NFTUSD will decrease. ";
const operation = "unlock";

const UnlockNFTCard = () => {
  const [lockContentOpen, setLockContentOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const { chainId } = useWeb3React();

  const toggle = (event) => {
    setLockContentOpen(!lockContentOpen);
  };

  const data = [
    {
      label: "Personal",
      value: "personal",
      content: <UnlockNFTStepper close={toggle} />,
    },
    {
      label: "Pool",
      value: "pool",
      content: <p> Hello </p>,
    },
  ];

  return (
    <>
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
            <a href="https://docs.nftdollars.xyz/" className="inline-flex font-bold items-center hover:underline">
              What is {title}?
              <ArrowTopRightOnSquareIcon className="w-6 mb-1" />
            </a>
          </Typography>

          <Collapse open={lockContentOpen}>
            <Tabs value={activeTab}>
              <TabsHeader
                className="rounded-none border-b bg-transparent p-0 mt-2"
                indicatorProps={{
                  className: "bg-transparent border-b-2 border-orange-500 rounded-none",
                }}
              >
                {data.map(({ label, value }) => (
                  <Tab
                    key={value}
                    value={value}
                    onClick={() => setActiveTab(value)}
                    className={activeTab === value ? "text-orange-500" : "text-gray-500"}
                  >
                    {label}
                  </Tab>
                ))}
              </TabsHeader>
              <TabsBody>
                {data.map(({ value, content }) => (
                  <TabPanel key={value} value={value}>
                    {content}
                  </TabPanel>
                ))}
              </TabsBody>
            </Tabs>
          </Collapse>
        </CardBody>

        <CardFooter className="pt-0">
          <div className="flex justify-end">
            {!lockContentOpen ? (
              <Button
                color="amber"
                className="ml-auto text-white"
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

export default UnlockNFTCard;
