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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const currencies = [
  {
    value: null,
  },
  {
    value: "шт",
    label: "шт",
  },
  {
    value: "кг",
    label: "кг",
  },
  {
    value: "л",
    label: "л",
  },
];
export default function NewMaterial() {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [volumeType, setVolumeType] = React.useState("");
  const [price, setPrice] = React.useState("");

  const dispatch = useDispatch();

  const adding = useSelector((state) => state.materialReducer.adding);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleVolumeType = (e) => {
    setVolumeType(e.target.value);
  };
  const handlePrice = (e) => {
    setPrice(e.target.value);
  };

  const addNewMaterial = (e) => {
    e.preventDefault()
    dispatch(newMaterial({ name, volumeType, price }));
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
              <TextField
                id="outlined-basic"
                label="Наименование"
                variant="outlined"
                style={nameInput}
                onChange={handleName}
              />
              <TextField
                id="outlined-basic"
                label="Цена"
                variant="outlined"
                type="number"
                style={{ width: 150, marginTop: 15, marginRight: 10 }}
                onChange={handlePrice}
              />
              {/*<TextField*/}
              {/*  id="outlined-basic"*/}
              {/*  label="Кол-во"*/}
              {/*  variant="outlined"*/}
              {/*  type="number"*/}
              {/*  style={{ width: 100, marginTop: 15, marginRight: 10 }}*/}
              {/*  // onChange={handle}*/}
              {/*/>*/}
              <TextField
                id="outlined-select-currency-native"
                select
                label="Ед"
                style={{ width: 80, marginTop: 15 }}
                onChange={handleVolumeType}
                SelectProps={{
                  native: true,
                }}
              >
                {currencies?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            style={{ backgroundColor: "orange" }}
            variant="contained"
            color="primary"
            onClick={handleClose}
          >
            Закрыть
          </Button>
          <Button
            style={{ backgroundColor: "orange" }}
            variant="contained"
            color="primary"
            type="submit"
            disabled={adding}
            onClick={addNewMaterial}
          >
            {" "}
            Добавить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
