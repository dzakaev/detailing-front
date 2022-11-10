import React from "react";
import { useSelector } from "react-redux";
import ModalCarDelete from "./ModalCarDelete";
import { Box } from "@mui/material";

const Cars = ({ clientId }) => {
  const cars = useSelector((state) => state.carsReducer.cars);
  const carsByClients = cars.filter((car) => car.client === clientId);

  return (
    <>
      {carsByClients.map((car) => {
        return (
          <Box style={{ textAlign: "-webkit-center" }}>
            <p>
              {car.vinData.mark} {car.vinData.model}
              <ModalCarDelete id={car._id} />
            </p>
          </Box>
        );
      })}
    </>
  );
};

export default Cars;
