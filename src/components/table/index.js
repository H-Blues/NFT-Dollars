import React, { useState, useEffect } from "react";
import { SvgIcon } from "@mui/material";
import { Card, Typography, IconButton, Spinner } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon, ArrowPathIcon } from "@heroicons/react/24/outline";

import CopyButton from "./copyButton";
import { ReactComponent as EthLogo } from "../../assets/logos_ethereum.svg";
import { getRiskyHistoryNumber, getRiskyHistoryData } from "../../utils/requests";

const tableHead = ["Owner", "Collateral", "Debt(NFTUSD)", "Call Ratio"];

export default function RiskyTrovesTable() {
  const [active, setActive] = useState(1);
  const [pageNumber, setPageNumber] = useState(10);
  const [tableData, setTableData] = useState([]);

  const next = async () => {
    if (active === pageNumber) return;
    setActive(active + 1);
    setTableData(await getRiskyHistoryData(active + 1, 10));
  };

  const prev = async () => {
    if (active === 1) return;
    setActive(active - 1);
    setTableData(await getRiskyHistoryData(active - 1, 10));
  };

  const refreshData = async () => {
    const data = await getRiskyHistoryData(active, 10);
    setTableData(data);
    const pageNumber = Math.ceil((await getRiskyHistoryNumber()) / 10);
    setPageNumber(pageNumber);
  };

  useEffect(() => {
    refreshData();
  }, []);

  if (tableData.length === 0) {
    return (
      <div>
        <Typography variant="h3" color="white" className="flex mb-2">
          Risky Troves
        </Typography>
        <Spinner className="h-12 w-12" />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex w-full">
        <Typography variant="h3" color="white" className="flex mb-2">
          Risky Troves
        </Typography>
        <div className="flex ml-auto mt-2 gap-2">
          <IconButton size="sm" variant="text" color="blue-gray" onClick={refreshData}>
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
            <strong className="text-blue-gray-900">{pageNumber}</strong>
          </Typography>
          <IconButton
            size="sm"
            variant="outlined"
            color="blue-gray"
            onClick={next}
            disabled={active === pageNumber}
          >
            <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
          </IconButton>
        </div>
      </div>

      <Card className="overflow-scroll h-auto w-full bg-white bg-opacity-30">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {tableHead.map((head) => (
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
            {tableData.map(({ Address, Coll_ratio, Debt, Collateral }, index) => (
              <tr key={Address} className="even:bg-blue-gray-50/50">
                <td className="flex p-4">
                  <CopyButton textToCopy={Address} />
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {Address}
                  </Typography>
                </td>
                <td>
                  <div className="flex p-2">
                    <SvgIcon component={EthLogo} viewBox="0 0 18 18" />
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {Collateral}
                    </Typography>
                  </div>
                </td>
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {Debt}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {Coll_ratio}
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
