import { Route, Routes } from "react-router-dom";
import { ErrorBoundary } from "./components/common/errorBoundary";
import ProtectedRoute from "./pages/ProtectedRoute";
import { UserLayout } from "./layout/UserLayout";
import Signup from "./pages/user/Signup";
import { Login } from "./pages/user/Login";
import { Articles } from "./pages/user/ArticleListPage";
import {SettingsPage} from "./pages/user/SetttingsPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {


  return (
    <>
      <ToastContainer />
      <ErrorBoundary>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <UserLayout />
              </ProtectedRoute>
            }
          >
            <Route path="" element={<Articles />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </ErrorBoundary>
    </>
  );
}

export default App;
