import React from 'react';
import Header from '../../components/Header';
import { Box } from '@mui/material';

const UserProfile = () => {
	return (
		<Box m="20px">
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
			>
				<Header title="MY PROFILE" subtitle="User profile details" />
			</Box>
		</Box>
	);
};

export default UserProfile;
