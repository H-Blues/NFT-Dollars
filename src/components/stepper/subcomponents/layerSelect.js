import React, { useState } from "react";
import { Box, Button, Select, MenuItem } from "@mui/material";
import { layerOptions, addressOptions, idOptions } from "../data/selectOptions";

const LayerSelect = ({ next, back }) => {
  const [layer, setLayer] = useState("");
  const [address, setAddress] = useState("");
  const [id, setId] = useState("");

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
    const selectedId = event.target.value;
    setId(selectedId);
  };

  const getAddressOptions = (layer) => {
    const selectedLayer = addressOptions.find((option) => option.layer === layer);
    return selectedLayer ? selectedLayer.addresses : [];
  };

  const getIdOptions = (address) => {
    const selectedAddress = idOptions.find((option) => option.address === address);
    const otherAddressOptions = idOptions.find((option) => option.address === "other");
    return selectedAddress ? selectedAddress.ids : otherAddressOptions.ids;
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Select
        value={layer}
        onChange={handleLayerChange}
        className="mb-4 w-full rounded-lg h-10 border-amber-100"
      >
        <MenuItem value="">Select Layer</MenuItem>
        {layerOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>

      <Select
        value={address}
        onChange={handleAddressChange}
        disabled={!layer}
        className="mb-4 w-full rounded-lg h-10"
      >
        <MenuItem value="">Select Address</MenuItem>
        {getAddressOptions(layer).map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>

      <Select
        value={id}
        onChange={handleIdChange}
        disabled={!address}
        className="mb-4 w-full rounded-lg h-10"
      >
        <MenuItem value="">Select ID</MenuItem>
        {getIdOptions(address).map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>

      <Box sx={{ mb: 1 }}>
        <div>
          <Button
            variant="contained"
            disabled={!id}
            onClick={next}
            sx={{
              mt: 1,
              mr: 1,
              backgroundColor: "orange",
              color: "white",
              "&:hover": {
                backgroundColor: "orange",
              },
            }}
          >
            Continue
          </Button>
          <Button disabled={true} onClick={back} sx={{ mt: 1, mr: 1 }}>
            Back
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default LayerSelect;
