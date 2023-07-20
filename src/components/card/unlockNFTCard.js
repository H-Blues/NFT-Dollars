import React, { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { Avatar, Card, CardBody, CardFooter, Typography, Button, Collapse } from "@material-tailwind/react";
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from "@material-tailwind/react";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import UnlockNFTStepper from "../stepper/unlockNFT";
import redeemIcon from "../../assets/png/redeem.png";

const title = "Unlock / Redeem";
const icon = redeemIcon;
const description = "You can unlock your NFT here. And your available FRAX will decrease. ";
const operation = "unlock";

const UnlockNFTCard = () => {
  const [contentOpen, setContentOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("unlock");
  const { chainId, active } = useWeb3React();

  const toggle = () => {
    if (!active) {
      setContentOpen(false);
    } else {
      setContentOpen((cur) => !cur);
    }
  };

  const data = [
    {
      label: "Unlock",
      value: "unlock",
      content: <UnlockNFTStepper close={toggle} personal={true} />,
    },
    {
      label: "Redeem",
      value: "redeem",
      content: <UnlockNFTStepper close={toggle} personal={false} />,
    },
  ];

  useEffect(() => {
    if (!active) {
      toggle();
    }
    // eslint-disable-next-line
  }, [active]);

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

          <Collapse open={contentOpen}>
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
            {!contentOpen ? (
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

export default UnlockNFTCard;
