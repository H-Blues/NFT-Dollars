import React, { useEffect, useState } from "react";
import { contracts } from "../../utils/contracts";
import { convertToReadNumber } from "../../utils/number";
import { useWeb3React } from "@web3-react/core";

const AvailableAmount = (props) => {
  const [accountDebt, setAccountDebt] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const { chainId, account } = useWeb3React();

  useEffect(() => {
    const getExtraction = async () => {
      try {
        const factors = await contracts.pool.healthFactor(account);
        const accountDebt = convertToReadNumber(factors[0]);
        const totalNFTValue = convertToReadNumber(factors[2]);
        setAccountDebt(parseFloat(accountDebt).toFixed(2));
        setTotalValue(parseFloat(totalNFTValue).toFixed(2));
      } catch (error) {
        console.error(error);
        return;
      }
    };

    if (chainId === 97 && account) {
      getExtraction();
    }
  }, [account, chainId]);

  return (
    <>
      {totalValue && (
        <div className="md:w-11/12 p-4">
          <div className="relative flex items-center justify-between h-10 bg-white bg-opacity-40 rounded p-2">
            <span className="font-bold rounded">
              Total Value: <span className="font-normal">{totalValue}</span>
            </span>
            <span className="left-auto rounded">
              <span className="font-bold">Debt:</span>{" "}
              <span className={`inline-block ${accountDebt > totalValue / 2 ? "text-red-500" : "text-green-500"}`}>
                {accountDebt}
              </span>
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default AvailableAmount;
