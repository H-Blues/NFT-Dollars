import { ethers } from "ethers";
import NFTUSDTokenABI from "../abi/NFTUSDTokenABI.json";
import NFTOracleABI from "../abi/NFTOracelABI.json";
import NDLTokenABI from "../abi/NDLTokenABI.json";
import StatbilityPoolABI from "../abi/StabilityPoolABI.json";
import ERC721ABI from "../abi/ERC721ABI.json";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

const PoolAddress = "0x44c055893481Bafe02C33d9dF9509dC3A8ed38CB";
const NFTUSDTokenAddress = "0xdD79971B0691D1F0808e687E2A8235B12a41C374";
const NDLAddress = "0xffb4079364dC03f9Bc8B2Ce4beb272b45676B006";
const NFTOracleAddress = "0x9B0D822B99c447f91b7372Ded8FD353643295DBB";
const LoanAddress = "0x2f2a4da68A00277c4Cd8cA70E9545648C19d716F";

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
