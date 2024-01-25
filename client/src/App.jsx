// global imports
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { AlertProvider } from "./contexts/AlertContextProvider";
import { ColorModeContext, useMode } from "./theme";

// Appbar , Sidebar imports
import AdminAppbar from "./components/global/AdminAppbar";
import AdminSidebar from "./components/global/AdminSidebar";
import Appbar from "./components/global/Appbar";
import Sidebar from "./components/global/Sidebar";
import SuperAdminAppbar from "./components/global/SuperAdminAppbar";
import SuperAdminSidebar from "./components/global/SuperAdminSidebar";

// User pages imports
import UserDashboard from './scenes/user-dashboard';
import UserDevices from './scenes/user-devices';
import UserAddDevice from './scenes/user-add-device';
import UserFaq from './scenes/user-faq';
import UserProfile from './scenes/user-profile';

// Admin pages imports
import AdminAddUser from "./scenes/admin-add-user";
import AdminDashboard from "./scenes/admin-dashboard";
import AdminDeviceMng from "./scenes/admin-device-mng";
import AdminFaq from "./scenes/admin-faq";
import AdminProfile from "./scenes/admin-profile";
import AdminUserMng from "./scenes/admin-user-mng";

// Super Admin pages imports
import SuperAdminAddUser from "./scenes/super-admin-add-user";
import SuperAdminDashboard from "./scenes/super-admin-dashboard";
import SuperAdminDeviceMng from "./scenes/super-admin-device-mng";
import SuperAdminFaq from "./scenes/super-admin-faq";
import SuperAdminProfile from "./scenes/super-admin-profile";
import SuperAdminUserMng from "./scenes/super-admin-user-mng";

// login, register imports
import axios from "axios";
import { useEffect } from "react";
import Login from "./scenes/login";
import Register from "./scenes/register";

function App() {

  const [theme, colorMode] = useMode();
  const userRole = localStorage.getItem("user_type"); // Replace with actual user role

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

  useEffect(() => {
    const userRole = localStorage.getItem("user_type");
    const userToken = localStorage.getItem("token");
    if (
      !userToken &&
      window.location.pathname !== "/login" &&
      window.location.pathname !== "/register"
    ) {
      window.location.href = "/login";
    } else {
      axios.defaults.headers.common["Authorization"] = "Bearer " + userToken;
      axios.get("/login/me").catch((err) => {
        console.log("App.tsx error: ", err);
      });
    }

    if (userRole === "admin") {
      document.title = "Company Dashboard | HelioEye";
    } else if (userRole === "super-admin") {
      document.title = "Super Admin Dashboard | HelioEye";
    } else {
      document.title = "User Dashboard | HelioEye";
    }
  });

  const renderRoutes = () => {
		if (userRole === 'admin') {
			return (
				<Routes>
					<Route path="/" element={<AdminDashboard />} />
					<Route
						path="/admin-user-management"
						element={<AdminUserMng />}
					/>
					<Route
						path="/admin-device-management"
						element={<AdminDeviceMng />}
					/>
					<Route path="/admin-faq" element={<AdminFaq />} />
					<Route path="/admin-profile" element={<AdminProfile />} />
					<Route path="/admin-add-user" element={<AdminAddUser />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</Routes>
			);
		} else if (userRole === 'super-admin') {
			return (
				<Routes>
					<Route path="/" element={<SuperAdminDashboard />} />
					<Route
						path="/super-admin-user-management"
						element={<SuperAdminUserMng />}
					/>
					<Route
						path="/super-admin-device-management"
						element={<SuperAdminDeviceMng />}
					/>
					<Route
						path="/super-admin-profile"
						element={<SuperAdminProfile />}
					/>
					<Route
						path="/super-admin-add-user"
						element={<SuperAdminAddUser />}
					/>
					<Route
						path="/super-admin-faq"
						element={<SuperAdminFaq />}
					/>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</Routes>
			);
		} else {
			return (
				<Routes>
					<Route path="/" element={<UserDashboard />} />
					<Route path="/my-devices" element={<UserDevices />} />
					<Route path="/add-device" element={<UserAddDevice />} />
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
							{window.location.pathname !== '/login' &&
								window.location.pathname !== '/register' &&
								renderSidebar()}
							<main className="content">
								{window.location.pathname !== '/login' &&
									window.location.pathname !== '/register' &&
									renderAppbar()}
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
