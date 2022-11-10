import { Avatar, Box, Button, Grid, Paper, TextField } from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../../redux/features/application";
import { useState } from "react";

const SignInPage = () => {
  const dispatch = useDispatch();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const signingIn = useSelector((state) => state.application.signingIn);
  const error = useSelector((state) => state.application.error);

  const handleChangeLogin = (e) => {
    setLogin(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    dispatch(auth(login, password));
  };

  const paperStyle = {
    padding: 20,
    height: 400,
    width: 280,
    margin: "20px auto",
  };
  const avatarStyle = { background: "orange" };
  const textFieldStyle = { marginBottom: 20, marginTop: 20 };
  const logInStyle = { background: "orange", width: 100 };
  const errorAuth = { color: "red", marginTop: 20 };
  const boxButton = { marginTop: 25 };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlined />
          </Avatar>
          <h2>Авторизация</h2>
        </Grid>
        <TextField
          error={error}
          style={textFieldStyle}
          id="outlined-basic"
          onChange={handleChangeLogin}
          value={login}
          label="Логин"
          variant="outlined"
          fullWidth
          required
        />
        <TextField
          error={error}
          id="outlined-password-input"
          label="Пароль"
          type="password"
          onChange={handleChangePassword}
          value={password}
          autoComplete="current-password"
          fullWidth
          required
        />
        <Box style={boxButton} textAlign="center">
          <Button
            style={logInStyle}
            type="submit"
            variant="contained"
            onClick={handleSubmit}
            disabled={signingIn}
          >
            Войти
          </Button>
        </Box>
        {error ? <Box style={errorAuth}>*{error}</Box> : null}
      </Paper>
    </Grid>
  );
};

export default SignInPage;
