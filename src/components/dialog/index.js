import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export const AlertDialog = ({ open, onClose, retry, title, msg }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle id="alert-dialog-title" color="red">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{msg}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="error" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={retry} autoFocus>
          Retry
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const SuccessDialog = ({ open, onClose, isBorrow }) => {
  const title = isBorrow ? "Transaction Success!" : "Deposit Successfully!";
  const borrowMsg =
    " You have successfully borrowed NFTUSD, please check your wallet for details. Thank you for your use.";
  const depositMsg =
    "You have successfully deposited NFTUSD in stability pool. Thank you for your use.";
  const msg = isBorrow ? borrowMsg : depositMsg;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle color="green">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{msg}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={onClose}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};