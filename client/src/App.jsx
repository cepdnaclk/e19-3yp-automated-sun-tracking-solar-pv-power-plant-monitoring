import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from './theme';

import Appbar from './components/global/Appbar';
import Sidebar from './components/global/Sidebar';

import UserDashboard from './scenes/user-dashboard';
import UserDevices from './scenes//user-devices';
import UserProfile from './scenes/user-profile';
import UserFaq from './scenes/user-faq';
import Login from './scenes/login';
import Register from './scenes/register';

function App() {
	const [theme, colorMode] = useMode();

	return (
		<>
			<ColorModeContext.Provider value={colorMode}>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<div className="app">
						{window.location.pathname !== '/login' && <Sidebar />}
						<main className="content">
							{window.location.pathname !== '/login' && (
								<Appbar />
							)}
							<Routes>
								<Route path="/" element={<UserDashboard />} />
								<Route
									path="/my-devices"
									element={<UserDevices />}
								/>
								<Route
									path="/my-profile"
									element={<UserProfile />}
								/>
								<Route path="/user-faq" element={<UserFaq />} />
								<Route path="/login" element={<Login />} />
								<Route
									path="/register"
									element={<Register />}
								/>
							</Routes>
						</main>
					</div>
				</ThemeProvider>
			</ColorModeContext.Provider>
		</>
	);
}

export default App;
