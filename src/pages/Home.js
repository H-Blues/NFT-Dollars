import React, { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import { Container, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { contracts } from "../utils/contracts";
import { convertToReadNumber, numberWithCommas } from "../utils/number";
import MaleFileImage from "../assets/MaleFile.svg";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import block1 from "../assets/index_block1.svg";
import block2 from "../assets/index_block2.svg";
import block3 from "../assets/index_block3.svg";
import { useWeb3React } from "@web3-react/core";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const BENEFITS = [
  {
    image: block1,
    advantage: "0% Interest Rate",
    description: "Liquity charges a small, one-time fee to borrow FRAX instead of highly variable interest rates.",
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
    description: "FRAX is a decentralized stablecoin capable of resisting all kinds of censorship.",
  },
];

const Home = () => {
  const navigate = useNavigate();
  const [lockedValue, setLockedValue] = useState("Loading...");
  const { chainId } = useWeb3React();
  const location = useLocation();
  const [alertOpen, setAlertOpen] = useState(true);

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
  };

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
        const lockedData = await contracts.pool.getTotalSecurityDeposit();
        setLockedValue(convertToReadNumber(lockedData));
      } catch (error) {
        console.error(error);
        return;
      }
    };

    if (chainId === 97) {
      fetchLockedData();
    }
  }, [chainId]);

  useEffect(() => {
    const isHome = location.pathname === "/";
    if (isHome) {
      document.body.classList.add("home-body");
    } else {
      document.body.classList.remove("home-body");
    }
    return () => {
      document.body.classList.remove("home-body");
    };
  }, [location]);

  return (
    <>
      <Snackbar
        open={alertOpen}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{ marginTop: "4%", width: "70%" }}
      >
        <Alert onClose={handleAlertClose} severity="warning">
          This project is running on the BSC Testnet. You can use the following credentials for testing.
          <br />
          <p>Address: 0xd610bBec46d26017Ee05Da79Dbee6dF1DF2a96B1</p>
          <p>Private Key: 47113c4a17df843d62661bff55ec319341774ff046a6a50ff2e7173c8a272603</p>
          <p>Available NFT Name: GameItem</p>
          <p> Available NFT IDs: 60, 61, 62, 63, 64</p>
          <p>Layer: Cross Layer</p>
        </Alert>
      </Snackbar>

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
        <Typography variant="h4"> Borrow FRAX against Your NFTs</Typography>
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
