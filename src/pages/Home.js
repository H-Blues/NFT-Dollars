import React, { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import MaleFileImage from "../assets/MaleFile.svg";
import block1 from "../assets/index_block1.svg";
import block2 from "../assets/index_block2.svg";
import block3 from "../assets/index_block3.svg";

const benefits = [
  {
    image: block1,
    advantage: "0% Interest Rate",
    description:
      "Liquity charges a small, one-time fee to borrow LUSD instead of highly variable interest rates.",
  },
  {
    image: block2,
    advantage: "110% Collateral Ratio",
    description:
      "Liquity's efficient liquidation mechanism allows users to get the most liquidity for their ETH. *Under normal operation.",
  },
  {
    image: block3,
    advantage: "Unstoppable Stablecoin",
    description: "LUSD is a decentralized stablecoin capable of resisting all kinds of censorship.",
  },
];

const Home = () => {
  const [lockedValue, setLockedValue] = useState(7547692844);

  return (
    <>
      <div
        className="-z-50 w-1/3 h-1/3 bg-div hidden lg:block bg-center bg-cover absolute absolute top-1/4 left-1/2 right-0 bottom-0 bg-no-repeat"
        style={{ backgroundImage: `url(${MaleFileImage})` }}
      ></div>
      <div className="max-w-5xl mx-auto grid grid-cols-3 absolute top-1/2 left-0 right-0 bottom-0 mt-48">
        {benefits.map(({ image, advantage, description }, index) => (
          <div className="bg-transparent p-8 rounded-lg relative">
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

      <Container maxWidth="lg" className="flex flex-col text-center text-white mt-64">
        <Typography variant="h1" className="text-bold uppercase">
          0% interest loans
        </Typography>
        <Typography variant="h4"> Borrow LUSC against ETH</Typography>
        <div className="flex flex-col mt-20 justify-center items-center space-y-4">
          <button className="w-1/4 py-3 mx-auto bg-transparent hover:bg-orange-500 text-white py-2 px-4 rounded-3xl border border-white border-solid transition-colors duration-300">
            <span className="font-bold text-lg">Borrow Now</span>
          </button>
          <button className="w-1/4 py-3 mx-auto bg-transparent hover:bg-orange-500 text-white py-2 px-4 rounded-3xl border border-white border-solid transition-colors duration-300">
            <span className="font-bold text-lg">Learn More</span>
          </button>
        </div>

        <div className="mt-10">
          <Typography variant="h6" className="text-uppercase font-bold">
            Total Value Locked
          </Typography>
          <Typography variant="h3" style={{ color: "#FFDD6F" }}>
            $ {new Intl.NumberFormat("en-US").format(lockedValue)}
          </Typography>
        </div>
      </Container>
    </>
  );
};

export default Home;
