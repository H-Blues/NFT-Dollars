import React, { useState } from "react";
import { Button, Input, Typography } from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/24/solid";

const USDInput = (props) => {
  const [inputValue, setInputValue] = useState(0.0);
  const [exceedMax, setExceedMax] = useState(false);

  const handleChange = (event) => {
    const inputValue = event.target.value;

    if (parseFloat(inputValue) >= 0) {
      setInputValue(inputValue);
      props.inputValueChange(inputValue);
    } else if (inputValue === "") {
      setInputValue("");
      props.inputValueChange("");
    }

    if (parseFloat(inputValue) > props.maxValue) {
      setExceedMax(true);
    } else {
      setExceedMax(false);
    }
  };

  const setMaxValue = () => {
    setInputValue(props.maxValue);
    props.inputValueChange(props.maxValue);
    setExceedMax(false);
  };

  return (
    <div className="md:w-full p-4">
      <div className="relative flex">
        <Input
          type="number"
          color="orange"
          value={inputValue}
          label={props.title}
          onChange={handleChange}
          error={exceedMax}
        />
        <Button color="orange" size="sm" className="!absolute right-1 top-1 rounded" onClick={setMaxValue}>
          max
        </Button>
      </div>
      <Typography
        variant="small"
        className={`flex items-center gap-1 font-normal mt-2 ${exceedMax ? "text-red-500" : "text-gray-700"}`}
      >
        <InformationCircleIcon className="w-4 h-4 -mt-px" />
        {!exceedMax ? props.tip : "Your input exceeds the limitation "}
      </Typography>
    </div>
  );
};

export default USDInput;
