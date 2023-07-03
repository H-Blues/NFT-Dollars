import React, { useState, useEffect, useContext } from "react";
import { useWeb3React } from "@web3-react/core";
import { Avatar, Card, CardBody, CardFooter, Typography, Button, Collapse } from "@material-tailwind/react";
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel } from "@material-tailwind/react";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import { AlertDialog, SuccessDialog } from "../dialog";
import { SuccessContext } from "../../contexts/successContext";
import { contracts } from "../../utils/contracts";
import poolIcon from "../../assets/avatar.svg";
import Deposit from "./deposit";
import Withdraw from "./withdraw";

const title = "Stability Pool";
const icon = poolIcon;
const description = "Earn NFTDollars rewards and get NFTs by depositing NFTUSD. ";
const operation = "Deposit";

const StatbilityPoolCard = ({ balance }) => {
  const [contentOpen, setContentOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("deposit");
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMsg, setAlertMsg] = useState("");
  const [isReceiver, setIsReceiver] = useState(false);
  const [layer0Deposit, setLayer0Deposit] = useState(0);
  const [layer1Deposit, setLayer1Deposit] = useState(0);
  const [layer2Deposit, setLayer2Deposit] = useState(0);
  const [layer3Deposit, setLayer3Deposit] = useState(0);
  const { chainId, active, account } = useWeb3React();
  const { addDepositSuccess } = useContext(SuccessContext);

  const data = [
    {
      label: "Deposit",
      value: "deposit",
      content: <Deposit isReceiver={isReceiver} balance={balance} />,
    },
    {
      label: "Withdraw",
      value: "withdraw",
      content: (
        <Withdraw
          layer0Deposit={layer0Deposit}
          layer1Deposit={layer1Deposit}
          layer2Deposit={layer2Deposit}
          layer3Deposit={layer3Deposit}
        />
      ),
    },
  ];

  const toggle = () => {
    if (!active) {
      setContentOpen(false);
    } else {
      setContentOpen((cur) => !cur);
    }
  };

  const handleSuccessOpen = () => {
    setIsSuccessOpen(true);
  };

  const handleSuccessClose = () => {
    setIsSuccessOpen(false);
  };

  const handleAlertOpen = (title, msg) => {
    setAlertTitle(title);
    setAlertMsg(msg);
    setIsAlertOpen(true);
  };

  const handleAlertClose = () => {
    setIsAlertOpen(false);
  };

  const submit = async () => {
    handleAlertClose(false);
    if (!balance) {
      handleAlertOpen("Before Deposit", "You have not connected your wallet.");
      return;
    }
    try {
      // await contracts.pool.deposit(convertToBigNumber(nftUSD));
    } catch (error) {
      handleAlertOpen(
        "Deposit Failure",
        "If you did not cancel the transaction, please check your NFTUSD balance and make sure your input is valid."
      );
      return;
    }

    handleSuccessOpen();
    addDepositSuccess();
  };

  useEffect(() => {
    if (!active) {
      toggle();
    }
    // eslint-disable-next-line
  }, [active]);

  useEffect(() => {
    const getUserDeposit = async () => {
      try {
        const layer0Deposit = await contracts.pool.getDeposit(0, account);
        const layer1Deposit = await contracts.pool.getDeposit(1, account);
        const layer2Deposit = await contracts.pool.getDeposit(2, account);
        const layer3Deposit = await contracts.pool.getDeposit(3, account);
        const deposit = parseFloat(layer1Deposit) + parseFloat(layer2Deposit) + parseFloat(layer3Deposit);
        setIsReceiver(deposit > 0);
        setLayer0Deposit(layer0Deposit);
        setLayer1Deposit(layer1Deposit);
        setLayer2Deposit(layer2Deposit);
        setLayer3Deposit(layer3Deposit);
      } catch (error) {
        console.error("Error in getting user deposit: " + error);
      }
    };

    if (chainId === 97 && account) {
      getUserDeposit();
    }
  });

  return (
    <>
      <AlertDialog open={isAlertOpen} onClose={handleAlertClose} retry={submit} title={alertTitle} msg={alertMsg} />
      <SuccessDialog
        open={isSuccessOpen}
        onClose={handleSuccessClose}
        title={"Deposit Successfully"}
        message={"You have successfully deposited NFTUSD in stability pool. Thank you for your use."}
      />
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
            <a
              href="https://docs.nftdollars.xyz/stability-pool"
              className="inline-flex font-bold items-center hover:underline"
            >
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
            {!contentOpen && (
              <Button color="amber" className="ml-auto text-white" disabled={chainId !== 97} onClick={toggle}>
                {operation}
              </Button>
            )}
            {contentOpen && (
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

export default StatbilityPoolCard;
