import React from 'react';
import { Box, Typography, useTheme, Button } from '@mui/material';
import { tokens } from '../theme';

import SolarPowerIcon from '@mui/icons-material/SolarPower';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import BoltIcon from '@mui/icons-material/Bolt';
import CachedIcon from '@mui/icons-material/Cached';

const DeviceCard = ({
	deviceId = '123',
	status = 'Online',
	power = '100.25',
	angle = '65',
}) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const renderStatusCircle = () => {
		if (status === 'Offline') {
			return (
				<Box
					width="20px"
					height="20px"
					borderRadius="50%"
					backgroundColor={colors.grey[500]}
				/>
			);
		} else if (status === 'Online') {
			return (
				<Box
					width="20px"
					height="20px"
					borderRadius="50%"
					backgroundColor="#14DD10"
				/>
			);
		}
	};

	return (
		<Box
			backgroundColor={colors.primary[400]}
			display="flex"
			flexDirection="column"
			mb="20px"
		>
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				borderBottom={`4px solid ${colors.primary[500]}`}
				colors={colors.grey[100]}
				p="15px"
			>
				<Box display="flex" color={colors.yellowAccent[500]}>
					<SolarPowerIcon />
					<Typography
						color={colors.orangeAccent[500]}
						variant="h4"
						fontWeight="600"
						pl="10px"
					>
						Device ID : {deviceId}
					</Typography>
				</Box>
			</Box>
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				colors={colors.grey[100]}
				p="15px"
			>
				<Box display="flex">
					<RssFeedIcon s />
					<Typography color={colors.grey[100]} variant="h4" pl="10px">
						Device Status : {status}
					</Typography>
				</Box>
				<Box pr="20px">{renderStatusCircle()}</Box>
			</Box>
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				colors={colors.grey[100]}
				p="15px"
			>
				<Box display="flex">
					<BoltIcon />
					<Typography color={colors.grey[100]} variant="h4" pl="10px">
						Device Power : {power} kWh
					</Typography>
				</Box>
			</Box>
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				colors={colors.grey[100]}
				p="15px"
			>
				<Box display="flex">
					<CachedIcon />
					<Typography color={colors.grey[100]} variant="h4" pl="10px">
						Device Angle : {angle} deg
					</Typography>
				</Box>
			</Box>
		</Box>
	);
};

export default DeviceCard;
