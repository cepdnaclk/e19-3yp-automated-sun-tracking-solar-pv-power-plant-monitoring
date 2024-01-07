import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from './theme';

import Appbar from './components/global/Appbar';
import Sidebar from './components/global/Sidebar';

import UserDashboard from './scenes/user-dashboard';
import UserDevices from './scenes//user-devices';

function App() {
	const [theme, colorMode] = useMode();

	return (
		<>
			<ColorModeContext.Provider value={colorMode}>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<div className="app">
						<Sidebar />
						<main className="content">
							<Appbar />
							<Routes>
								<Route path="/" element={<UserDashboard />} />
								<Route
									path="/my-devices"
									element={<UserDevices />}
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
