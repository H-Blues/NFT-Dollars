import { ethers } from "ethers";
import NFTUSDTokenABI from "../abi/NFTUSDTokenABI.json";
import NFTOracleABI from "../abi/NFTOracelABI.json";
import NDLTokenABI from "../abi/NDLTokenABI.json";
import StatbilityPoolABI from "../abi/StabilityPoolABI.json";
import ERC721ABI from "../abi/ERC721ABI.json";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

const PoolAddress = "0x1453D183B516fd6FFa31662a834A5B160a012fE7";
const NFTUSDTokenAddress = "0x4962125f3635313220C9fF5254cF18d2059BB726";
const NDLAddress = "0xe5256a6E91c0Fe913D1DA2b7F728A3Ec6266e534";
const NFTOracleAddress = "0x221f35a5c80A542A4D91301Bb9A048c8e3A5DD67";
const LoanAddress = "0xaD14200DB72D89aC549377e88F6eA80e6A49F396";

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
