import { ethers } from "ethers";
import NFTUSDTokenABI from "../abi/NFTUSDTokenABI.json";
import NFTOracle from "../abi/NFTOracelABI.json";
import NDLTokenABI from "../abi/NDLTokenABI.json";

const provider = new ethers.providers.JsonRpcProvider(`https://bsc-testnet.publicnode.com`);

const NFTUSDTokenAddress = "0x619bFFa6411aEC6c8A8dE9d9Ea117D9006baa60A";
const NFTOracleAddress = "0xa88cd85DF8559f92709fe59331b937e60200fA05";
const NDLAddress = "0x80B474FacB1c2627Ed403e6650349D93Be35dE60";

const TokenContract = new ethers.Contract(NFTUSDTokenAddress, NFTUSDTokenABI.abi, provider);
const OracleContract = new ethers.Contract(NFTOracleAddress, NFTOracle.abi, provider);
const NDLContract = new ethers.Contract(NDLAddress, NDLTokenABI.abi, provider);

export const contracts = {
  nftUSD: TokenContract,
  oracle: OracleContract,
  nftDollar: NDLContract,
};
