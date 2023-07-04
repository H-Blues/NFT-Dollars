import React, { createContext, useState } from "react";

export const NFTSelectContext = createContext();

export const NFTSelectContextProvider = ({ children }) => {
  const [layer, setLayer] = useState("");
  const [address, setAddress] = useState("");
  const [id, setId] = useState("");
  const [customId, setCustomId] = useState("");
  const [nftName, setNFTName] = useState("");
  const [maxExtraction, setMaxExtraction] = useState(0);
  const [isLayerUp, setIsLayerUp] = useState(false);
  const [threshold, setThreshold] = useState(100);

  const handleLayerChange = (event) => {
    const selectedLayer = event.target.value;
    setLayer(selectedLayer);
    setAddress("");
    setId("");
  };

  const handleAddressChange = (event, address) => {
    const nftName = event.target.innerText;
    setNFTName(nftName);
    setAddress(address);
    setId("");
  };

  const handleIdChange = (event) => {
    const id = event.target.value;
    setId(id === undefined ? "" : id);
  };

  const handleInputChange = (event) => {
    const customId = event.target.value;
    setCustomId(customId === undefined ? "" : customId);
  };

  const handleLayerUpChange = () => {
    setIsLayerUp(!isLayerUp);
  };

  const handleThresholdChange = (event) => {
    const regex = /^[1-9]\d*(\.\d+)?$/;
    const value = event.target.value;
    if (regex.test(value) && value > 100) {
      setThreshold(value);
    } else {
      setThreshold(100);
    }
  };

  const contextValue = {
    layer,
    address,
    id,
    customId,
    nftName,
    maxExtraction,
    isLayerUp,
    threshold,
    setLayer,
    setId,
    setAddress,
    handleLayerUpChange,
    handleThresholdChange,
    handleLayerChange,
    handleAddressChange,
    handleIdChange,
    handleInputChange,
    setMaxExtraction,
  };

  return <NFTSelectContext.Provider value={contextValue}>{children}</NFTSelectContext.Provider>;
};

export default NFTSelectContextProvider;
