import React, { createContext, useState } from "react";

export const UsdDepositContext = createContext();

export const UsdDepositContextProvider = ({ children }) => {
  const [nftUSD, setNftUsd] = useState("");
  const nftUsdChange = (value) => {
    setNftUsd(value);
  };
  return <UsdDepositContext.Provider value={contextValue}>{children}</UsdDepositContext.Provider>;
};

export default UsdDepositContextProvider;
