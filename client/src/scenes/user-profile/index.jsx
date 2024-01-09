import React from 'react';
import Header from '../../components/Header';
import { useTheme } from '@mui/system';
import { tokens } from '../../theme';
import { TextField, Button, Typography, Container, Grid, Box } from '@mui/material';


const UserProfile = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const user = {
		name: 'John Doe',
		email: 'johndoe@example.com',
		contact_number: '0771234567',
		address: '123 Main St, New York, NY 10030',
	};

	const containerStyle = {
		background: `${colors.primary[400]}`,
		padding: '20px',
		justifyContent: 'flex-start',
	};

	const textFieldStyle = {
		marginBottom: '10px',
	};

	const buttonContainerStyle = {
		marginTop: '15px',
		display: 'flex',
		justifyContent: 'flex-end',
	};

	const buttonStyle = {
		marginLeft: '20px',
		color: 'black',
		backgroundColor: '#FFAC09',
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
			<Box mt="20px" width="80%">
				<Box
					display="flex"
					justifyContent="space-between"
					alignItems="center"
					borderBottom={`4px solid ${colors.primary[500]}`}
					backgroundColor={colors.primary[400]}
					p="15px"
				>
					<Typography variant="h4" color={colors.grey[300]}>
						Edit Profile
					</Typography>
				</Box>

				<Box style={containerStyle}>
					<Typography
						variant="h5"
						gutterBottom
						style={{ color: '#FFAC09', margin: '10px 0 15px 0' }}
					>
						Basic Information
					</Typography>

					{/* Basic Profile Information */}
					<form>
						<Grid container spacing={2}>
							<Grid item xs={12} md={6}>
								<TextField
									label="Username"
									variant="outlined"
									fullWidth
									style={textFieldStyle}
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<TextField
									label="Address"
									variant="outlined"
									fullWidth
									style={textFieldStyle}
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<TextField
									label="Contact Number"
									variant="outlined"
									fullWidth
									style={textFieldStyle}
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<TextField
									label="Email"
									variant="outlined"
									fullWidth
									style={textFieldStyle}
								/>
							</Grid>
						</Grid>

						{/* Change Email Section */}
						<Typography
							variant="h6"
							gutterBottom
							style={{
								color: '#FFAC09',
								margin: '10px 0 15px 0',
							}}
						>
							Change Email
						</Typography>
						<Grid container spacing={2}>
							<Grid item xs={12} md={6}>
								<TextField
									label="New Email"
									variant="outlined"
									fullWidth
									style={textFieldStyle}
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<TextField
									label="Confirm New Email"
									variant="outlined"
									fullWidth
									style={textFieldStyle}
								/>
							</Grid>
						</Grid>

						{/* Change Password Section */}
						<Typography
							variant="h6"
							gutterBottom
							style={{
								color: '#FFAC09',
								margin: '10px 0 15px 0',
							}}
						>
							Change Password
						</Typography>
						<Grid container spacing={2}>
							<Grid item xs={12} md={6}>
								<TextField
									label="Current Password"
									type="password"
									variant="outlined"
									fullWidth
									style={textFieldStyle}
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<TextField
									label="New Password"
									type="password"
									variant="outlined"
									fullWidth
									style={textFieldStyle}
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<TextField
									label="Confirm New Password"
									type="password"
									variant="outlined"
									fullWidth
									style={textFieldStyle}
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<div style={buttonContainerStyle}>
									<Button
										variant="contained"
										color="primary"
										style={buttonStyle}
									>
										Save Changes
									</Button>
									<Button
										variant="contained"
										color="primary"
										style={buttonStyle}
									>
										Cancel
									</Button>
								</div>
							</Grid>
						</Grid>
					</form>
				</Box>
			</Box>
		</Box>
	);
};

export default UserProfile;
