import { StrictMode } from "react";
import "./index.css";
import App from "./App.jsx";
import { createRoot } from 'react-dom/client'
import { store, persistor } from "./redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading="loading" persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
);
