import React, { useEffect, useState } from "react";
import { Button, Input, Typography } from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/24/solid";

const USDInput = (props) => {
  const [inputValue, setInputValue] = useState(props.minValue || 0);
  const [error, setError] = useState(false);
  const [tip, setTip] = useState(props.tip);

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
      setTip("Your input exceeds your balance.");
      setError(true);
    } else if (parseFloat(inputValue) < props.minValue) {
      setTip("Your input is below the threshold.");
      setError(true);
    } else {
      setTip(props.tip);
      setError(false);
    }
  };

  const setMaxValue = () => {
    setInputValue(props.maxValue);
    props.inputValueChange(props.maxValue);
  };

  useEffect(() => {
    setInputValue(props.minValue);
  }, [props.minValue]);

  return (
    <div className="md:w-full p-4 pl-0">
      <div className="relative flex">
        <Input
          type="number"
          color="orange"
          value={inputValue}
          label={props.title}
          onChange={handleChange}
          error={error}
        />
        <Button color="orange" size="sm" className="!absolute right-1 top-1 rounded" onClick={setMaxValue}>
          max
        </Button>
      </div>
      <Typography
        variant="small"
        className={`flex items-center gap-1 font-normal mt-2 ${error ? "text-red-500" : "text-gray-700"}`}
      >
        <InformationCircleIcon className="w-4 h-4 -mt-px" />
        {tip}
      </Typography>
    </div>
  );
};

export default USDInput;
