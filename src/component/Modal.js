import React from "preact/compat";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

const Modal = () => {

	// Modal


  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState();
	
  const abc = () => {
    handleClickOpen();
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


	const [dates, editDate] = React.useState("");
  const [titles, editTitle] = React.useState("");
  const [backgroundcolors, editBackgroundcolor] = React.useState("");

  const newTitleValue = (e) => {
		editTitle(e.target.value);
    console.log("e.target.value", e.target.value);
  };
  const newDateValue = (e) => {
		editDate(e.target.value);
    console.log("e.target.value", e.target.value);
  };
  const newBackgroundColorValue = (e) => {
		editBackgroundcolor(e.target.value);
    console.log("e.target.value", e.target.value);
  };


  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Schedule"}</DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            date: title: backgroundColor:
            <TextField
              id="datetime-local"
              label="Next appointment"
              type="datetime-local"
              defaultValue="YYYY-MM-DDT10:30"
              sx={{ width: 250 }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={newDateValue}
            />
            <TextField
              id="standard-basic"
              label="title"
              variant="standard"
              onChange={newTitleValue}
            />
            <TextField
              id="standard-basic"
              label="background color"
              variant="standard"
              onChange={newBackgroundColorValue}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>삭제</Button>
          <Button onClick={handleClose} autoFocus>
            완료
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Modal;