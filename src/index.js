import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Web3ReactProvider, useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import SuccessContextProvider, { SuccessContext } from "./contexts/successContext";
import Home from "./pages/Home";
import Borrow from "./pages/Borrow";
import RiskyTroves from "./pages/RiskyTroves";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import "./index.css";

const getLibrary = (provider) => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 8000; // frequency provider is polling
  return library;
};

const queryClient = new QueryClient();

const App = () => {
  const [chainId, setChainId] = useState(null);
  const { active } = useWeb3React();

  // Get chainId before wallet connected
  useEffect(() => {
    if (window.ethereum) {
      setChainId(parseInt(window.ethereum.chainId, 16));
      window.ethereum.on("chainChanged", (id) => {
        setChainId(parseInt(id, 16));
      });
    }
  }, []);

  // Get chainId after wallet connected
  useEffect(() => {
    if (active) {
      getLibrary(window.ethereum)
        .getNetwork()
        .then((network) => {
          setChainId(network.chainId);
        });
    }
  }, [active]);

  return (
    <>
      {chainId === 97 ? (
        <BrowserRouter>
          <SuccessContextProvider>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/borrow" element={<Borrow />} />
              <Route path="/riskyTroves" element={<RiskyTroves />} />
            </Routes>
            <Footer />
          </SuccessContextProvider>
        </BrowserRouter>
      ) : (
        <div className="flex flex-col h-screen justify-center">
          <p className="text-center">⚠️ Please switch network to BSC Testnet!</p>
        </div>
      )}
    </>
  );
};

const rootElement = createRoot(document.getElementById("root"));
rootElement.render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </Web3ReactProvider>
);
