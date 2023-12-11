import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from './theme';

import Appbar from './components/global/Appbar';
// import Navbar from './components/global/Navbar';
import userDashboard from './containers/user-dashboard';

function App() {
	const [theme, colorMode] = useMode();

	return (
		<>
			<ColorModeContext.Provider value={colorMode}>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<div className="app">
						{/* <Navbar /> */}
						<main className="content">
							<Appbar />
							<Routes>
								<Route path="/" element={<userDashboard />} />
							</Routes>
						</main>
					</div>
				</ThemeProvider>
			</ColorModeContext.Provider>
		</>
	);
}

export default App;
