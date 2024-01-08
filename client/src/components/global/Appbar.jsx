import { Box, IconButton, useTheme, Menu, MenuItem } from '@mui/material';
import { useContext, useState } from 'react';
import { ColorModeContext, tokens } from '../../theme';
import InputBase from '@mui/material/InputBase';
import { useNavigate, useLocation } from 'react-router-dom';

import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import SearchIcon from '@mui/icons-material/Search';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

// ... (imports)

const Appbar = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const colorMode = useContext(ColorModeContext);
	const [anchorEl, setAnchorEl] = useState(null);
	const navigate = useNavigate();
	const location = useLocation();

	const handleMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleLogoutClick = () => {
		// Navigate to '/login' when logout is clicked
		navigate('/login');
		handleMenuClose(); // Close the menu after navigation
		window.location.reload(); // Reload the page
	};

	const handleProfileClick = () => {
		// Navigate to '/user-profile' when profile is clicked
		navigate('/my-profile');
		handleMenuClose(); // Close the menu after navigation
		window.location.reload(); // Reload the page
	};

	const shouldRenderAppBar = location.pathname !== '/login'; // Check if the current route is not '/login'

	return (
		<>
			{shouldRenderAppBar && (
				<Box display="flex" justifyContent="space-between" p={2}>
					{/* SEARCH BAR */}
					<Box
						display="flex"
						backgroundColor={colors.primary[400]}
						borderRadius="3px"
					>
						<InputBase
							sx={{ ml: 2, flex: 1 }}
							placeholder="Search"
						/>
						<IconButton type="button" sx={{ p: 1 }}>
							<SearchIcon />
						</IconButton>
					</Box>

					{/* ICONS */}
					<Box display="flex">
						<IconButton onClick={colorMode.toggleColorMode}>
							{theme.palette.mode === 'dark' ? (
								<DarkModeOutlinedIcon />
							) : (
								<LightModeOutlinedIcon />
							)}
						</IconButton>
						<IconButton onClick={handleMenuOpen}>
							<PersonOutlinedIcon />
						</IconButton>
						<Menu
							anchorEl={anchorEl}
							open={Boolean(anchorEl)}
							onClose={handleMenuClose}
						>
							<MenuItem onClick={handleProfileClick}>
								<PersonOutlinedIcon sx={{ marginRight: 1 }} />
								Profile
							</MenuItem>
							<MenuItem onClick={handleLogoutClick}>
								<LogoutOutlinedIcon sx={{ marginRight: 1 }} />
								Logout
							</MenuItem>
						</Menu>
					</Box>
				</Box>
			)}
		</>
	);
};

export default Appbar;
