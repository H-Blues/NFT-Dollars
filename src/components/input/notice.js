import React from "react";
import { Button } from "@material-tailwind/react";

const Notice = ({ hasButton, message, toBeReceiver, toBeNormal }) => {
  return (
    <>
      <div className="bg-white bg-opacity-40 rounded p-4 flex flex-col items-center">
        <span className="rounded">💡 {message}</span>
        {hasButton && (
          <div className="flex w-max gap-4 items-center justify-center mt-4">
            <Button variant="text" color="amber" className="text-sm normal-case" onClick={toBeReceiver}>
              Yes, I want to be a receiver.
            </Button>
            <Button variant="text" color="amber" className="text-sm normal-case" onClick={toBeNormal}>
              No, I just want to get NDL rewards.
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default Notice;
