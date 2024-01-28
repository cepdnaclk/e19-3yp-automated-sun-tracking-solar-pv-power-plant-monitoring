// global imports
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { AlertProvider } from './contexts/AlertContextProvider';
import { DataContext } from './contexts/DataContext';
import { ColorModeContext, useMode } from './theme';

// Appbar , Sidebar imports
import AdminAppbar from './components/global/AdminAppbar';
import AdminSidebar from './components/global/AdminSidebar';
import Appbar from './components/global/Appbar';
import Sidebar from './components/global/Sidebar';
import SuperAdminAppbar from './components/global/SuperAdminAppbar';
import SuperAdminSidebar from './components/global/SuperAdminSidebar';

// User pages imports
import UserAddDevice from './scenes/user-add-device';
import UserDashboard from './scenes/user-dashboard';
import UserDevices from './scenes/user-devices';
import UserFaq from './scenes/user-faq';
import UserProfile from './scenes/user-profile';

// Admin pages imports
import AdminAddDevice from './scenes/admin-add-device';
import AdminDashboard from './scenes/admin-dashboard';
import AdminDeviceMng from './scenes/admin-device-mng';
import AdminFaq from './scenes/admin-faq';
import AdminProfile from './scenes/admin-profile';
import AdminUserMng from './scenes/admin-user-mng';

// Super Admin pages imports
import SuperAdminAddDevice from './scenes/super-admin-add-device';
import SuperAdminAddUser from './scenes/super-admin-add-user';
import SuperAdminDashboard from './scenes/super-admin-dashboard';
import SuperAdminDeviceMng from './scenes/super-admin-device-mng';
import SuperAdminFaq from './scenes/super-admin-faq';
import SuperAdminProfile from './scenes/super-admin-profile';
import SuperAdminUserMng from './scenes/super-admin-user-mng';

// login, register imports
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Login from './scenes/login';
import Register from './scenes/register';

function App() {
	const [isLoading, setIsLoading] = useState(true);
	const [theme, colorMode] = useMode();
	const { data, setData } = useContext(DataContext);
	const navigate = useNavigate();

	const renderSidebar = () => {
		if (data.user_type === 'admin') {
			return <AdminSidebar />;
		} else if (data.user_type === 'super-admin') {
			return <SuperAdminSidebar />;
		} else {
			return <Sidebar />;
		}
	};

	const renderAppbar = () => {
		if (data.user_type === 'admin') {
			return <AdminAppbar />;
		} else if (data.user_type === 'super-admin') {
			return <SuperAdminAppbar />;
		} else {
			return <Appbar />;
		}
	};

	useEffect(() => {
		setIsLoading(true);

		const userToken = localStorage.getItem('token');
		if (
			window.location.pathname === '/login' ||
			window.location.pathname === '/register'
		)
			return setIsLoading(false);

		if (!userToken) {
			window.location.href = '/login';
		} else {
			axios.defaults.headers.common['Authorization'] =
				'Bearer ' + userToken;
			axios
				.get('/login/me')
				.then((res) => {
					const user = res.data;
					setData({
						...data,
						username: user.username,
						user_type: data.user_type_mapper[user.user_type],
						user_id: user.user_id,
					});

					setIsLoading(false);
				})
				.catch((err) => {
					navigate('/login');
				});
		}
	}, []);

	useEffect(() => {
		if (window.location.pathname === '/login') {
			document.title = 'HelioEye | Login';
		} else if (window.location.pathname === '/register') {
			document.title = 'HelioEye | Register';
		} else if (data.user_type === 'admin') {
			document.title = 'Company Dashboard | HelioEye';
		} else if (data.user_type === 'super-admin') {
			document.title = 'Super Admin Dashboard | HelioEye';
		} else {
			document.title = 'User Dashboard | HelioEye';
		}
	}, [data.user_type]);

	const renderRoutes = () => {
		if (data.user_type === 'admin') {
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
					<Route
						path="/admin-add-device"
						element={<AdminAddDevice />}
					/>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
				</Routes>
			);
		} else if (data.user_type === 'super-admin') {
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
						path="/super-admin-add-device"
						element={<SuperAdminAddDevice />}
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

	if (isLoading) return null;

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
