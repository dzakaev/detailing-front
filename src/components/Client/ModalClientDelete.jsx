import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useDispatch } from "react-redux";
import { deleteClient } from "../../redux/features/clients.reducer";
import LoadingButton from "@mui/lab/LoadingButton";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const classes = {
  addBut: {
    backgroundColor: "orange",
    color: "white",
    marginRight: 5,
  },
};
const ModalClientDelete = ({ id, deleting }) => {

  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();

  const handleDeleteClients = (id) => {
    dispatch(deleteClient(id));
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <LoadingButton
        variant="contained"
        color="primary"
        loading={deleting}
        style={{ background: "orange", fontSize: 8 }}
        onClick={handleClickOpen}
      >
        удалить
      </LoadingButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Вы действительно хотите удалить клиента?"}</DialogTitle>
        <DialogActions style={{ color: "white" }}>
          <LoadingButton
            loading={deleting}
            style={classes.addBut}
            onClick={() => {
              handleDeleteClients(id);
            }}
          >
            ДА
          </LoadingButton>
          <Button style={classes.addBut} onClick={handleClose}>
            НЕТ
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default ModalClientDelete;
