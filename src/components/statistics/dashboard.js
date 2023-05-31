import { Avatar, Card, CardHeader, CardBody, Typography, Button } from "@material-tailwind/react";
import { ArrowTrendingUpIcon } from "@heroicons/react/24/outline";
import priceIcon from "../../assets/avatar.svg";
import walletLeft from "../../assets/wallet-leftAnimal.svg";
import walletRight from "../../assets/wallet-rightAnimal.svg";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Divider } from "@mui/material";

const dataList = [
  { type: "Borrowing Fee", value: "0.50%" },
  { type: "TVL", value: "399K ETH" },
  { type: "Troves", value: 50 },
  { type: "NFTUSD supply", value: 2000 },
  { type: "NFTUSD in Stability Pool", value: 500 },
  { type: "Staked NFTdollars", value: 100 },
  { type: "NFTUSD in Stability Pool", value: 300 },
  { type: "Recovery Mode", value: "No" },
  { type: "Recovery Mode Price Threshold", value: 0.9 },
  { type: "Kickback Rate", value: 0.2 },
];

export default function Dashboard() {
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

        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex mt-4 text-white ml-14 xl:ml-0">
            <Avatar src={priceIcon} alt="avatar" className="h-20 w-20 xl:h-14 xl:w-14" />
            <div className="flex flex-col items-start">
              <p className="ml-4 text-2xl xl:text-sm xl:ml-1">Price</p>
              <p className="ml-4 font-bold xl:ml-1">$131.0938</p>
            </div>
          </div>
          <div className="flex gap-16 xl:gap-4 text-white">
            <div className="flex flex-col items-start">
              <p className="text-xl xl:text-xs">NFTdollars</p>
              <p className="font-bold">$11.02</p>
              <p className="text-xl xl:text-xs mt-2">Market</p>
              <div className="flex gap-1">
                <Avatar src={walletLeft} alt="avatar" className="h-6 w-6" />
                <Avatar src={walletRight} alt="avatar" className="h-6 w-6" />
              </div>
            </div>
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

      <CardBody className="p-0 ml-8 xl:ml-0">
        <Typography variant="h5" color="white">
          Protocol
        </Typography>
        <div className="ml-0">
          <List dense="true" sx={{ marginLeft: "-18px" }}>
            {dataList.map((item, index) => (
              <>
                <ListItem key={index}>
                  <span className="text-white">{item.type}</span>
                  <span className="ml-auto text-white">{item.value}</span>
                </ListItem>
                <Divider sx={{ backgroundColor: "white" }} />
              </>
            ))}
          </List>
        </div>
      </CardBody>
    </Card>
  );
}
