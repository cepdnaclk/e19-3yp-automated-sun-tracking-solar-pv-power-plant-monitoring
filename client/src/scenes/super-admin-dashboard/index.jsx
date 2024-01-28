import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import { Box, useTheme, Typography } from '@mui/material';
import { tokens } from '../../theme';
import StatBoxVal from '../../components/StatBoxVal';

import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import AppSettingsAltOutlinedIcon from '@mui/icons-material/AppSettingsAltOutlined';

import PhonelinkEraseIcon from '@mui/icons-material/PhonelinkErase';
import TapAndPlayIcon from '@mui/icons-material/TapAndPlay';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';

const SuperAdminDashboard = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	return (
		<Box m="20px 100px 20px 20px" width={"70%"}>
			{/* Header */}
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
			>
				<Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
			</Box>

			
			<Box
				display="grid"
				gridTemplateColumns="repeat(12, 1fr)"
				gridAutoRows="40px"
				gap="10px"
			>
				<Box
					gridColumn="span 12"
					backgroundColor={colors.primary[400]}
					display="flex"
					alignItems="center"
					justifyContent="space-between"
					colors={colors.grey[100]}
					p="15px"
				>
					<Typography
						color={colors.grey[100]}
						variant="h5"
						fontWeight="600"
					>
						Users Summary
					</Typography>
				</Box>
				<Box
					gridColumn="span 6"
					gridRow="span 3"
					backgroundColor={colors.primary[400]}
					display="flex"
					alignItems="center"
					justifyContent="center"
					sx={{ minHeight: '150px' }}
				>
					<StatBoxVal
						title="REGISTERED COMPANIES"
						value="17"
						icon={
							<HowToRegOutlinedIcon
								sx={{
									color: '#FF610A',
									fontSize: '26px',
								}}
							/>
						}
					></StatBoxVal>
				</Box>
				<Box
					gridColumn="span 6"
					gridRow="span 3"
					backgroundColor={colors.primary[400]}
					display="flex"
					alignItems="center"
					justifyContent="center"
					sx={{ minHeight: '150px' }}
				>
					<StatBoxVal
						title="REGISTERED CUSTOMERS"
						value="17"
						icon={
							<PeopleAltOutlinedIcon
								sx={{
									color: '#14DD10',
									fontSize: '26px',
								}}
							/>
						}
					></StatBoxVal>
				</Box>
			</Box>
			<Box
				display="grid"
				gridTemplateColumns="repeat(12, 1fr)"
				gridAutoRows="40px"
				gap="10px"
			>
				<Box m="40px 0"
					gridColumn="span 12"
					backgroundColor={colors.primary[400]}
					display="flex"
					alignItems="center"
					justifyContent="space-between"
					colors={colors.grey[100]}
					p="15px"
				>
					<Typography
						color={colors.grey[100]}
						variant="h5"
						fontWeight="600"
					>
						Devices Summary
					</Typography>
				</Box>
				<Box m="30px 0"
					gridColumn="span 4"
					gridRow="span 3"
					backgroundColor={colors.primary[400]}
					display="flex"
					alignItems="center"
					justifyContent="center"
					sx={{ minHeight: '150px' }}
				>
					<StatBoxVal
						title="REGISTERED DEVICES"
						value="15"
						icon={
							<TapAndPlayIcon
								sx={{
									color: '#14DD10',
									fontSize: '26px',
								}}
							/>
						}
					></StatBoxVal>
				</Box>
				<Box m="30px 0"
					gridColumn="span 4"
					gridRow="span 3"
					backgroundColor={colors.primary[400]}
					display="flex"
					alignItems="center"
					justifyContent="center"
					sx={{ minHeight: '150px' }}
				>
					<StatBoxVal
						title="ACTIVE DEVICES"
						value="8"
						icon={
							<PhonelinkEraseIcon
								sx={{
									color: '#FF0A0A',
									fontSize: '26px',
								}}
							/>
						}
					></StatBoxVal>
				</Box>
				<Box m="30px 0"
					gridColumn="span 4"
					gridRow="span 3"
					backgroundColor={colors.primary[400]}
					display="flex"
					alignItems="center"
					justifyContent="center"
					sx={{ minHeight: '150px' }}
				>
					<StatBoxVal
						title="INACTIVE DEVICES"
						value="8"
						icon={
							<PhonelinkEraseIcon
								sx={{
									color: '#FF0A0A',
									fontSize: '26px',
								}}
							/>
						}
					></StatBoxVal>
				</Box>
			</Box>

		</Box>
	);
};

export default SuperAdminDashboard;
