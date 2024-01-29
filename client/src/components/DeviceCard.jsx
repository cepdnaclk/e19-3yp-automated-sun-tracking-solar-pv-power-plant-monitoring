import React from 'react';
import { Box, Typography, useTheme, Button } from '@mui/material';
import { tokens } from '../theme';
import SolarPowerIcon from '@mui/icons-material/SolarPower';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import BoltIcon from '@mui/icons-material/Bolt';
import CachedIcon from '@mui/icons-material/Cached';
import AbcOutlinedIcon from '@mui/icons-material/AbcOutlined';
import PinOutlinedIcon from '@mui/icons-material/PinOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

const DeviceCard = ({
	deviceId,
	deviceNameByCustomer,
	status,
	modelName,
	modelNumber,
	power,
	angle,
	deviceDescription,
}) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const renderStatusCircle = () => {
		if (status === 'Offline') {
			return (
				<Box
					width="15px"
					height="15px"
					borderRadius="50%"
					backgroundColor="red"
				/>
			);
		} else if (status === 'Online') {
			return (
				<Box
					width="15px"
					height="15px"
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
			mb="1px"
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
						fontSize="20px"
						fontWeight="600"
						pl="10px"
					>
						Device ID: {deviceId}
					</Typography>
					<Typography
						color={colors.orangeAccent[500]}
						variant="h4"
						fontSize="20px"
						fontWeight="600"
						ml="25px"
						pl="10px"
					>
						Device Name: {deviceNameByCustomer}
					</Typography>
				</Box>
			</Box>
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				colors={colors.grey[100]}
				pt="15px"
				pl="15px"
			>
				<Box display="flex">
					<RssFeedIcon />
					<Typography color={colors.grey[100]} variant="h4" pl="10px">
						Device Status : {status}
					</Typography>
				</Box>
				<Box pr="140px">{renderStatusCircle()}</Box>
			</Box>
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				colors={colors.grey[100]}
				pl="15px"
				pt="20px"
			>
				<Box display="flex">
					<PinOutlinedIcon />
					<Typography color={colors.grey[100]} variant="h4" pl="10px">
						Model Number : {modelNumber}
					</Typography>
				</Box>
			</Box>
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				colors={colors.grey[100]}
				pl="15px"
				pt="20px"
			>
				<Box display="flex">
					<AbcOutlinedIcon />
					<Typography color={colors.grey[100]} variant="h4" pl="10px">
						Model Name : {modelName}
					</Typography>
				</Box>
			</Box>
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				colors={colors.grey[100]}
				pl="15px"
				pt="20px"
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
				pl="15px"
				pt="20px"
			>
				<Box display="flex">
					<CachedIcon />
					<Typography color={colors.grey[100]} variant="h4" pl="10px">
						Device Angle : {angle} deg
					</Typography>
				</Box>
			</Box>
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				colors={colors.grey[100]}
				pl="15px"
				pt="20px"
				pb="15px"
			>
				<Box display="flex">
					<DescriptionOutlinedIcon />
					<Typography color={colors.grey[100]} variant="h4" pl="10px">
						Description : {deviceDescription}
					</Typography>
				</Box>
			</Box>
		</Box>
	);
};

export default DeviceCard;
