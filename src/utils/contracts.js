import { ethers } from "ethers";
import NFTUSDTokenABI from "../abi/NFTUSDTokenABI.json";
import NFTOracleABI from "../abi/NFTOracelABI.json";
import NDLTokenABI from "../abi/NDLTokenABI.json";
import StatbilityPoolABI from "../abi/StabilityPoolABI.json";
import ERC721ABI from "../abi/ERC721ABI.json";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

const PoolAddress = "0xDbf05EA877946b74f3E92001b71b22b710a1AB8a";
const NFTUSDTokenAddress = "0xf18eb401e2a0952440E74a0eD415531897201182";
const NDLAddress = "0xD9568b849b1E4101F6D8c4F3237557B95427fd7A";
const NFTOracleAddress = "0x9a25C3408fA5ca4732D48ca1dCB5062CCd8d87B0";
const LoanAddress = "0xb6B01596D31AbaBFE4BD5bFfCaAF98cB486e9735";

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
