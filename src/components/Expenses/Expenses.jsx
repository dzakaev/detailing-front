import * as React from "react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import css from "./expenses.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import NewMaterial from "./NewMaterial";
import AdmissionModal from "./Admission";
import {
  deleteMaterial,
  loadMaterial,
} from "../../redux/actions/materialActions";
import Edit from "./Edit";

export default function Expenses() {
  const materials = useSelector((state) => state.materialReducer.materials);
  const loading = useSelector((state) => state.materialReducer.loading);
  const deleting = useSelector((state) => state.materialReducer.deleting);
  const [search, setSearch] = React.useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadMaterial());
  }, [dispatch]);

  const handleDeleteMaterial = (id) => {
    dispatch(deleteMaterial(id));
  };

  const searchInputStyle = { width: 400 };
  const dateFormStyle = { width: 200 };

  const filtered = materials.filter((element) => {
    return element.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <>
      {loading ? (
        "Загрузка"
      ) : (
        <Container maxWidth="lg">
          <Box sx={{ height: "100vh" }}>
            <Box className={css.inputFormMain}>
              <TextField
                id="outlined-basic"
                label="Поиск"
                variant="outlined"
                style={searchInputStyle}
                onChange={(event) => setSearch(event.target.value)}
              />
              <TextField
                id="date"
                label="Дата"
                type="date"
                defaultValue="2020-04-05"
                style={dateFormStyle}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <NewMaterial />
            </Box>
            <Box className={css.content}>
              <h1> Список расходов </h1>
              <TableContainer style={{ width: 1050 }} component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">№</TableCell>
                      <TableCell align="center" style={{ width: 250 }}>
                        Наименование
                      </TableCell>
                      <TableCell align="center" style={{ width: 10 }}>
                        Цена
                      </TableCell>
                      <TableCell align="center">Количество</TableCell>
                      <TableCell style={{ width: 50 }}> </TableCell>
                      <TableCell align="center">Единица</TableCell>
                      <TableCell align="center" style={{ width: 100 }}>
                        Дата
                      </TableCell>
                      <TableCell align="center" style={{ width: 10 }}>
                        {" "}
                      </TableCell>
                      <TableCell align="center" style={{ width: 10 }}>
                        {" "}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filtered.map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="right" style={{ width: 70 }}>
                          {index + 1}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="center">{row.price}</TableCell>
                        <TableCell align="center" style={{ width: 50 }}>
                          {row.left}
                        </TableCell>
                        <TableCell align="center">
                          <AdmissionModal materialId={row._id} />
                        </TableCell>
                        <TableCell align="center" style={{ width: 50 }}>
                          {row.volumeType}
                        </TableCell>
                        <TableCell align="right">
                          {row.direction.date}
                        </TableCell>
                        <TableCell align="right">
                          <Edit materialId={row._id} />
                        </TableCell>
                        <TableCell align="right">
                          <Button
                            variant="contained"
                            color="primary"
                            disabled={deleting}
                            style={{ background: "orange", fontSize: 8 }}
                            onClick={() => handleDeleteMaterial(row._id)}
                          >
                            удалить
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </Container>
      )}
    </>
  );
}