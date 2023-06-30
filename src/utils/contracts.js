import { ethers } from "ethers";
import NFTUSDTokenABI from "../abi/NFTUSDTokenABI.json";
import NFTOracleABI from "../abi/NFTOracelABI.json";
import NDLTokenABI from "../abi/NDLTokenABI.json";
import StatbilityPoolABI from "../abi/StabilityPoolABI.json";
import ERC721ABI from "../abi/ERC721ABI.json";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

const PoolAddress = "0x147A05E2360E7330Cfa292912d3A9f8200724ADa";
const NFTUSDTokenAddress = "0x7AC50F13b295415085fA99C15F6e80cF23C997ef";
const NDLAddress = "0xFc4059c6E481929A4a3932375EDF8EA510002dA0";
const NFTOracleAddress = "0x876100d2D74cE71A92138284719C885c7827e544";
const LoanAddress = "0xf9d8db3bfA9aE4089662526bBfa4954B9a188AAc";

const TokenContract = new ethers.Contract(NFTUSDTokenAddress, NFTUSDTokenABI.abi, provider);
const OracleContract = new ethers.Contract(NFTOracleAddress, NFTOracleABI.abi, provider);
const NDLContract = new ethers.Contract(NDLAddress, NDLTokenABI.abi, provider);
const PoolContract = new ethers.Contract(PoolAddress, StatbilityPoolABI.abi, signer);

const createNFTContract = (NFTaddress) => {
  const contract = new ethers.Contract(NFTaddress, ERC721ABI, signer);
  return contract;
};

export const contracts = {
  nftUSD: TokenContract,
  oracle: OracleContract,
  nftDollar: NDLContract,
  pool: PoolContract,
  loan: LoanAddress,
  createNFTContract,
};
