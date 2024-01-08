import { CssBaseline, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { AlertProvider } from "./contexts/AlertContextProvider";
import { ColorModeContext, useMode } from "./theme";

import AdminAppbar from "./components/global/AdminAppbar";
import AdminSidebar from "./components/global/AdminSidebar";
import Appbar from "./components/global/Appbar";
import Sidebar from "./components/global/Sidebar";

import UserDashboard from "./scenes/user-dashboard";
import UserDevices from "./scenes/user-devices";
import UserFaq from "./scenes/user-faq";
import UserProfile from "./scenes/user-profile";

import AdminDashboard from "./scenes/admin-dashboard";
import AdminDeviceMng from "./scenes/admin-device-mng";
import AdminFaq from "./scenes/admin-faq";
import AdminProfile from "./scenes/admin-profile";
import AdminUserMng from "./scenes/admin-user-mng";

import Login from "./scenes/login";
import Register from "./scenes/register";

function App() {
  const [theme, colorMode] = useMode();
  const userRole = "client"; // Replace with actual user role

  const renderSidebar = () => {
    if (userRole === "admin") {
      return <AdminSidebar />;
    } else if (userRole === "super-admin") {
      return <SuperAdminSidebar />;
    } else {
      return <Sidebar />;
    }
  };

  const renderAppbar = () => {
    if (userRole === "admin") {
      return <AdminAppbar />;
    } else if (userRole === "super-admin") {
      return <SuperAdminAppbar />;
    } else {
      return <Appbar />;
    }
  };

  const renderRoutes = () => {
    if (userRole === "admin") {
      return (
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/admin-user-management" element={<AdminUserMng />} />
          <Route path="/admin-device-management" element={<AdminDeviceMng />} />
          <Route path="/admin-faq" element={<AdminFaq />} />
          <Route path="/admin-profile" element={<AdminProfile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      );
    } else if (userRole === "super-admin") {
      return (
        <Routes>
          <Route path="/" element={<SuperAdminDashboard />} />
          <Route path="/super-admin-devices" element={<SuperAdminDevices />} />
          <Route path="/super-admin-profile" element={<SuperAdminProfile />} />
          <Route path="/super-admin-faq" element={<SuperAdminFaq />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      );
    } else {
      return (
        <Routes>
          <Route path="/" element={<UserDashboard />} />
          <Route path="/my-devices" element={<UserDevices />} />
          <Route path="/my-profile" element={<UserProfile />} />
          <Route path="/user-faq" element={<UserFaq />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      );
    }
  };

  return (
    <>
      <AlertProvider>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className="app">
              {window.location.pathname !== "/login" && renderSidebar()}
              <main className="content">
                {window.location.pathname !== "/login" && renderAppbar()}
                {renderRoutes()}
              </main>
            </div>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </AlertProvider>
    </>
  );
}

export default App;
