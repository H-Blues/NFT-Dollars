import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";
import SuccessContextProvider from "./contexts/successContext";
import Home from "./pages/Home";
import NFT from "./pages/NFT";
import Borrow from "./pages/Borrow";
import RiskyTroves from "./pages/RiskyTroves";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import "./index.css";

const getLibrary = (provider) => {
  return new ethers.providers.Web3Provider(provider, "any");
};

const App = () => {
  return (
    <>
      <BrowserRouter>
        <SuccessContextProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nft" element={<NFT />} />
            <Route path="/borrow" element={<Borrow />} />
            <Route path="/riskyTroves" element={<RiskyTroves />} />
          </Routes>
          <Footer />
        </SuccessContextProvider>
      </BrowserRouter>
    </>
  );
};

const rootElement = createRoot(document.getElementById("root"));
const queryClient = new QueryClient();

rootElement.render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </Web3ReactProvider>
);
