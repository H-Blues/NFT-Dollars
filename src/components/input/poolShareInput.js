import React from "react";
import { Input } from "@material-tailwind/react";

const PoolShareInput = (props) => {
  const pool = 10000;

  return (
    <div className="md:w-full p-4">
      <div className="relative flex">
        <Input
          label="Pool share"
          value={"Pool Share"}
          disabled
          className="!bg-transparent !bg-white !bg-opacity-40"
        />
        <span className="!absolute right-1 top-2 rounded">{props.nftUSD / pool} %</span>
      </div>
    </div>
  );
};

export default PoolShareInput;
