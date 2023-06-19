import React, { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import { Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { contracts } from "../utils/contracts";
import { convertToReadNumber, numberWithCommas } from "../utils/number";
import MaleFileImage from "../assets/MaleFile.svg";
import block1 from "../assets/index_block1.svg";
import block2 from "../assets/index_block2.svg";
import block3 from "../assets/index_block3.svg";
import { useWeb3React } from "@web3-react/core";

const BENEFITS = [
  {
    image: block1,
    advantage: "0% Interest Rate",
    description:
      "Liquity charges a small, one-time fee to borrow NFTUSD instead of highly variable interest rates.",
  },
  {
    image: block2,
    advantage: "110% Collateral Ratio",
    description:
      "Liquity's efficient liquidation mechanism allows users to get the most liquidity for their NFT. *Under normal operation.",
  },
  {
    image: block3,
    advantage: "Unstoppable Stablecoin",
    description:
      "NFTUSD is a decentralized stablecoin capable of resisting all kinds of censorship.",
  },
];

const Home = () => {
  const [lockedValue, setLockedValue] = useState(7547692844);
  const { chainId } = useWeb3React();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      const paddingBottom = window.innerWidth > 768 ? "130vh" : "180vh";
      document.body.style.paddingBottom = paddingBottom;
    };
    handleResize();
    window.addEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchLockedData = async () => {
      try {
        const lockedData = await contracts.pool.getTotalNFTUSDDeposits();
        setLockedValue(convertToReadNumber(lockedData));
      } catch (error) {
        console.error(error);
        return;
      }
    };
    chainId === 97 && fetchLockedData();
  }, [chainId]);

  return (
    <>
      {/* Background Image */}
      <div
        className="-z-50 w-1/3 h-1/3 bg-div hidden lg:block bg-center bg-cover absolute absolute top-1/4 left-1/2 right-0 bottom-0 bg-no-repeat"
        style={{ backgroundImage: `url(${MaleFileImage})` }}
      ></div>

      {/* Benefits Section */}
      <div className="max-w-5xl mx-auto grid grid-cols-3 absolute top-1/2 left-0 right-0 bottom-0 mt-48">
        {BENEFITS.map(({ image, advantage, description }, index) => (
          <div key={index} className="bg-transparent p-8 rounded-lg relative">
            {index !== 0 && (
              <div
                style={{ width: "1px", height: "300px", backgroundColor: "#FBF8F0" }}
                className="absolute top-0 left-0 transform -translate-x-1/2"
              ></div>
            )}
            <img src={image} alt={advantage} className="w-10 h-10 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-center mb-2">{advantage}</h3>
            <p className="text-gray-600 text-left ">{description}</p>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <Container maxWidth="lg" className="flex flex-col text-center text-white mt-64">
        <Typography variant="h1" className="text-bold uppercase">
          0% interest loans
        </Typography>
        <Typography variant="h4"> Borrow NFTUSD against Your NFTs</Typography>
        <div className="flex flex-col mt-20 justify-center items-center space-y-4">
          <Button
            className="w-1/4 normal-case bg-transparent hover:bg-orange-500 text-white py-2 px-4 rounded-3xl border border-white border-solid transition-colors duration-300"
            onClick={() => {
              navigate("/borrow");
            }}
          >
            <span className="w-full font-bold text-lg">Borrow Now</span>
          </Button>
          <Button
            className="w-1/4 normal-case bg-transparent hover:bg-orange-500 text-white py-2 px-4 rounded-3xl border border-white border-solid transition-colors duration-300"
            onClick={() => {
              // navigate("/doc");
              window.location.href = "https://docs.nftdollars.xyz/";
            }}
          >
            <span className="w-full font-bold text-lg">Learn More</span>
          </Button>
        </div>
        <div className="mt-10">
          <Typography variant="h6" className="text-uppercase font-bold">
            Total Value Locked
          </Typography>
          <Typography variant="h3" style={{ color: "#FFDD6F" }}>
            $ {numberWithCommas(lockedValue)}
          </Typography>
        </div>
      </Container>
    </>
  );
};

export default Home;
