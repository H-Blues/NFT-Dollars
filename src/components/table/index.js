import React from "react";
import { SvgIcon } from "@mui/material";
import { Card, Typography, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon, ArrowPathIcon } from "@heroicons/react/24/outline";

import CopyButton from "./copyButton";
import { ReactComponent as EthLogo } from "../../assets/logos_ethereum.svg";

const TABLE_HEAD = ["Owner", "Collateral", "Debt(NFTUSD)", "Call Ratio"];

const TABLE_ROWS = [
  {
    owner: "0x6B9e23C56C23f207c0d1bca0925836f59B2Ce82C",
    collateral: "ETH",
    debt: "500 NFTUSD",
    callRatio: "1.2",
  },
  {
    owner: "0x9F3A7F9Dc7d5AbFcA49DD29D8Db66211eAd18484",
    collateral: "BTC",
    debt: "800 NFTUSD",
    callRatio: "0.9",
  },
  {
    owner: "0x3A46D245EF28C25e73F1c79C92C5a42245678090",
    collateral: "ETH",
    debt: "300 NFTUSD",
    callRatio: "1.5",
  },
  {
    owner: "0x4878d1D8B2496E7aE5722bDa45c21AB1a0d8Fb01",
    collateral: "BTC",
    debt: "700 NFTUSD",
    callRatio: "0.8",
  },
  {
    owner: "0xCf6dF08F24Cb0aC6e131e0db9185FbdDEcB3f6F1",
    collateral: "ETH",
    debt: "400 NFTUSD",
    callRatio: "1.1",
  },
  {
    owner: "0x3A46D245EF28C25e73F1c79C92C5a42245678090",
    collateral: "ETH",
    debt: "300 NFTUSD",
    callRatio: "1.5",
  },
  {
    owner: "0x4878d1D8B2496E7aE5722bDa45c21AB1a0d8Fb01",
    collateral: "BTC",
    debt: "700 NFTUSD",
    callRatio: "0.8",
  },
  {
    owner: "0xCf6dF08F24Cb0aC6e131e0db9185FbdDEcB3f6F1",
    collateral: "ETH",
    debt: "400 NFTUSD",
    callRatio: "1.1",
  },
  {
    owner: "0x4878d1D8B2496E7aE5722bDa45c21AB1a0d8Fb01",
    collateral: "BTC",
    debt: "700 NFTUSD",
    callRatio: "0.8",
  },
  {
    owner: "0xCf6dF08F24Cb0aC6e131e0db9185FbdDEcB3f6F1",
    collateral: "ETH",
    debt: "400 NFTUSD",
    callRatio: "1.1",
  },
];

export default function Example() {
  const [active, setActive] = React.useState(1);

  const next = () => {
    if (active === 10) return;

    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;

    setActive(active - 1);
  };

  return (
    <div className="flex flex-col">
      <div className="flex w-full">
        <Typography variant="h3" color="white" className="flex mb-2">
          Risky Troves
        </Typography>
        <div className="flex ml-auto mt-2 gap-2">
          <IconButton size="sm" variant="text" color="blue-gray">
            <ArrowPathIcon strokeWidth={2} className="h-4 w-4" />
          </IconButton>
          <IconButton
            size="sm"
            variant="outlined"
            color="blue-gray"
            onClick={prev}
            disabled={active === 1}
          >
            <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
          </IconButton>
          <Typography color="gray" variant="small" className="font-normal mt-1">
            Page <strong className="text-blue-gray-900">{active}</strong> of{" "}
            <strong className="text-blue-gray-900">10</strong>
          </Typography>
          <IconButton
            size="sm"
            variant="outlined"
            color="blue-gray"
            onClick={next}
            disabled={active === 10}
          >
            <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
          </IconButton>
        </div>
      </div>

      <Card className="overflow-scroll h-auto w-full bg-white bg-opacity-30">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="border-b border-blue-gray-100 bg-white bg-opacity-80 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map(({ owner, collateral, debt, callRatio }, index) => (
              <tr key={owner} className="even:bg-blue-gray-50/50">
                <td className="flex p-4">
                  <CopyButton textToCopy={owner} />
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {owner}
                  </Typography>
                </td>
                <td>
                  <div className="flex p-2">
                    <SvgIcon component={EthLogo} viewBox="0 0 18 18" />
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {collateral}
                    </Typography>
                  </div>
                </td>
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {debt}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {callRatio}
                  </Typography>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
