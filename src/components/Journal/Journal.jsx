import * as React from "react";
import Paper from "@mui/material/Paper";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import css from "./journal.module.css";
import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteService,
  getServicesByDate,
  loadServices,
} from "../../redux/features/services.reducer";
import JournalAddingPage from "./JournalAddingPage";
import { loadCars } from "../../redux/features/cars.reducer";
import EditJournal from "./edit.journal";
import { loadClients } from "../../redux/features/clients.reducer";
import moment from "moment/min/moment-with-locales";
import BasicDateRangePicker from '../Report/DatePicker';

export default function Journal() {
  const services = useSelector((state) => state.servicesReducer.services);
  const loading = useSelector((state) => state.servicesReducer.loading);
  const deleting = useSelector((state) => state.servicesReducer.deleting);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");


  useEffect(() => {
    dispatch(loadServices());
    dispatch(loadCars());
    dispatch(loadClients());
    dispatch(getServicesByDate());
  }, [dispatch]);

  const filtered = services?.filter((elem) => {
    return elem.name.toLowerCase().includes(search.toLowerCase());
  });


  const handleClickDelete = (id) => {
    dispatch(deleteService(id));
  };


  const searchStyle = { width: 400 };

  return (
    <>
      {loading ? (
        "Идёт загрузка..."
      ) : (
        <>
          <Container maxWidth="lg">
            <Box sx={{ height: "100vh" }}>
              <Box className={css.inputFormMain}>
                <TextField
                  id="outlined-basic"
                  label="Поиск"
                  variant="outlined"
                  style={searchStyle}
                  onChange={(event) => setSearch(event.target.value)}
                />
                <BasicDateRangePicker />
                <JournalAddingPage />
              </Box>
              <Box className={css.content}>
                <h1> Журнал услуг </h1>
                <TableContainer style={{ width: 1050 }} component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">№</TableCell>
                        <TableCell align="center">Наименование</TableCell>
                        <TableCell align="center">Клиент</TableCell>
                        <TableCell align="center">Машина</TableCell>
                        <TableCell align="center">Цена</TableCell>
                        <TableCell align="center">Дата</TableCell>
                        <TableCell align="center"> </TableCell>
                        <TableCell align="center"> </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filtered?.map((row, index) => (
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
                          <TableCell align="right">
                            {row.client?.firstName} {row.client?.lastName}{" "}
                          </TableCell>
                          <TableCell align="right">
                            {row.car?.vinData.model}
                          </TableCell>
                          <TableCell align="right">{row.cost}</TableCell>
                          <TableCell align="right">
                            {moment(row.createdAt).locale("ru").format("LLL")}
                          </TableCell>
                          <TableCell align="right">
                            <EditJournal
                              serviceId={row._id}
                              names={row.name}
                              price={row.cost}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <Button
                              variant="contained"
                              color="primary"
                              disabled={deleting}
                              style={{ background: "orange", fontSize: 8 }}
                              onClick={(event) => {
                                handleClickDelete(row._id);
                              }}
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
        </>
      )}
    </>
  );
}
