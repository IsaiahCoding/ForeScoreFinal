import React from "react";
import App from "./components/App";
import { UserContext, UserProvider } from './components/UserContext/UserContext';

import "./index.css";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <React.StrictMode>
      <UserProvider>
        <App />
      </UserProvider>
    </React.StrictMode>
  );

