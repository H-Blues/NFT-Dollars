import { Avatar, Card, CardHeader, CardBody, Typography } from "@material-tailwind/react";
import { List, ListItem, Divider } from "@mui/material";
import { ArrowTrendingUpIcon } from "@heroicons/react/24/outline";

import priceIcon from "../../assets/avatar.svg";
import walletLeft from "../../assets/wallet-leftAnimal.svg";
import walletRight from "../../assets/wallet-rightAnimal.svg";
import { useEffect, useState } from "react";
import { contracts } from "../../utils/contracts";
import { convertToReadNumber } from "../../utils/number";

const Dashboard = () => {
  // const [troves, setTroves] = useState(0);
  const [ndlSupply, setNDLSupply] = useState(0);
  const [nftUSDSupply, setNFTUSDSupply] = useState(0);
  const [nftUSDInPool, setNFTUSDInPool] = useState(0);
  const [extractionFee, setExtractionFee] = useState(0);
  const [securityDeposit, setSecurityDeposit] = useState(0);

  const data = [
    { type: "Borrowing Fee", value: "4.00%" },
    { type: "Troves", value: 0 },
    { type: "NFT Dollars supply", value: ndlSupply },
    { type: "NFTUSD supply", value: nftUSDSupply },
    { type: "NFTUSD in Stability Pool", value: nftUSDInPool },
    { type: "Total Extraction Fee", value: extractionFee },
    { type: "Total Security Deposit", value: securityDeposit },
  ];

  useEffect(() => {
    const fetchDashboardData = async () => {
      // const troves = await contracts.pool
      const ndlSupply = await contracts.nftDollar.totalSupply();
      const nftUSDSupply = await contracts.nftUSD.totalSupply();
      const nftUSDInPool = await contracts.pool.getTotalNFTUSDDeposits();
      const totalExtractionFee = await contracts.pool.getTotalExtractionFee();
      const totalSecurityDeposit = await contracts.pool.getTotalSecurityDeposit();

      setNDLSupply(convertToReadNumber(ndlSupply));
      setNFTUSDSupply(convertToReadNumber(nftUSDSupply));
      setNFTUSDInPool(convertToReadNumber(nftUSDInPool));
      setExtractionFee(convertToReadNumber(totalExtractionFee));
      setSecurityDeposit(convertToReadNumber(totalSecurityDeposit));
    };

    fetchDashboardData();
  }, []);

  return (
    <Card className="ml-6 mt-12 p-8 w-11/12 xl:mr-12 xl:ml-0 bg-transparent border-2">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center"
      >
        <div className="flex items-center mb-4 justify-center">
          <ArrowTrendingUpIcon color="white" strokeWidth={2} className="h-12 w-12" />
          <Typography variant="h3" color="white" className="ml-2 font-normal font-bold">
            Liquity Statistics
          </Typography>
        </div>

        {/* Price */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex mt-4 text-white ml-14 xl:ml-0">
            <Avatar src={priceIcon} alt="avatar" className="h-20 w-20 xl:h-14 xl:w-14" />
            <div className="flex flex-col items-start">
              <p className="ml-4 text-2xl xl:text-sm xl:ml-1">Price</p>
              <p className="ml-4 font-bold xl:ml-1">$131.0938</p>
            </div>
          </div>

          <div className="flex gap-16 xl:gap-4 text-white">
            {/* NFTdollars */}
            <div className="flex flex-col items-start">
              <p className="text-xl xl:text-xs">NFTdollars</p>
              <p className="font-bold">$11.02</p>
              <p className="text-xl xl:text-xs mt-2">Market</p>
              <div className="flex gap-1">
                <Avatar src={walletLeft} alt="avatar" className="h-6 w-6" />
                <Avatar src={walletRight} alt="avatar" className="h-6 w-6" />
              </div>
            </div>

            {/* NFTUSD */}
            <div className="flex flex-col items-start">
              <p className="text-xl xl:text-xs">NFTUSD</p>
              <p className="font-bold">$11.02</p>
              <p className="text-xl xl:text-xs mt-2">Market</p>
              <div className="flex gap-1">
                <Avatar src={walletLeft} alt="avatar" className="h-6 w-6" />
                <Avatar src={walletRight} alt="avatar" className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      {/* Protocol */}
      <CardBody className="p-0 ml-8 xl:ml-0">
        <Typography variant="h5" color="white">
          Protocol
        </Typography>
        <div className="ml-0">
          <List dense={true} sx={{ marginLeft: "-18px" }}>
            {data.map((item, index) => (
              <div key={index}>
                {/* Data item */}
                <ListItem>
                  <span className="text-white">{item.type}</span>
                  <span className="ml-auto text-white">{item.value}</span>
                </ListItem>
                {/* Divider */}
                <Divider sx={{ backgroundColor: "white" }} />
              </div>
            ))}
          </List>
        </div>
      </CardBody>
    </Card>
  );
};

export default Dashboard;
