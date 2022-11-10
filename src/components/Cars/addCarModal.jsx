import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Box, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCars } from "../../redux/features/cars.reducer";
import LoadingButton from "@mui/lab/LoadingButton";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import DialogActions from "@mui/material/DialogActions";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const classes = {
  inputDiv: {
    textAlign: "center",
  },
  inputPosition: {
    height: 80,
    margin: 10,
  },
};

const schema = yup.object({
  vin: yup
    .string()
    .required("Введите вин")
    .max(17, "Не более 17 символов")
    .min(17, "Не менее 17 символов"),
});

const AddCarModal = ({ clientId }) => {
  const loading = useSelector((state) => state.carsReducer.loading);

  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleAddCar = ({ vin }) => {
    dispatch(addCars({ vin, clientId })).then(() => setOpen(false));
    reset({ vin: "" });
  };
  const toInputUppercase = (e) => {
    e.target.value = ("" + e.target.value).toUpperCase();
  };

  return (
    <>
      <div>
        <LoadingButton
          variant="contained"
          color="primary"
          style={{ background: "orange", fontSize: 8 }}
          onClick={handleClickOpen}
        >
          добавить машину
        </LoadingButton>
      </div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Добавление машины"}</DialogTitle>
        <DialogContent style={classes.inputDiv}>
          <DialogContentText id="alert-dialog-slide-description">
            <form onSubmit={handleSubmit(handleAddCar)}>
              <TextField
                onInput={toInputUppercase}
                id="outlined-basic"
                label="VIN"
                variant="outlined"
                name="vin"
                style={classes.inputPosition}
                helperText={errors.vin && errors.vin.message}
                error={!!errors.vin}
                {...register("vin")}
              />

              <Box style={{ margin: "auto", marginBottom: 10 }}>
                <LoadingButton
                  loading={loading}
                  style={{ backgroundColor: "orange" }}
                  variant="contained"
                  type="submit"
                >
                  добавить
                </LoadingButton>
              </Box>
            </form>
          </DialogContentText>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </>
  );
};

export default AddCarModal;
