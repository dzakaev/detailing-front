import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "@mui/material";
import { admission } from "../../redux/actions/materialActions";

export default function AdmissionModal({ materialId }) {
  const materials = useSelector((state) => state.materialReducer.materials);
  const admiss = useSelector((state) => state.materialReducer.admission);

  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [volume, setVolume] = React.useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeVolume = (e) => {
    setVolume(e.target.value);
  };

  const admissionButton = (id) => {
    dispatch(admission(id, volume));
  };

  const filtered = materials.filter((elem) => elem._id === materialId);

  return (
    <div>
      <Button onClick={handleClickOpen}>
        <AddCircleRoundedIcon style={{ cursor: "pointer" }} />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Поступление материала</DialogTitle>
        <DialogContent style={{ margin: "auto" }}>
          <DialogContentText id="alert-dialog-description">
            <TextField
              id="outlined-basic"
              label="Кол-во"
              variant="outlined"
              type="number"
              value={volume}
              onChange={handleChangeVolume}
              style={{ width: 100, marginTop: 15, marginRight: 10 }}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {filtered.map((item) => {
            return (
              <Button
                disabled={admiss}
                onClick={() => admissionButton(item._id)}
              >
                {admiss ? "загрузка" : "Добавить"}
              </Button>
            );
          })}
        </DialogActions>
      </Dialog>
    </div>
  );
}
