import axios from "axios";

const fetchNFTAccountData = async (account, contract = "") => {
  const url = `https://restapi.nftscan.com/api/v2/account/own/${account}?erc_type=erc721&show_attribute=false&sort_field=&sort_direction=`;
  const apiKey = process.env.NFTSCAN_KEY;

  try {
    const response = await axios.get(url, {
      headers: {
        "X-API-KEY": apiKey,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export default fetchNFTAccountData;
