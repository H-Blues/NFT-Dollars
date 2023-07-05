<p align="center">
  <a href="https://nftdollars.xyz/">
      <img
      src="https://nftdollars.xyz/static/media/logo.fe5370acff8ae9a9d70fd05a5556ba0e.svg"
      width="150px" alt="nftdollars-logo">
  </a>
</p>

<h3 align="center">NFT Dollars</h3>

<p align="center">
   Decentralized NFT Stablecoin Protocol
  <br>
  <a href="https://docs.nftdollars.xyz/"><strong>Documentation »</strong></a>
  <br>
</p>

<p align="center">
    <img src='https://tinyurl.com/mp2wu3xx' alt='bnb' />
    <img src="https://img.shields.io/badge/Ethereum-3C3C3D?style=for-the-badge&logo=Ethereum&logoColor=white" alt="eth"/>
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" width="120px" height="28px" alt="reacr" />
</p>

<p align="center">
  <a href="https://github.com/neo-project/neo/releases">
    <img src="https://badge.fury.io/gh/neo-project%2Fneo.svg" alt="Current neo version.">
  </a>
  <a href='https://coveralls.io/github/neo-project/neo'>
  </a>
  <a href="https://github.com/neo-project/neo/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License.">
  </a>
</p>

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Overview](#overview)
- [Project structure](#project-structure)
- [Main Features](#main-features)
  - [No Creditor](#no-creditor)
  - [Volatility-based LTV algorithm](#volatility-based-ltv-algorithm)
  - [Blind Box Redemption](#blind-box-redemption)
  - [Peer \& Pool Liquidation mechanism](#peer--pool-liquidation-mechanism)
- [User Cases](#user-cases)
  - [NFT Layers](#nft-layers)
  - [Extraction](#extraction)
  - [Liquidation](#liquidation)
  - [Redemption](#redemption)
- [FAQ](#faq)

## Overview

This repository is a decentralized NFT stablecoin protocol project based on the BNB Testnet blockchain.

It offers interest-free assets, like the stablecoin nftUSD, to NFT holders who use their NFTs as collateral. The value of the assets is backed by the locked NFTs, and nftUSD, being an ERC-20 token pegged to $1, can be used in any scenario.

The protocol provides a seamless experience for staking rewards, liquidation, and redemption, ensuring stakeholder satisfaction and nftUSD's value stability.

Visit the [whitebook](https://docs.nftdollars.xyz/) to get started.

## Project structure

An overview of the project folders can be seen below.

| Folder              | Content                   |
| ------------------- | ------------------------- |
| nftdollars-frontend | Responsible React project |
| nftdollars-contract | Hardhat build project     |

## Main Features

### No Creditor

It’s neither a P2Peer nor a P2Pool NFT finance protocol. You count on your own precious meme NFT.
Thus, it’s Interest Free!

### Volatility-based LTV algorithm

NFTdollars employs a unique extraction model to ensure price stability of the stablecoin. The contract utilizes volatility, specifically the percentage standard deviation, as the primary indicator. After conducting multidimensional analytics and analyzing factors such as unique holders, holdings per unique holders, minting and supply, volume, and sales, we determined that sales would serve as an auxiliary parameter.

### Blind Box Redemption

As we will incorporate a vast range of collections which do really have their own different value, we offer various options and SURPRISE for person who wants to redeem.

### Peer & Pool Liquidation mechanism

To ensure that the entire stablecoin supply remains fully backed by collateral, we have a sound
liquidation mechanism. Either a user of the stability pool can liquidate a risky account at the right time and will get nftUSD as rewards.

## User Cases

### NFT Layers

1.  **Unit Layer: freely redeem**

    NFT in this layer are priced smaller than and equal to 1000USD.

2.  **Cross Layer: redeem on request**

    NFT in this layer are priced from 1000USD (not included 1000) to 5000USD (included 5000) and upgrade from the Unit layer.

3.  **Reserve Layer: liquidation only**

    NFT in this layer are priced larger than 5000USD and upgrade from either the Unit layer or the Cross Layer.

### Extraction

To maintain price stability of the stablecoin, NFTdollars utilizes a distinguished extraction model. The contract employs volatility, measured as the percentage standard deviation, as the main indicator.

Users can lock their NFT on the contract and extract nftUSD according to the following formula:

```
nftUSD obtained = nftUSD extracted - Security deposit
```

The maximum nftUSD that can be extracted is calculated as:

```
Max nftUSD extracted = 7-day moving average floor price * Collection Score
```

The Collection Score is determined by:

```
Collection Score = 1 - (6 months volatility in percentage) + (0.003% * 7-day moving average sales)
```

A security deposit is required and calculated as 10% of the nftUSD extracted. This deposit serves as insurance in case of liquidation and can also be used as rewards for liquidators or stability providers. The actual percentage charged for the deposit is subject to the governance committee.

The amount of nftUSD extracted is automatically added to the user's account debt.

**Fees:** A one-time extraction fee of 4% denominated in NDL (the contract token Dollars) is charged.

**Interest rate:** Interest-free.

### Liquidation

NFTdollars provides two methods of liquidation:

1. **Individual Liquidator:** A liquidator can use their own nftUSD to liquidate the NFTs held by the target account at the 7-day moving average floor price. The liquidator receives a reward of 10% of the amount paid for the liquidation as the security deposit of the liquidated account.

2. **Stability Pool Liquidation:** The stability pool acts as a liquidator. If an account is at risk of liquidation, there is a 12-hour period for users to perform the liquidation. If no one completes the liquidation within that time or the liquidator fails to finish the process, the stability pool absorbs the remaining account debt and security deposit.

The liquidation receiver obtains the NFT, and if the liquidator fails to complete the liquidation within the specified time, the receiver is exempt from paying the extraction fee but still subject to the security deposit.

### Redemption

All redemption transaction only accepts nftUSD and a fee of 2% denominated in NDL will apply. This function takes place in two ways:

1. Automatically.
2. By redeemer’s choice as introduced in Asset Layer.

The value of redeemed NFT will only be deducted to the debt of the NFT owner. In case that the redemption amount exceeds the owner's account debt, the excess will be sent to the owner in nftUSD.

## FAQ

**Q: How to avoid liquidation?**

- Lock more NFTs in your account.
- Don’t always extract the maximum nftUSD.
- Repay some debt when close to liquidation.
