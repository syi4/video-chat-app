import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { SocketsProvider } from "./context/Socket";
import "./index.css";
import dotenv from "dotenv";

dotenv.config();

ReactDOM.render(
  <SocketsProvider>
    <App />
  </SocketsProvider>,
  document.getElementById("root")
);
