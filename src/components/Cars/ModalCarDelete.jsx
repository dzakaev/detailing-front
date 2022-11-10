import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useDispatch, useSelector } from "react-redux";
import { deleteCars } from "../../redux/features/cars.reducer";
import ClearIcon from "@mui/icons-material/Clear";
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
const ModalCarDelete = ({ id }) => {
  const deleting = useSelector((state) => state.carsReducer.deleting);

  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();

  const handleDeleteCars = (id) => {
    dispatch(deleteCars(id)).then(() => setOpen(false));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        style={{ color: "orange", minWidth: 0, padding: 0, marginLeft: 10 }}
        onClick={handleClickOpen}
      >
        <ClearIcon fontSize="small" />
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Вы действительно хотите удалить машину?"}</DialogTitle>
        <DialogActions style={{ color: "white" }}>
          <LoadingButton
            variant="contained"
            loading={deleting}
            style={{ backgroundColor: "orange" }}
            onClick={() => {
              handleDeleteCars(id);
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
export default ModalCarDelete;
