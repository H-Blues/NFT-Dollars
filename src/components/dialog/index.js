import React from "react";
import { Button, Dialog, DialogBody } from "@material-tailwind/react";

export const AlertDialog = ({ open, onClose, retry, title, msg }) => {
  return (
    <Dialog open={open} handler={onClose} size="sm">
      <DialogBody className="flex flex-col items-center px-8">
        <svg
          className="h-6 w-6 bg-red-500 rounded-full text-white mb-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>

        <h3 className="text-red-500 font-bold mb-2">{title}</h3>
        <p className="text-black">{msg}</p>
        <div className="flex justify-between mt-4">
          <Button variant="outlined" onClick={onClose} className="rounded-3xl border-black text-black">
            Close
          </Button>
          <Button variant="outlined" onClick={retry} className="rounded-3xl border-black text-black ml-4">
            Retry
          </Button>
        </div>
      </DialogBody>
    </Dialog>
  );
};

export const SuccessDialog = ({ open, onClose, title, message }) => {
  return (
    <Dialog open={open} handler={onClose} size="sm">
      <DialogBody className="flex flex-col items-center px-8">
        <svg
          className="h-6 w-6 bg-green-500 rounded-full text-white mb-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>

        <h3 className="text-green-500 font-bold mb-2">{title}</h3>
        <p className="text-black">{message}</p>

        <Button variant="outlined" onClick={onClose} className="mt-4 rounded-3xl border-black text-black">
          Close
        </Button>
      </DialogBody>
    </Dialog>
  );
};

export const WaitDialog = ({ open, onClose }) => {
  return (
    <Dialog open={open} handler={onClose} size="xs">
      <DialogBody className="flex flex-col items-center">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-500">
          <svg
            className="animate-spin h-6 w-6 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>

        <h3 className="text-yellow-500 font-bold mb-2">Operation in Progress</h3>
        <p className="text-black">Processing... Please wait a minuite.</p>

        <Button variant="outlined" onClick={onClose} className="mt-4 rounded-3xl border-black text-black">
          Close
        </Button>
      </DialogBody>
    </Dialog>
  );
};

export const ConfirmDialog = ({ open, onClose, confirm, title, msg }) => {
  return (
    <Dialog open={open} handler={onClose} size="sm">
      <DialogBody className="flex flex-col items-center">
        <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
          <circle cx="25" cy="25" r="21" strokeWidth="1" fill="orange" />
          <text x="17.5" y="35" fontFamily="Arial" fontSize="30" fill="black">
            ?
          </text>
        </svg>

        <h3 className="text-orange-500 font-bold mb-2">{title}</h3>
        <p className="text-black">{msg}</p>
        <div className="flex justify-between mt-4">
          <Button variant="outlined" onClick={confirm} className="rounded-3xl border-black text-black">
            Confirm
          </Button>
          <Button variant="outlined" onClick={onClose} className="rounded-3xl border-black text-black ml-4">
            Cancel
          </Button>
        </div>
      </DialogBody>
    </Dialog>
  );
};
