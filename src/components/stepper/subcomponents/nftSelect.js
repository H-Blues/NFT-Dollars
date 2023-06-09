import React, { useState, useContext } from "react";
import { Box, Button, Select, MenuItem } from "@mui/material";
import { layerOptions, addressOptions, idOptions } from "../data/selectOptions";
import { Input, Typography } from "@material-tailwind/react";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import { NFTSelectContext } from "../../../contexts/nftSelectContext";
// import {getNFTAccountData} from "../../../utils/requests";
// import { contracts } from "../../../utils/contracts";

const IdSelect = ({ id, address, handleIdChange, getIdOptions, handleLinkClick }) => {
  return (
    <>
      <Select
        value={id}
        onChange={handleIdChange}
        disabled={!address}
        className="mb-1 w-full rounded-lg h-10"
      >
        {getIdOptions(address).map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>

      {address && (
        <Typography
          variant="small"
          color="gray"
          className="flex items-center gap-1 font-normal mt-0"
        >
          <QuestionMarkCircleIcon className="w-4 h-4 -mt-px" />
          Not found NFT in this collection?
          <span onClick={handleLinkClick} className="underline cursor-pointer">
            Enter your NFT ID manually.
          </span>
        </Typography>
      )}
    </>
  );
};

const IdInput = ({ customId, address, handleInputChange, handleLinkClick }) => {
  return (
    <>
      <Input
        value={customId}
        disabled={!address}
        onChange={handleInputChange}
        label="Enter your NFT ID"
        color="gray"
        className="mb-1 w-full"
      />
      <span onClick={handleLinkClick} className="underline  cursor-pointer">
        <Typography variant="small" color="gray" className="flex items-center gap-1 font-normal">
          <ArrowUturnLeftIcon className="w-4 h-4 -mt-px" />
          Back to choose your NFT
        </Typography>
      </span>
    </>
  );
};

const NFTSelect = ({ next }) => {
  const {
    layer,
    address,
    id,
    customId,
    handleLayerChange,
    handleAddressChange,
    handleIdChange,
    handleInputChange,
  } = useContext(NFTSelectContext);

  const [isInputMode, setIsInputMode] = useState(false);

  const handleLinkClick = (event) => {
    setIsInputMode(!isInputMode);
    handleIdChange(event);
    handleInputChange(event);
  };

  const getAddressOptions = (layer) => {
    const selectedLayer = addressOptions.find((option) => option.layer === layer);
    return selectedLayer ? selectedLayer.addresses : [];
  };

  const getIdOptions = (address) => {
    // const selectedAddress = await getNFTAccountData(address);
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
        {getAddressOptions(layer).map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>

      <div>
        {isInputMode ? (
          <IdInput
            customId={customId}
            address={address}
            handleInputChange={handleInputChange}
            handleLinkClick={handleLinkClick}
          />
        ) : (
          <IdSelect
            id={id}
            address={address}
            handleIdChange={handleIdChange}
            getIdOptions={getIdOptions}
            handleLinkClick={handleLinkClick}
          />
        )}
      </div>

      <Box sx={{ mb: 1 }}>
        <div>
          <Button
            variant="contained"
            disabled={!id && !customId}
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
          <Button disabled={true} sx={{ mt: 1, mr: 1 }}>
            Back
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default NFTSelect;
