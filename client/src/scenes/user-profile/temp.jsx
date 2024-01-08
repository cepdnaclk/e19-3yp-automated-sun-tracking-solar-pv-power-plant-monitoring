// import React from 'react';
// import Header from '../../components/Header';
// import { Box, Typography, useTheme } from '@mui/material';
// import TextCard from '../../components/TextCard';
// import { tokens } from '../../theme';

// const UserProfile = () => {
// 	const theme = useTheme();
// 	const colors = tokens(theme.palette.mode);
// 	const user = {
// 		name: 'John Doe',
// 		email: 'johndoe@example.com',
// 		contact_number: '0771234567',
// 		address: '123 Main St, New York, NY 10030',
// 	};

// 	return (
// 		<Box m="20px">
// 			<Box
// 				display="flex"
// 				justifyContent="space-between"
// 				alignItems="center"
// 			>
// 				<Header title="MY PROFILE" subtitle="User profile details" />
// 			</Box>

// 			<Box
// 				display="flex"
// 				justifyContent="space-between"
// 				flexDirection="column"
// 				colors={colors.primary[400]}
// 				width="60%"
// 			>
// 				<Box
// 					display="flex"
// 					justifyContent="space-between"
// 					alignItems="center"
// 					borderBottom={`4px solid ${colors.primary[500]}`}
// 					backgroundColor={colors.primary[400]}
// 					p="15px"
// 				>
// 					<Typography variant="h4" color={colors.grey[300]}>
// 						User Details
// 					</Typography>
// 				</Box>
// 				<Box
// 					display="flex"
// 					justifyContent="space-between"
// 					alignItems="center"
// 					borderBottom={`4px solid ${colors.primary[500]}`}
// 					backgroundColor={colors.primary[400]}
// 					p="15px"
// 				>
// 					<Typography variant="h4" color={colors.grey[300]}>
// 						Name :
// 					</Typography>
// 				</Box>
// 			</Box>
// 		</Box>
// 	);
// };

// export default UserProfile;

// import React from 'react';
// import Header from '../../components/Header';
// import { Box, Typography, useTheme, Card, CardContent } from '@mui/material';
// import TextCard from '../../components/TextCard';
// import { tokens } from '../../theme';

// const UserProfile = () => {
// 	const theme = useTheme();
// 	const colors = tokens(theme.palette.mode);
// 	const user = {
// 		name: 'John Doe',
// 		email: 'johndoe@example.com',
// 		contact_number: '0771234567',
// 		address: '123 Main St, New York, NY 10030',
// 	};

// 	return (
// 		<Box m="20px">
// 			<Box
// 				display="flex"
// 				justifyContent="space-between"
// 				alignItems="center"
// 			>
// 				<Header title="MY PROFILE" subtitle="User profile details" />
// 			</Box>

// 			<Card sx={{ mt: 4 }}>
// 				<CardContent>
// 					<Typography variant="h4" color={colors.grey[300]}>
// 						User Details
// 					</Typography>
// 					<Box sx={{ mt: 2 }}>
// 						<Typography variant="body1">
// 							Name: {user.name}
// 						</Typography>
// 						<Typography variant="body1">
// 							Email: {user.email}
// 						</Typography>
// 						<Typography variant="body1">
// 							Contact Number: {user.contact_number}
// 						</Typography>
// 						<Typography variant="body1">
// 							Address: {user.address}
// 						</Typography>
// 					</Box>
// 				</CardContent>
// 			</Card>
// 		</Box>
// 	);
// };

// export default UserProfile;
