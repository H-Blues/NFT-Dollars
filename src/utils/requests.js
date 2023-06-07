import axios from "axios";

const nftScanUrl = "https://restapi.nftscan.com/api/v2";
// Set the proxy in package.json
// const dataUrl = "http://20.231.201.88:4002/api";

export const getNFTAccountData = async (account, contract = "") => {
  const url = `${nftScanUrl}/account/own/${account}?erc_type=erc721&show_attribute=false&sort_field=&sort_direction=`;
  const apiKey = process.env.NFTSCAN_KEY;

  try {
    const response = await axios.get(url, {
      headers: {
        "X-API-KEY": apiKey,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in getNFTAccountData:", error);
    throw error;
  }
};

export const getRiskyHistoryNumber = async () => {
  try {
    const response = await axios.get(`/api/getCounts`);
    return response.data.data;
  } catch (error) {
    console.error("Error in getRiskyHistoryNumber:", error);
    throw error;
  }
};

export const getRiskyHistoryData = async (page, number) => {
  try {
    const response = await axios.get(`/api/riskyTroves?start=${page}&count=${number}`);
    return response.data.data;
  } catch (error) {
    console.error("Error in getRiskyHistoryData:", error);
    throw error;
  }
};
