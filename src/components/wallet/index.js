import React, { useEffect } from "react";
import { SvgIcon } from "@mui/material";
import { Dialog, DialogHeader, DialogBody, IconButton, Typography, MenuItem } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useWeb3React } from "@web3-react/core";

import { connectors } from "./connectors";
import { toHex } from "../../utils/number";
import { ReactComponent as MetamaskSvg } from "../../assets/metamask-logo.svg";
import { ReactComponent as WallerSvg } from "../../assets/index-wallet.svg";
import { ReactComponent as CoinbaseSvg } from "../../assets/index-coinbase.svg";

const Wallet = ({ open, onClose }) => {
  const { activate, library, chainId } = useWeb3React();

  const switchNetwork = async () => {
    const targetNetworkId = 97;
    try {
      await library.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: toHex(targetNetworkId) }],
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await library.provider.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: toHex(targetNetworkId),
                rpcUrls: ["https://endpoints.omniatech.io/v1/bsc/testnet/public"],
                chainName: "Binance Smart Chain Testnet",
                nativeCurrency: {
                  name: "tBNB",
                  symbol: "tBNB",
                  decimals: 18,
                },
              },
            ],
          });
        } catch (error) {
          console.error(error);
          return;
        }
      }
      return;
    }
  };

  const setProvider = (type) => {
    window.localStorage.setItem("provider", type);
  };

  useEffect(() => {
    const provider = window.localStorage.getItem("provider");
    if (provider === "injected") {
      activate(connectors.injected);
    } else if (provider === "walletConnect") {
      activate(connectors.walletConnect);
    } else if (provider === "coinbaseWallet") {
      activate(connectors.coinbaseWallet);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Dialog size="xs" open={open} handler={onClose}>
      <DialogHeader className="justify-between">
        <Typography variant="h5" color="blue-gray">
          Connect a Wallet
        </Typography>
        <IconButton color="blue-gray" size="sm" variant="text" onClick={onClose}>
          <XMarkIcon strokeWidth={2} className="h-5 w-5" />
        </IconButton>
      </DialogHeader>
      <DialogBody className="overflow-y-scroll pr-2">
        <div className="mb-6 ">
          <ul className="-ml-2 flex flex-col gap-1">
            <MenuItem
              className="flex items-center justify-center gap-3"
              onClick={() => {
                activate(connectors.injected);
                chainId !== 97 && switchNetwork();
                setProvider("injected");
                onClose();
              }}
            >
              <SvgIcon component={MetamaskSvg} className="h-6 w-6" />
              <Typography color="blue-gray" variant="h6">
                MetaMask
              </Typography>
            </MenuItem>

            <MenuItem
              className="flex items-center justify-center gap-3"
              onClick={() => {
                activate(connectors.walletConnect);
                chainId !== 97 && switchNetwork();
                setProvider("walletConnect");
                onClose();
              }}
            >
              <SvgIcon component={WallerSvg} className="h-6 w-6 rounded-md" />
              <Typography color="blue-gray" variant="h6">
                Wallet Connection
              </Typography>
            </MenuItem>

            <MenuItem
              className="flex items-center justify-center gap-3"
              onClick={() => {
                activate(connectors.coinbaseWallet);
                chainId !== 97 && switchNetwork();
                setProvider("coinbaseWallet");
                onClose();
              }}
            >
              <SvgIcon component={CoinbaseSvg} className="h-6 w-6 rounded-md" />
              <Typography color="blue-gray" variant="h6">
                Coinbase Wallet
              </Typography>
            </MenuItem>
          </ul>
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default Wallet;
