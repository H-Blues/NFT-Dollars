import { contracts } from "./contracts";

// nftUSD obtained = nftUSD extracted - Security deposit
// Max nftUSD extracted = 7 days moving average floor price * Collection Score
// Collection Score = 1 – 6 months volatility in percentage + 0.003% * 7 days moving average sales
// Security deposit = nftUSD extracted * 10%

const calculateData = async (nftUSD, nftAddress) => {
  try {
    const nftUSDFloat = parseFloat(nftUSD);
    const [sevenDaysAvgPrice, sevenDaysAvgSale, sixDaysVolatility] =
      await contracts.oracle.getAssetPrice(nftAddress);

    const collateral = 1 - sixDaysVolatility * 0.0001 + 0.00003 * sevenDaysAvgSale;
    const maxExtraction = sevenDaysAvgPrice * 0.01 * collateral;
    const liquidationPrice = nftUSDFloat;
    const securityDeposit = nftUSDFloat * 0.1;
    const obtained = nftUSDFloat - securityDeposit;

    const dataList = [
      {
        type: "Max Extraction",
        value: `${maxExtraction} nftUSD`,
      },
      {
        type: "Collateral Ratio",
        value: `${collateral}%`,
      },
      {
        type: "Liquidation Price",
        value: `${liquidationPrice} nftUSD`,
      },
      {
        type: "Security Deposit",
        value: `${securityDeposit} nftUSD`,
      },
      {
        type: "Obtained",
        value: `${obtained} nftUSD`,
      },
    ];

    return dataList;
  } catch (error) {
    console.error("Error in calculateData:", error);
    throw error;
  }
};

export default calculateData;
