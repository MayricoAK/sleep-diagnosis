import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import LayoutAuth from "scenes/layout/auth";
import Home from "scenes/Home";
import Login from "scenes/Login";
import Register from "scenes/Register";
import Profile from "scenes/Profile";
// import Diagnosis from "scenes/diagnosis";
import DetailDiagnosis from "scenes/DetailDiagnosis";

// Helper component to redirect authenticated users away from login/register pages
const RedirectIfAuthenticated = ({ element }) => {
  const token = localStorage.getItem('token');
  return token ? <Navigate to="/home" /> : element;
};

// PrivateRoute component to protect routes
const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem('token');
  return token ? element : <Navigate to="/" />;
};

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<LayoutAuth />}>
              <Route exact path="/" element={<RedirectIfAuthenticated element={<Login />} />} />
              <Route path="/register" element={<RedirectIfAuthenticated element={<Register />} />} />
            </Route>
            <Route element={<Layout />}>
              <Route path="/home" element={<PrivateRoute element={<Home />} />} />
              <Route path="/diagnosis/:id" element={<PrivateRoute element={<DetailDiagnosis />} />} />
              <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
              <Route path="/profile/update" element={<PrivateRoute element={<Home />} />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;