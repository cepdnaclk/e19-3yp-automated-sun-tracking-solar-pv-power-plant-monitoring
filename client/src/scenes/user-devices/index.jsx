import React from 'react';
import Header from '../../components/Header';
import { Box, Typography, useTheme } from '@mui/material';
import { tokens } from '../../theme';
import DeviceCard from '../../components/DeviceCard';

import { userDevices } from '../../data/devices';

const UserDevices = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	return (
		<Box m="20px" width="100%">
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
			>
				<Header title="MY DEVICES" subtitle="Device Overview" />
			</Box>

			<Box
				display="grid"
				gridTemplateColumns="repeat(3, 1fr)"
				gridAutoRows="300px"
				gap="10px"
				overflow="auto"
				m="10px"
			>
				{userDevices.map((device) => (
					<DeviceCard
						key={device.deviceId}
						deviceId={device.deviceId}
						status={device.status}
					/>
				))}
			</Box>
		</Box>
	);
};

export default UserDevices;
