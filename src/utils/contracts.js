import { ethers } from "ethers";
import NFTUSDTokenABI from "../abi/NFTUSDTokenABI.json";
import NFTOracleABI from "../abi/NFTOracelABI.json";
import NDLTokenABI from "../abi/NDLTokenABI.json";
import StatbilityPoolABI from "../abi/StabilityPoolABI.json";
import ERC721ABI from "../abi/ERC721ABI.json";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

const NFTUSDTokenAddress = "0x94324D4fa26DCA3B84e28d523efAb9C6fAa2C361";
const NFTOracleAddress = "0xdcAef3b0411541d40743DAdD88c085C90D39534A";
const NDLAddress = "0x63c651c3F67d5a24fF6f2965cBD5c646323b4C33";
const PoolAddress = "0x9eE27629508d4dD270fF5430E38fD6E4d68288aA";
const LoanAddress = "0xF2b6756670a8c9e2609ED9756bc1FF07F8917b00";

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
