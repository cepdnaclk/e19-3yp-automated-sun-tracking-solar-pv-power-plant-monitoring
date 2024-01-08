import { Box, IconButton, useTheme, Menu, MenuItem } from '@mui/material';
import { useContext, useState } from 'react';
import { ColorModeContext, tokens } from '../../theme';
import InputBase from '@mui/material/InputBase';

import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchIcon from '@mui/icons-material/Search';

const Appbar = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const colorMode = useContext(ColorModeContext);
	const [anchorEl, setAnchorEl] = useState(null);

	const handleMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	return (
		<Box display="flex" justifyContent="space-between" p={2}>
			{/* SEARCH BAR */}
			<Box
				display="flex"
				backgroundColor={colors.primary[400]}
				borderRadius="3px"
			>
				<InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
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
					<MenuItem onClick={handleMenuClose}>Profile</MenuItem>
					<MenuItem onClick={handleMenuClose}>Logout</MenuItem>
				</Menu>
			</Box>
		</Box>
	);
};

export default Appbar;
