import * as React from 'react';
import TextField from '@mui/material/TextField';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Box from '@mui/material/Box';
import { LicenseInfo } from '@mui/x-license-pro';
import { useDispatch, useSelector } from 'react-redux';
import { getServicesByDate } from '../../redux/features/services.reducer';

LicenseInfo.setLicenseKey(
  '61628ce74db2c1b62783a6d438593bc5Tz1NVUktRG9jLEU9MTY4MzQ0NzgyMTI4NCxTPXByZW1pdW0sTE09c3Vic2NyaXB0aW9uLEtWPTI=',
);

export default function BasicDateRangePicker() {
  const dispatch = useDispatch();
  // const services = useSelector((state) => state.servicesReducer.services)
  const [value, setValue] = React.useState([null, null]);

  React.useEffect(() => {
    dispatch(getServicesByDate())
  }, [dispatch])

const handleDateInput = (e) => {
    setValue(e)
  if(!e.includes(null)) {
    dispatch(getServicesByDate(e))
  }
}


  return (
    <form type="submit">

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateRangePicker
          startText="Дата"
          endText="Дата"
          value={value}
          onChange={handleDateInput}
          renderInput={(startProps, endProps) => (
            <React.Fragment>
              <Box sx={{ mx: 2 }}> с </Box>
              <TextField {...startProps} />
              <Box sx={{ mx: 2 }}> по </Box>
              <TextField {...endProps} />
            </React.Fragment>
          )}
        />
      </LocalizationProvider>

    </form>

  );
}