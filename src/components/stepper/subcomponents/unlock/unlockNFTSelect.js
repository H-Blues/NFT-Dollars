import React, { useState, useEffect, useContext } from "react";
import { Box, Button, Select, MenuItem } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { contracts } from "../../../../utils/contracts";
import { convertToReadNumber } from "../../../../utils/number";
import { SuccessContext } from "../../../../contexts/successContext";

const LockedNFTSelect = ({ next, nft, handleNFTChange }) => {
  const [nftList, setNFTList] = useState([]);
  const [userNFTUSD, setUserNFTUSD] = useState(0);
  const { account, chainId } = useWeb3React();
  const { nftOperSuccess } = useContext(SuccessContext);

  const getUserNFT = async () => {
    try {
      const userNFTUSD = await contracts.nftUSD.balanceOf(account);
      setUserNFTUSD(convertToReadNumber(userNFTUSD));

      const nftInfo = await contracts.pool.getAllLoanMessage(account);
      const nftList = [];
      for (let i = 0; i < nftInfo.length; i++) {
        const item = {
          loanId: nftInfo[i][0],
          address: nftInfo[i][3],
          name: nftInfo[i][4],
          id: convertToReadNumber(nftInfo[i][5], 0, 0),
          amount: convertToReadNumber(nftInfo[i][6]),
          type: nftInfo[i][8],
          isUpLayer: nftInfo[i][9],
        };
        nftList.push(item);
      }
      setNFTList(nftList);
    } catch (error) {
      console.error(error);
      return;
    }
  };

  useEffect(() => {
    if (chainId === 97) {
      getUserNFT();
    }
    // eslint-disable-next-line
  }, [account, nftOperSuccess]);

  return (
    <>
      <div className="md:flex space-x-10">
        <div className="mt-4 w-5/6">
          <Select
            value={nft}
            color="warning"
            onChange={handleNFTChange}
            disabled={!userNFTUSD}
            className="w-full rounded-lg h-10"
          >
            {nftList.length !== 0 ? (
              nftList
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((item) => (
                  <MenuItem key={item.loanId} value={item}>
                    {item.name} #{item.id}
                  </MenuItem>
                ))
            ) : (
              <MenuItem key="default" value="">
                No NFT data
              </MenuItem>
            )}
          </Select>
        </div>
      </div>

      <Box sx={{ mb: 1, mt: 1 }}>
        <div>
          <Button
            variant="contained"
            disabled={nft === ""}
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
    </>
  );
};

export default LockedNFTSelect;
