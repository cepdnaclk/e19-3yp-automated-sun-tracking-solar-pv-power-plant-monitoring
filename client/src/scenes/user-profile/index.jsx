import React from 'react';
import Header from '../../components/Header';
import { Box, Typography, useTheme, Button } from '@mui/material';
import TextCard from '../../components/TextCard';
import { tokens } from '../../theme';

const UserProfile = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const user = {
		name: 'John Doe',
		email: 'johndoe@example.com',
		contact_number: '0771234567',
		address: '123 Main St, New York, NY 10030',
	};

	const [isEditProfileOpen, setIsEditProfileOpen] = React.useState(false);

	const handleEditProfileClick = () => {
		setIsEditProfileOpen(true);
		window.open('/edit-profile', '_blank', 'width=500,height=500');
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
				<Box
					display="flex"
					justifyContent="start"
					alignItems="center"
					backgroundColor={colors.primary[400]}
					p="15px"
				>
					<Typography variant="h4" color={colors.grey[100]}>
						Name :
					</Typography>
					<Typography variant="h4" color={colors.grey[100]} ml="20px">
						{user.name}
					</Typography>
				</Box>
				<Box
					display="flex"
					justifyContent="start"
					alignItems="center"
					backgroundColor={colors.primary[400]}
					p="15px"
				>
					<Typography variant="h4" color={colors.grey[100]}>
						Email :
					</Typography>
					<Typography variant="h4" color={colors.grey[100]} ml="20px">
						{user.email}
					</Typography>
				</Box>
				<Box
					display="flex"
					justifyContent="start"
					alignItems="center"
					backgroundColor={colors.primary[400]}
					p="15px"
				>
					<Typography variant="h4" color={colors.grey[100]}>
						Contact Number :
					</Typography>
					<Typography variant="h4" color={colors.grey[100]} ml="20px">
						{user.contact_number}
					</Typography>
				</Box>
				<Box
					display="flex"
					justifyContent="start"
					alignItems="center"
					backgroundColor={colors.primary[400]}
					p="15px"
				>
					<Typography variant="h4" color={colors.grey[100]}>
						Address :
					</Typography>
					<Typography variant="h4" color={colors.grey[100]} ml="20px">
						{user.address}
					</Typography>
				</Box>
			</Box>

			<Box display="flex" justifyContent="start" mt="20px" width="60%">
				<Button
					variant="contained"
					color="secondary"
					onClick={handleEditProfileClick}
				>
					Edit Profile
				</Button>
				<Button
					variant="contained"
					color="secondary"
					sx={{
						marginLeft: '20px',
						backgroundColor: colors.orangeAccent[500],
					}}
				>
					Change Password
				</Button>
			</Box>
		</Box>
	);
};

export default UserProfile;
