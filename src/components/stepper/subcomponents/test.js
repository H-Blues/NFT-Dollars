import { contracts } from "../../../utils/contracts";
import React, { useEffect, useState } from "react";

const getAddressOptions = async (layer) => {
  const result = await contracts.oracle.getAssets(layer);
  return result;
};

export const Test = () => {
  const [assets, setAssets] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAddressOptions(1);
      const [assetsAddressArray, namesArray, symbolsArray, urisArray] = result;
      const formattedAssets = assetsAddressArray.map((address, index) => ({
        address,
        name: namesArray[index],
        symbol: symbolsArray[index],
        uri: urisArray[index],
      }));

      setAssets(formattedAssets);
    };

    fetchData();
  }, []);

  if (!assets) {
    return <p>Loading</p>;
  }

  return (
    <div>
      {assets.map((asset) => (
        <p key={asset.address}>
          Address: {asset.address}, Name: {asset.name}, Symbol: {asset.symbol}, URI: {asset.uri}
        </p>
      ))}
    </div>
  );
};
