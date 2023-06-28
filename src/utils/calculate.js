import { contracts } from "./contracts";
import { convertToReadNumber } from "./number";

// nftUSD obtained = nftUSD extracted - Security deposit
// Max nftUSD extracted = 7 days moving average floor price * Collection Score
// Collection Score = 1 – 6 months volatility in percentage + 0.003% * 7 days moving average sales
// Security deposit = nftUSD extracted * 10%

const calcExtraction = async (address) => {
  try {
    const maxExtraction = await contracts.oracle.getFinalPrice(address);
    return parseFloat(convertToReadNumber(maxExtraction)).toFixed(4);
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

const calcSecurityDeposit = (nftUSD) => {
  const securityDeposit = nftUSD * 0.1;
  return securityDeposit.toFixed(4);
};

const calcObtained = (nftUSD) => {
  const obtained = nftUSD - calcSecurityDeposit(nftUSD);
  return obtained.toFixed(4);
};

const calculationFn = { calcExtraction, calcSecurityDeposit, calcObtained };

export default calculationFn;
