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

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
  return (
    <div className="app">
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route element={<LayoutAuth />}>
            <Route exact path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route element={<Layout />}>
            <Route path="/home" element={<Home />} />
            {/* <Route path="/diagnosis/:id" element={<DiagnosisDetail />} /> 
            <Route path="/diagnosis" element={<DiagnosisHistory />} />
            <Route path="/form-diagnosis" element={<FormDiagnosis />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/profile/update" element={<UpdateUsers />} />
            <Route path="/profile/update-password" element={<UpdatePassword />} /> */}
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
    </div>
  );
}

export default App;