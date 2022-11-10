import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "@mui/material";
import { editMaterial } from "../../redux/actions/materialActions";

export default function Edit({ materialId }) {
  const materials = useSelector((state) => state.materialReducer.materials);
  const editing = useSelector((state) => state.materialReducer.editing);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangePrice = (e) => {
    setPrice(e.target.value);
  };

  const saveChange = (id) => {
    dispatch(editMaterial(id, name, price));
  };

  const filtered = materials.filter((elem) => elem._id === materialId);

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        style={{ background: "orange", fontSize: 8, color: "white" }}
      >
        Изменить
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Редактирование</DialogTitle>
        <DialogContent style={{ margin: "auto" }}>
          <DialogContentText id="alert-dialog-description">
            <TextField
              id="outlined-basic"
              label="Наименование"
              variant="outlined"
              type="text"
              value={name}
              onChange={handleChangeName}
              style={{ width: 200, marginTop: 15, marginRight: 10 }}
            />
            <TextField
              id="outlined-basic"
              label="Цена"
              variant="outlined"
              type="number"
              value={price}
              onChange={handleChangePrice}
              style={{ width: 100, marginTop: 15, marginRight: 10 }}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {filtered.map((item) => {
            return (
              <Button
                variant="contained"
                color="primary"
                disabled={editing}
                onClick={() => saveChange(item._id)}
              >
                Сохранить
              </Button>
            );
          })}
        </DialogActions>
      </Dialog>
    </div>
  );
}
