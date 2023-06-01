export const numberWithCommas = (number) => {
  if (typeof number === "number") {
    return number.toLocaleString();
  }
  if (typeof number === "string" && !isNaN(Number(number))) {
    return Number(number).toLocaleString();
  }
  return number;
};

export const truncateAddress = (address) => {
  if (!address) return "No Account";
  const match = address.match(/^(0x[a-zA-Z0-9]{2})[a-zA-Z0-9]+([a-zA-Z0-9]{2})$/);
  if (!match) return address;
  return `${match[1]}…${match[2]}`;
};

export const toHex = (num) => {
  const val = Number(num);
  return "0x" + val.toString(16);
};
