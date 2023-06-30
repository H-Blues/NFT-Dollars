import React, { useState, useContext, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { Box, Button, Select, MenuItem } from "@mui/material";
import { layerOptions } from "../../data/selectOptions";
import { NFTSelectContext } from "../../../../contexts/nftSelectContext";
import { contracts } from "../../../../utils/contracts";
import { convertToReadNumber } from "../../../../utils/number";
import { getPoolNFT } from "../../../../utils/requests";
import USDInput from "../../../input/usdInput";

// import {getNFTAccountData} from "../../../utils/requests";

const PoolNFTSelect = ({ next, setNFTUSD }) => {
  const { layer, address, id, handleLayerChange, handleAddressChange, handleIdChange } = useContext(NFTSelectContext);
  const [nftList, setNFTList] = useState([]);
  const [userNFTUSD, setUserNFTUSD] = useState(0);
  const [isUpLayer] = useState(false);
  // const [isUpLayer, setIsUpLayer] = useState(false);
  const { account } = useWeb3React();

  const nftUsdChange = (value) => {
    setNFTUSD(value);
  };

  const getAddressOptions = async (layer) => {
    const nftList = await getPoolNFT(layer);
    setNFTList(nftList);
  };

  const getIdOptions = (address) => {
    const selectedAddress = nftList.find((option) => option.NftAddress === address);
    return selectedAddress ? selectedAddress.NftTokenList : [];
  };

  useEffect(() => {
    if (layer !== "") {
      getAddressOptions(layer);
    }
  }, [layer]);

  // useEffect(() => {
  //   const getIsUpLayer = async () => {
  //     const isUpLayer = await contracts.pool.getLoanCollateralAndReserve()
  //     setIsUpLayer(isUpLayer)
  //   }

  //   getIsUpLayer()
  // }, [address])

  useEffect(() => {
    const getUserNFTUSD = async () => {
      try {
        const userNFTUSD = await contracts.nftUSD.balanceOf(account);
        setUserNFTUSD(convertToReadNumber(userNFTUSD));
      } catch (error) {
        return;
      }
    };
    getUserNFTUSD();
  }, [account]);

  return (
    <div className="mt-2 w-full max-w-md mx-auto">
      <Select value={layer} onChange={handleLayerChange} className="mb-4 w-full rounded-lg h-10 border-amber-100">
        {layerOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      <Select value={address} disabled={!layer} className="mb-4 w-full rounded-lg h-10">
        {nftList.length !== 0 ? (
          nftList.map((option) => (
            <MenuItem
              key={option.NftAddress}
              value={option.NftAddress}
              onClick={(e) => {
                handleAddressChange(e, option.NftAddress);
              }}
            >
              {option.NftName}
            </MenuItem>
          ))
        ) : (
          <MenuItem key="default" value="">
            No NFT data
          </MenuItem>
        )}
      </Select>
      <div>
        <Select value={id} onChange={handleIdChange} disabled={!address} className="mb-1 w-full rounded-lg h-10">
          {nftList.length !== 0 &&
            getIdOptions(address).map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
        </Select>
      </div>

      {id && !isUpLayer && (
        <USDInput
          title="Unlock"
          tip="NFTUSD you would pay to unlock this NFT"
          inputValueChange={nftUsdChange}
          maxValue={userNFTUSD}
        />
      )}

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
          <Button disabled={true} sx={{ mt: 1, mr: 1 }}>
            Back
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default PoolNFTSelect;
