import { useState } from 'react';
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import 'react-pro-sidebar/dist/css/styles.css';
import { tokens } from '../../theme';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';

// Menu Item component
const Item = ({ title, to, icon, selected, setSelected }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	return (
		<MenuItem
			active={selected === title}
			style={{
				color: colors.grey[100],
			}}
			onClick={() => setSelected(title)}
			icon={icon}
		>
			<Typography>{title}</Typography>
			<Link to={to} />
		</MenuItem>
	);
};

const Sidebar = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const [isCollapsed, setIsCollapsed] = useState(false);
	const [selected, setSelected] = useState('Dashboard');

	return (
		<Box
			sx={{
				'& .pro-sidebar-inner': {
					background: `${colors.primary[400]} !important`,
				},
				'& .pro-icon-wrapper': {
					backgroundColor: 'transparent !important',
				},
				'& .pro-inner-item': {
					padding: '5px 35px 5px 20px !important',
				},
				'& .pro-inner-item:hover': {
					color: '#F7CA73 !important',
				},
				'& .pro-menu-item.active': {
					color: '#FFAC09 !important',
				},
			}}
		>
			<ProSidebar collapsed={isCollapsed}>
				<Menu iconShape="square">
					{/* LOGO AND MENU ICON */}
					<MenuItem
						onClick={() => setIsCollapsed(!isCollapsed)}
						icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
						style={{
							margin: '10px 0 20px 0',
							color: colors.grey[100],
						}}
					>
						{!isCollapsed && (
							<Box
								display="flex"
								justifyContent="space-between"
								alignItems="center"
								ml="15px"
							>
								<img
									alt="logo-text"
									width="100px"
									height="15px"
									src={`../../assets/logo_text1.png`}
								/>
								<IconButton
									onClick={() => setIsCollapsed(!isCollapsed)}
								>
									<MenuOutlinedIcon />
								</IconButton>
							</Box>
						)}
					</MenuItem>

					{!isCollapsed && (
						<Box mb="25px">
							<Box
								display="flex"
								justifyContent="center"
								alignItems="center"
							>
								<img
									alt="logo"
									width="100px"
									height="100px"
									src={`../../assets/logo_v4.png`}
									style={{
										borderRadius: '50%',
									}}
								/>
							</Box>
						</Box>
					)}

					{/* Menu Items */}
					<Box paddingLeft={isCollapsed ? undefined : '10%'}>
						<MenuItem
							active={selected === 'Dashboard'}
							style={{
								color: colors.grey[100],
							}}
							onClick={() => setSelected('Dashboard')}
							icon={<DashboardIcon />}
						>
							<Typography>Dashboard</Typography>
							<Link to="/" />
						</MenuItem>
						<Item
							title={'My Devices'}
							to="/my-devices"
							icon={<FlashOnIcon />}
							selected={selected}
							setSelected={setSelected}
						/>
						<Item
							title={'Profile'}
							to="/my-profile"
							icon={<PermIdentityOutlinedIcon />}
							selected={selected}
							setSelected={setSelected}
						/>
						<Item
							title={'FAQ'}
							to="/user-faq"
							icon={<HelpOutlineOutlinedIcon />}
							selected={selected}
							setSelected={setSelected}
						/>
					</Box>
				</Menu>
			</ProSidebar>
		</Box>
	);
};

export default Sidebar;
