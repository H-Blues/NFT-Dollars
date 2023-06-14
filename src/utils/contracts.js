import { ethers } from "ethers";
import NFTUSDTokenABI from "../abi/NFTUSDTokenABI.json";
import NFTOracleABI from "../abi/NFTOracelABI.json";
import NDLTokenABI from "../abi/NDLTokenABI.json";
import StatbilityPoolABI from "../abi/StabilityPoolABI.json";
import ERC721ABI from "../abi/ERC721ABI.json";
import TestABI from "../abi/TestABI.json";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

const PoolAddress = "0x57514F3914A93C410ecEFDB629eA72eFC1Ec9c5A";
const NFTUSDTokenAddress = "0x538BaD52e87DA3a149Ef57588de71CE898DD4B4F";
const NDLAddress = "0xC4516212f7E897D75ceF54daf726784E6Ebbf162";
const NFTOracleAddress = "0xa212F39f6ad6e7f5719dEc7BD9Df4f49e317E777";
const LoanAddress = "0x9E876795a5674c77C3A02438435a044E137079A7";
const testAddress = "0x04309EF959b00C9B2D3f86d19df45B6585e45dd5";

const TokenContract = new ethers.Contract(NFTUSDTokenAddress, NFTUSDTokenABI.abi, provider);
const OracleContract = new ethers.Contract(NFTOracleAddress, NFTOracleABI.abi, provider);
const NDLContract = new ethers.Contract(NDLAddress, NDLTokenABI.abi, provider);
const PoolContract = new ethers.Contract(PoolAddress, StatbilityPoolABI.abi, signer);
const TestContract = new ethers.Contract(testAddress, TestABI.abi, provider);

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
  test: TestContract,
  createNFTContract,
};
