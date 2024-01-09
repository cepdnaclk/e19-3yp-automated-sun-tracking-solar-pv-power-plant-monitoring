import React from 'react';
import Header from '../../components/Header';
import { Box, Button, IconButton, Typography, useTheme } from '@mui/material';
import { tokens } from '../../theme';
import StatBox from '../../components/StatBox';
import StatBoxVal from '../../components/StatBoxVal';

import PhonelinkEraseIcon from '@mui/icons-material/PhonelinkErase';
import TapAndPlayIcon from '@mui/icons-material/TapAndPlay';
import PhonelinkSetupIcon from '@mui/icons-material/PhonelinkSetup';

const AdminDashboard = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	return (
		<Box m="20px" width="70%">
			{/* Header */}
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
			>
				<Header title="DASHBORD" subtitle="Welcome to your dahboard" />
			</Box>
			{/* Grid */}

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
						Device Summery
					</Typography>
				</Box>
				<Box
					gridColumn="span 4"
					gridRow="span 3"
					backgroundColor={colors.primary[400]}
					display="flex"
					alignItems="center"
					justifyContent="center"
				>
					<StatBoxVal
						title="ACTIVE DEVICES"
						value="17"
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
				<Box
					gridColumn="span 4"
					gridRow="span 3"
					backgroundColor={colors.primary[400]}
					display="flex"
					alignItems="center"
					justifyContent="center"
				>
					<StatBoxVal
						title="INACTIVE DEVICES"
						value="09"
						icon={
							<PhonelinkEraseIcon
								sx={{
									color: colors.orangeAccent[600],
									fontSize: '26px',
								}}
							/>
						}
					></StatBoxVal>
				</Box>
				<Box
					gridColumn="span 4"
					gridRow="span 3"
					backgroundColor={colors.primary[400]}
					display="flex"
					alignItems="center"
					justifyContent="center"
				>
					<StatBoxVal
						title="UNREGISTERED"
						value="17"
						icon={
							<PhonelinkSetupIcon
								sx={{
									color: colors.grey[200],
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

export default AdminDashboard;
