import { StrictMode } from "react";
import "./index.css";
import App from "./App.jsx";
import { createRoot } from 'react-dom/client'
import { store, persistor } from "./redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading="loading" persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
    </BrowserRouter>
  </StrictMode>
);
