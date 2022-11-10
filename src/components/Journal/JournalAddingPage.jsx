import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import css from "./journal.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addService } from "../../redux/features/services.reducer";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
import LoadingButton from "@mui/lab/LoadingButton";
import client from '../Client';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// const schema = yup.object({
//   name: yup.string().required("Введите название услуги"),
//   cost: yup.string().required("Введите стоимость услуги"),
//
// });

const JournalAddingPage = () => {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const [client, setClient] = useState("");

  const adding = useSelector((state) => state.servicesReducer.adding);
  const clients = useSelector((state) => state.clientsReducer.clients);
  const cars = useSelector((state) =>
    state.carsReducer.cars.filter((car) => car.client === client)
  );

  const loadingClients = useSelector((state) => state.clientsReducer.loading);

  const [car, setCar] = useState("");
  const [cost, setCost] = useState("");
  const [name, setName] = useState("");

  // const {
  //   register,
  //   handleSubmit,
  //   reset,
  //   formState: { errors },
  // } = useForm({
  //   resolver: yupResolver(schema),
  // });

  const handleAddService = () => {
    dispatch(addService({ name, cost, car, client })).then(() => {
      setOpen(false);
    });
  }
  //   reset({
  //     name: "",
  //     cost: "",
  //     car: "",
  //     client: "",
  //   });
  // };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const addButton = {
    width: 168,
    backgroundColor: "orange",
    height: 57,
    marginLeft: 70,
    fontSize: 12,
  };
  const servInput = { width: 400, marginRight: 20 };

  const handleChangeClient = (e) => {
    setClient(e.target.value);
  };

  const handleChangeCar = (e) => {
    setCar(e.target.value);
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
  }

  const handleChangeCost = (e) => {
    setCost(e.target.value);
  }

  return (
    <div>
      <Button style={addButton} variant="contained" onClick={handleClickOpen}>
        + добавить услугу
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Добавление услуги</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <div>
              <Box className={css.inpStyle}>
                <TextField
                  style={servInput}
                  id="outlined-basic"
                  name="name"
                  label="Название услуги"
                  value={name}
                  onChange={handleChangeName}
                />
                <TextField
                  id="outlined-basic"
                  name="cost"
                  type="number"
                  label="Цена..."
                  variant="outlined"
                  value={cost}
                  onChange={handleChangeCost}
                />
              </Box>
              <Box className={css.servSelect}>
                <FormControl sx={{ m: 1, minWidth: 270 }}>
                  <InputLabel
                    id="demo-simple-select-autowidth-label"
                  >
                    Клиент
                  </InputLabel>
                  <Select
                    style={{ width: 270 }}
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    label="Клиент"
                    name="Client"
                    value={client}
                    onChange={handleChangeClient}
                  >
                    {loadingClients
                      ? "loading"
                      : clients.map((client) => (
                          <MenuItem key={client._id} value={client._id}>
                            {client.firstName} {client.lastName}
                          </MenuItem>
                        ))}
                  </Select>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 268 }}>
                  <InputLabel
                    id="demo-simple-select-autowidth-label"
                  >
                    Машина
                  </InputLabel>
                <Select
                  style={{ width: 262 }}
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  label="Машина"
                  name="car"
                  value={car}
                  onChange={handleChangeCar}
                >
                  {cars.map((car) => (
                    <MenuItem key={car._id} value={car._id}>
                      {car.vinData.model}
                    </MenuItem>
                  ))}
                </Select>
                </FormControl>
              </Box>
              <DialogActions>
                <LoadingButton
                  loading={adding}
                  style={{ background: "orange" }}
                  variant="contained"
                  color="primary"
                  type="submit"
                  onClick={handleAddService}
                >
                  Добавить
                </LoadingButton>
                <Button
                  style={{ background: "orange" }}
                  variant="contained"
                  color="primary"
                  onClick={handleClose}
                >
                  Закрыть
                </Button>
              </DialogActions>
            </div>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default JournalAddingPage;
