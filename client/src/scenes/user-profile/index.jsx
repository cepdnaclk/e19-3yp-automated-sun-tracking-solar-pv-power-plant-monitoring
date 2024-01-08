import React from 'react';
import Header from '../../components/Header';
import { Box, Typography, useTheme } from '@mui/material';
import TextCard from '../../components/TextCard';
import { tokens } from '../../theme';

const UserProfile = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const user = {
		name: 'John Doe',
		email: 'johndoe@example.com',
		age: 25,
		address: '123 Main St, New York, NY 10030',
	};

	return (
		<Box m="20px">
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
			>
				<Header title="MY PROFILE" subtitle="User profile details" />
			</Box>
			{/* <Box
				display="grid"
				gridTemplateColumns="repeat(12, 1fr)"
				gridAutoRows="160px"
				gap="20px"
			>
				<Box
					gridColumn="span 8"
					gridRows="span 2"
					backgroundColor={colors.primary[400]}
					display="flex"
					flexDirection="column"
					justifyContent="space-between"
				>
					<Box
						display="flex"
						justifyContent="space-between"
						alignItems="center"
						borderBottom={`4px solid ${colors.primary[500]}`}
						colors={colors.grey[100]}
						p="15px"
					>
						<Typography variant="h4" color={colors.grey[300]}>
							User Details
						</Typography>
					</Box>
					<Box p="15px">
						<Typography variant="h5" color={colors.grey[100]}>
							Name:{' '}
						</Typography>
					</Box>
					<Box p="15px">
						<Typography variant="h5" color={colors.grey[100]}>
							Name:{' '}
						</Typography>
					</Box>
					<Box p="15px">
						<Typography variant="h5" color={colors.grey[100]}>
							Name:{' '}
						</Typography>
					</Box>
				</Box>
			</Box> */}
			<Box
				display="flex"
				justifyContent="space-between"
				flexDirection="column"
				colors={colors.primary[400]}
				width="60%"
			>
				<Box
					display="flex"
					justifyContent="space-between"
					alignItems="center"
					borderBottom={`4px solid ${colors.primary[500]}`}
					backgroundColor={colors.primary[400]}
					p="15px"
				>
					<Typography variant="h4" color={colors.grey[300]}>
						User Details
					</Typography>
				</Box>
			</Box>
		</Box>
	);
};

export default UserProfile;
