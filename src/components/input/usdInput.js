import React, { useState } from "react";
import { Button, Input, Typography } from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/24/solid";

const NFTInput = (props) => {
  const [inputValue, setInputValue] = useState("");
  const handleChange = (event) => {
    setInputValue(event.target.value);
    props.inputValueChange(event.target.value);
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
        />
        {!props.isMax && (
          <Button color="orange" size="sm" className="!absolute right-1 top-1 rounded">
            max
          </Button>
        )}
      </div>
      <Typography variant="small" color="gray" className="flex items-center gap-1 font-normal mt-2">
        <InformationCircleIcon className="w-4 h-4 -mt-px" />
        {props.tip}
      </Typography>
    </div>
  );
};

export default NFTInput;
