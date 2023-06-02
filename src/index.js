import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";
import Home from "./pages/Home";
import Borrow from "./pages/Borrow";
import Doc from "./pages/Doc";
import RiskyTroves from "./pages/RiskyTroves";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import "./index.css";

const getLibrary = (provider) => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 8000; // frequency provider is polling
  return library;
};

const App = () => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/doc" element={<Doc />}></Route>
          <Route path="/borrow" element={<Borrow />}></Route>
          <Route path="/record" element={<RiskyTroves />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </Web3ReactProvider>
  );
};

const rootElement = createRoot(document.getElementById("root"));
rootElement.render(<App />);
