import React from 'react';
import Header from '../../components/Header';
import { Box } from '@mui/material';

const UserDashboard = () => {
	return (
		<Box m="20px">
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
			>
				<Header title="DASHBORD" subtitle="Welcome to your dahboard" />
			</Box>
		</Box>
	);
};

export default UserDashboard;
