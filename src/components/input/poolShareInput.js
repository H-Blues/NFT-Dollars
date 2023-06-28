import React, { useEffect, useState } from "react";
import { Input } from "@material-tailwind/react";
import { contracts } from "../../utils/contracts";
import { convertToReadNumber } from "../../utils/number";
import { useWeb3React } from "@web3-react/core";

const PoolShareInput = (props) => {
  const [pool, setPool] = useState(null);
  const { chainId } = useWeb3React();

  useEffect(() => {
    const getTotalUSDDeposit = async () => {
      try {
        const totalDeposit = await contracts.pool.getTotalNFTUSDDeposits();
        setPool(convertToReadNumber(totalDeposit));
      } catch (error) {
        console.error(error);
        return;
      }
    };

    if (chainId === 97) {
      getTotalUSDDeposit();
    }
  });

  return (
    <>
      {pool && (
        <div className="md:w-full p-4">
          <div className="relative flex">
            <Input
              label="Pool share"
              value={"Pool Share"}
              disabled
              className="!bg-transparent !bg-white !bg-opacity-40"
            />
            <span className="!absolute right-1 top-2 rounded">
              {((props.nftUSD / pool) * 100).toFixed(3)} %
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default PoolShareInput;
