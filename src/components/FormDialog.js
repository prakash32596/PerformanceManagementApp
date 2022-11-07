import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [close, setClose] = React.useState(false);
  const {title,children,openFormModal,setFormModal}= props;
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    console.log("close",);
    setFormModal(false);
  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Dialog open={openFormModal} >
        <DialogTitle>{title} <Button variant="contained" onClick={handleClose}>x</Button></DialogTitle>
        
        <DialogContent>

          {children}
        </DialogContent>
        <DialogActions>
          {/* {/* <Button onClick={handleClose}>Cancel</Button> */}
       
        </DialogActions>
      </Dialog>
    </div>
  );
}