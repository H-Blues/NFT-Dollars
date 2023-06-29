import React from "react";

const AvailableAmount = ({ accountDebt, totalValue }) => {
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
