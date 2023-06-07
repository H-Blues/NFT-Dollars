import { contracts } from "./contracts";

// nftUSD obtained = nftUSD extracted - Security deposit
// Max nftUSD extracted = 7 days moving average floor price * Collection Score
// Collection Score = 1 – 6 months volatility in percentage + 0.003% * 7 days moving average sales
// Security deposit = nftUSD extracted * 10%

const calcExtractionAndCollateral = async (address) => {
  try {
    const [avgPrice7Days, avgSale7Days, volatility6Days] = await contracts.oracle.getAssetPrice(
      address
    );
    const collateral = 1 - volatility6Days * 0.0001 + 0.00003 * avgSale7Days;
    const maxExtraction = avgPrice7Days * 0.01 * collateral;

    return [maxExtraction, collateral];
  } catch (error) {
    console.error(error);
    // Handle the error here or rethrow it if necessary
    // Return a default value or an empty array if needed
    return [undefined, undefined];
  }
};

const calcSecurityDeposit = (nftUSD) => {
  return nftUSD * 0.1;
};

const calcObtained = (nftUSD) => {
  return nftUSD - calcSecurityDeposit(nftUSD);
};

const calculationFn = { calcExtractionAndCollateral, calcSecurityDeposit, calcObtained };

export default calculationFn;
