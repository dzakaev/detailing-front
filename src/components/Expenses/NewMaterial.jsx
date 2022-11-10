import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { newMaterial } from "../../redux/actions/materialActions";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { currencies, schema } from "../../constants";
import LoadingButton from "@mui/lab/LoadingButton";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function NewMaterial() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [open, setOpen] = React.useState(false);

  const adding = useSelector((state) => state.materialReducer.adding);

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const addNewMaterial = ({ name, volumeType, price }) => {
    dispatch(newMaterial({ name, volumeType, price })).then(() => setOpen(false));
    reset({
      name: "",
      price: "",
      volumeType: "",
    });
  };

  const addButton = {
    backgroundColor: "orange",
    fontSize: 12,
    marginLeft: 100,
    color: "white",
    height: 57,
  };
  const nameInput = {
    width: 500,
    margin: "0 20 20 0",
  };

  return (
    <div>
      <Button style={addButton} variant="contained" onClick={handleClickOpen}>
        + добавить материал
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Добавление материала"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <div style={{ textAlign: "center" }}>
              <form onSubmit={handleSubmit(addNewMaterial)}>
                <TextField
                  id="outlined-basic"
                  label="Наименование"
                  name="name"
                  variant="outlined"
                  style={nameInput}
                  helperText={errors.name && errors.name.message}
                  error={!!errors.name}
                  {...register("name")}
                />
                <TextField
                  id="outlined-basic"
                  label="Цена"
                  name="price"
                  variant="outlined"
                  type="number"
                  style={{ width: 150, marginTop: 15, marginRight: 10 }}
                  helperText={errors.price && errors.price.message}
                  error={!!errors.price}
                  {...register("price")}
                />
                <TextField
                  id="outlined-select-currency-native"
                  select
                  label="Ед"
                  name="volumeType"
                  style={{ width: 80, marginTop: 15 }}
                  SelectProps={{
                    native: true,
                  }}
                  helperText={errors.volumeType && errors.volumeType.message}
                  error={!!errors.volumeType}
                  {...register("volumeType")}
                >
                  {currencies.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
                <div
                  style={{
                    margin: "auto",
                    marginTop: 20,
                    width: 230,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <LoadingButton
                    style={{ backgroundColor: "orange" }}
                    type="submit"
                    loading={adding}
                    variant="contained"
                  >
                    {" "}
                    Добавить{" "}
                  </LoadingButton>
                  <Button
                    style={{ backgroundColor: "orange" }}
                    variant="contained"
                    color="primary"
                    onClick={handleClose}
                  >
                    Закрыть
                  </Button>
                </div>
              </form>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
}
