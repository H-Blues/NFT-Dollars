import { useContext, useEffect, useState } from "react";
import { Avatar, Card, CardHeader, CardBody, Typography } from "@material-tailwind/react";
import { List, ListItem, Divider } from "@mui/material";
import { ArrowTrendingUpIcon } from "@heroicons/react/24/outline";

import userIcon from "../../assets/png/user.png";
import walletLeft from "../../assets/wallet-leftAnimal.svg";
import walletRight from "../../assets/wallet-rightAnimal.svg";
import { contracts } from "../../utils/contracts";
import { convertToReadNumber } from "../../utils/number";
import { SuccessContext } from "../../contexts/successContext";
import { useWeb3React } from "@web3-react/core";
import { getRiskyHistoryNumber } from "../../utils/requests";

const Dashboard = () => {
  const [address, setAddress] = useState(0);
  const [ndlSupply, setNDLSupply] = useState(0);
  const [nftUSDSupply, setNFTUSDSupply] = useState(0);
  const [nftUSDInPool, setNFTUSDInPool] = useState(0);
  const [extractionFee, setExtractionFee] = useState(0);
  const [securityDeposit, setSecurityDeposit] = useState(0);

  const { borrowSuccess, depositSuccess, repaySuccess, withdrawSuccess } = useContext(SuccessContext);
  const { chainId } = useWeb3React();

  const data = [
    { type: "Borrowing Fee", value: "4.00%" },
    { type: "Address", value: address },
    { type: "NFT Dollars supply", value: ndlSupply },
    { type: "FRAX supply", value: nftUSDSupply },
    { type: "FRAX in Stability Pool", value: nftUSDInPool },
    { type: "Total Extraction Fee", value: extractionFee },
    { type: "Total Security Deposit", value: securityDeposit },
  ];

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const address = await getRiskyHistoryNumber();
        const ndlSupply = await contracts.nftDollar.totalSupply();
        const nftUSDSupply = await contracts.nftUSD.totalSupply();
        const nftUSDInPool = await contracts.pool.getTotalSecurityDeposit();
        const totalExtractionFee = await contracts.pool.getTotalExtractionFee();
        const totalSecurityDeposit = await contracts.pool.getTotalSecurityDeposit();
        setAddress(address);
        setNDLSupply(convertToReadNumber(ndlSupply));
        setNFTUSDSupply(convertToReadNumber(nftUSDSupply));
        setNFTUSDInPool(convertToReadNumber(nftUSDInPool));
        setExtractionFee(convertToReadNumber(totalExtractionFee));
        setSecurityDeposit(convertToReadNumber(totalSecurityDeposit));
      } catch (error) {
        // console.error(error);
        return;
      }
    };

    chainId === 97 && fetchDashboardData();
    // eslint-disable-next-line
  }, [borrowSuccess, depositSuccess, repaySuccess, withdrawSuccess, chainId]);

  return (
    <Card className="ml-6 mt-12 p-8 w-11/12 xl:mr-12 xl:ml-0 bg-transparent bg-white bg-opacity-50 border-2 border-gray-700">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 mb-8 rounded-none border-b border-gray-700 pb-8 text-center"
      >
        <div className="flex items-center mb-4 justify-center">
          <ArrowTrendingUpIcon strokeWidth={2} color="black" className="h-12 w-12" />
          <Typography variant="h3" className="ml-2 font-normal font-bold text-black">
            Liquity Statistics
          </Typography>
        </div>

        {/* Price */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex mt-4 text-black ml-14 xl:ml-0">
            <Avatar src={userIcon} alt="avatar" className="h-20 w-20 xl:h-14 xl:w-14" />
            <div className="flex flex-col items-start">
              <p className="ml-4 text-2xl xl:text-sm xl:ml-1">Price</p>
              <p className="ml-4 font-bold xl:ml-1">$131.0938</p>
            </div>
          </div>

          <div className="flex gap-16 xl:gap-4 text-black">
            {/* NFTdollars */}
            <div className="flex flex-col items-start">
              <p className="text-xl xl:text-xs">NDL</p>
              <p className="font-bold">$1.00</p>
              <p className="text-xl xl:text-xs mt-2">Market</p>
              <div className="flex gap-1">
                <Avatar src={walletLeft} alt="avatar" className="h-6 w-6" />
                <Avatar src={walletRight} alt="avatar" className="h-6 w-6" />
              </div>
            </div>

            {/* NFTUSD */}
            <div className="flex flex-col items-start">
              <p className="text-xl xl:text-xs">FRAX</p>
              <p className="font-bold">$1.00</p>
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
        <Typography variant="h5" className="text-black">
          Protocol
        </Typography>
        <div className="ml-0">
          <List dense={true} sx={{ marginLeft: "-18px" }}>
            {data.map((item, index) => (
              <div key={index}>
                {/* Data item */}
                <ListItem>
                  <span className="text-black">{item.type}</span>
                  <span className="ml-auto text-black">{item.value}</span>
                </ListItem>
                {/* Divider */}
                <Divider />
              </div>
            ))}
          </List>
        </div>
      </CardBody>
    </Card>
  );
};

export default Dashboard;
