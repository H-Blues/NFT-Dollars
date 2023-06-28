import React, { createContext, useState } from "react";

export const SuccessContext = createContext();

export const SuccessContextProvider = ({ children }) => {
  const [borrowSuccess, setBorrowSuccess] = useState(0);
  const [depositSuccess, setDepositSuccess] = useState(0);
  const [repaySuccess, setRepaySuccess] = useState(0);
  const [nftOperSuccess, setNFTOperSuccess] = useState(0);

  const addBorrowSuccess = () => {
    console.log("Borrow success: ", borrowSuccess + 1);
    setTimeout(() => {
      setBorrowSuccess(borrowSuccess + 1);
    }, 8000);
  };

  const addDepositSuccess = () => {
    console.log("Deposit success: ", depositSuccess + 1);
    setTimeout(() => {
      setDepositSuccess(depositSuccess + 1);
    }, 8000);
  };

  const addRepaySuccess = () => {
    console.log("Repay success: ", repaySuccess + 1);
    setTimeout(() => {
      setRepaySuccess(repaySuccess + 1);
    }, 15000);
  };

  const addNFTOperSuccess = () => {
    console.log("Lock/Unlock NFT success: ", nftOperSuccess + 1);
    setTimeout(() => {
      setNFTOperSuccess(nftOperSuccess + 1);
    }, 6000);
  };

  const contextValue = {
    borrowSuccess,
    depositSuccess,
    repaySuccess,
    nftOperSuccess,
    addBorrowSuccess,
    addDepositSuccess,
    addRepaySuccess,
    addNFTOperSuccess,
  };

  return <SuccessContext.Provider value={contextValue}>{children}</SuccessContext.Provider>;
};

export default SuccessContextProvider;
