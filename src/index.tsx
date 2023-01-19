import React from "react";
import ReactDOM from "react-dom/client";
import App from "App";
import { Provider } from "react-redux";
import { store } from "store";
import { BrowserRouter } from "react-router-dom";
import MuiThemeProvider from "themes/theme";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <MuiThemeProvider>
          <App />
        </MuiThemeProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
