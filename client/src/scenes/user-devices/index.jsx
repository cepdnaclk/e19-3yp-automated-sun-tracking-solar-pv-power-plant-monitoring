import React from 'react';
import Header from '../../components/Header';
import { Box } from '@mui/material';

const UserDevices = () => {
	return (
		<Box m="20px">
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
			>
				<Header title="MY DEVICES" subtitle="Device Overview" />
			</Box>
		</Box>
	);
};

export default UserDevices;
