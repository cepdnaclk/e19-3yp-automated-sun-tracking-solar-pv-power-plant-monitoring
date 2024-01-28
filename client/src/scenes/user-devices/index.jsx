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
				gridAutoRows="auto"
				gap="10px"
				overflow="auto"
				m="10px 10px 10px 0px"
				width="95%"
			>
				{userDevices.map((device) => (
					<DeviceCard
						key={device.deviceId}
						deviceId={device.deviceId}
						deviceNameByCustomer={device.deviceNameByCustomer}
						status={device.status}
						modelName={device.modelName}
						modelNumber={device.modelNumber}
						power={device.power}
						angle={device.angle}
						deviceDescription={device.deviceDescription}
					/>
				))}
			</Box>
		</Box>
	);
};

export default UserDevices;
