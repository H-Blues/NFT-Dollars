import React, { createContext, useState } from "react";

export const NFTSelectContext = createContext();

export const NFTSelectContextProvider = ({ children }) => {
  const [layer, setLayer] = useState("");
  const [address, setAddress] = useState("");
  const [id, setId] = useState("");
  const [customId, setCustomId] = useState("");
  const [nftUSD, setNftUsd] = useState(0);

  const handleLayerChange = (event) => {
    const selectedLayer = event.target.value;
    setLayer(selectedLayer);
    setAddress("");
    setId("");
  };

  const handleAddressChange = (event) => {
    const selectedAddress = event.target.value;
    setAddress(selectedAddress);
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

  const contextValue = {
    layer,
    address,
    id,
    customId,
    nftUSD,
    setNftUsd,
    handleLayerChange,
    handleAddressChange,
    handleIdChange,
    handleInputChange,
  };

  return <NFTSelectContext.Provider value={contextValue}>{children}</NFTSelectContext.Provider>;
};

export default NFTSelectContextProvider;
