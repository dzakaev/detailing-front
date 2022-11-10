import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Box, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addClient } from "../../redux/features/clients.reducer";
import { useForm } from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";
import InputMask from "react-input-mask";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const classes = {
  addButton: {
    backgroundColor: "orange",
    fontSize: 12,
    marginLeft: 100,
    color: "white",
    height: 57,
  },
  inputDiv: {
    textAlign: "center",
  },
  inputPosition: {
    height: 80,
    margin: 10,
  },
};

const schema = yup.object({
  firstName: yup.string().required("Введите фамилию"),
  lastName: yup.string().required("Введите имя"),
  phone: yup.string().required("Введите номер").min(16, "Не менее 17 символов"),
  vin: yup
    .string()
    .required("Введите вин")
    .max(17, "Не более 17 символов")
    .min(17, "Не менее 17 символов"),
});

const CarModal = () => {
  const adding = useSelector((state) => state.clientsReducer.adding);

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

  const handleAddClient = ({ firstName, lastName, phone, vin }) => {
    dispatch(addClient({ firstName, lastName, phone, vin })).then(() =>
      setOpen(false)
    );
    reset({
      firstName: "",
      lastName: "",
      phone: "",
      vin: "",
    });
  };
  const toInputUppercase = (e) => {
    e.target.value = ("" + e.target.value).toUpperCase();
  };

  return (
    <div>
      <Button
        style={classes.addButton}
        variant="contained"
        onClick={handleClickOpen}
      >
        + добавить клиента
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Добавление клиента"}</DialogTitle>
        <DialogContent style={classes.inputDiv}>
          <DialogContentText id="alert-dialog-slide-description">
            <form onSubmit={handleSubmit(handleAddClient)}>
              <TextField
                id="outlined-basic"
                label="Фамилия"
                variant="outlined"
                name="firstName"
                style={classes.inputPosition}
                helperText={errors.firstName && errors.firstName.message}
                error={!!errors.firstName}
                {...register("firstName")}
              />
              <TextField
                id="outlined-basic"
                label="Имя"
                variant="outlined"
                style={classes.inputPosition}
                name="lastName"
                helperText={errors.lastName && errors.lastName.message}
                error={!!errors.lastName}
                {...register("lastName")}
              />
              <InputMask
                mask="+7(999)999 99 99"
                disabled={false}
                maskChar=" "
                {...register("phone")}
              >
                {() => (
                  <TextField
                    id="phone"
                    label="Телефон"
                    variant="outlined"
                    style={classes.inputPosition}
                    name="phone"
                    helperText={errors.phone && errors.phone.message}
                    error={!!errors.phone}
                  />
                )}
              </InputMask>

              <TextField
                id="outlined-basic"
                label="VIN"
                onInput={toInputUppercase}
                variant="outlined"
                style={classes.inputPosition}
                name="vin"
                helperText={errors.vin && errors.vin.message}
                error={!!errors.vin}
                {...register("vin")}
              />
              <Box style={{ margin: "auto", marginBottom: 10 }}>
                <LoadingButton
                  loading={adding}
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
    </div>
  );
};

export default CarModal;
