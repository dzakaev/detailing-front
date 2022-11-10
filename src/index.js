import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { Provider } from "react-redux";
import { store } from "./redux/configureStore";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from '@mui/material';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <CssBaseline />
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
