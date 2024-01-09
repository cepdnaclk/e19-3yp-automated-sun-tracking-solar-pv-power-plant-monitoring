import React from 'react';
import Header from '../../components/Header';
import { Box, Button, IconButton, Typography, useTheme } from '@mui/material';
import { tokens } from '../../theme';
import StatBox from '../../components/StatBox';
import StatBoxVal from '../../components/StatBoxVal';
import ToggleCharts from '../../components/ToggleCharts';

import BatteryChargingFullOutlinedIcon from '@mui/icons-material/BatteryChargingFullOutlined';
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';
import Battery3BarOutlinedIcon from '@mui/icons-material/Battery3BarOutlined';
import SettingsSuggestOutlinedIcon from '@mui/icons-material/SettingsSuggestOutlined';

import { userDevices } from '../../data/devices';

const UserDashboard = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	return (
		<Box m="20px">
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
				gridAutoRows="160px"
				gap="20px"
			>
				{/* Row 1 */}

				<Box
					gridColumn="span 3"
					backgroundColor={colors.primary[400]}
					display="flex"
					alignItems="center"
					justifyContent="center"
				>
					<StatBoxVal
						title="AVERAGE POWER"
						value="325.13kWh"
						icon={
							<BoltOutlinedIcon
								sx={{
									color: colors.yellowAccent[600],
									fontSize: '26px',
								}}
							/>
						}
					/>
				</Box>
				<Box
					gridColumn="span 3"
					backgroundColor={colors.primary[400]}
					display="flex"
					alignItems="center"
					justifyContent="center"
				>
					<StatBox
						title="EFFICIENCY"
						subtitle="75%"
						progress="0.75"
						icon={
							<SettingsSuggestOutlinedIcon
								sx={{
									color: colors.yellowAccent[600],
									fontSize: '26px',
								}}
							/>
						}
					/>
				</Box>
				<Box
					gridColumn="span 6"
					gridRow="span 3"
					backgroundColor={colors.primary[400]}
				>
					<Box
						display="flex"
						justifyContent="space-between"
						alignItems="center"
						borderBottom={`4px solid ${colors.primary[500]}`}
						colors={colors.grey[100]}
						p="15px"
					>
						<Typography
							color={colors.grey[100]}
							variant="h5"
							fontWeight="600"
						>
							Energy Production Overview
						</Typography>
					</Box>
					<Box
						display="flex"
						alignItems="center"
						justifyContent="center"
						p="15px"
					>
						<ToggleCharts />
					</Box>
				</Box>

				{/* Row 2 */}
				<Box
					gridColumn="span 6"
					gridRow="span 2"
					backgroundColor={colors.primary[400]}
					overflow="auto"
				>
					<Box
						display="flex"
						justifyContent="space-between"
						alignItems="center"
						borderBottom={`4px solid ${colors.primary[500]}`}
						colors={colors.grey[100]}
						p="15px"
					>
						<Typography
							color={colors.grey[100]}
							variant="h5"
							fontWeight="600"
						>
							Device Status
						</Typography>
					</Box>
					{userDevices.map((device, i) => (
						<Box
							key={`${device.deviceId}-${i}`}
							display="flex"
							justifyContent="space-between"
							alignItems="center"
							borderBottom={`4px solid ${colors.primary[500]}`}
							p="15px"
						>
							<Box>
								<Typography color={colors.grey[100]}>
									Device ID : {device.deviceId}
								</Typography>
							</Box>
							<Box>
								<Typography color={colors.orangeAccent[300]}>
									Power : {device.devicePower}
								</Typography>
							</Box>
							<Box
								backgroundColor={colors.yellowAccent[500]}
								p="5px 10px"
								borderRadius="4px"
							>
								<Typography color={colors.blueAccent[600]}>
									Status : {device.deviceStatus}
								</Typography>
							</Box>
						</Box>
					))}
				</Box>
			</Box>
		</Box>
	);
};

export default UserDashboard;
