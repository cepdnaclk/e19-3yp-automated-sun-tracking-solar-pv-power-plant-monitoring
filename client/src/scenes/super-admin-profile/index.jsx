import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Header from '../../components/Header';
import { useTheme } from '@mui/system';
import { tokens } from '../../theme';
import { TextField, Button, Typography, Container, Grid, Box } from '@mui/material';
import axios from 'axios';

const SuperAdminProfile = () => {
  	const theme = useTheme();
  	const colors = tokens(theme.palette.mode);

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

	const validationSchema = Yup.object({
		username: Yup.string().required('Username is required'),
		role: Yup.string().required('Role is required'),
		contactNumber: Yup.string()
			.required('Contact Number is required')
			.matches(/^[0-9]+$/, "Must be only digits")
			.min(10, "Must be exactly 10 digits")
			.max(10, "Must be exactly 10 digits"),
		email: Yup.string().email('Invalid email address').required('Email is required'),
		newEmail: Yup.string().email('Invalid email address'),
		confirmNewEmail: Yup.string().oneOf([Yup.ref('newEmail'), null], 'Emails must match'),
		currentPassword: Yup.string().required('Current Password is required'),
		newPassword: Yup.string().required('New Password is required'),
		confirmNewPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
	});

  	const formik = useFormik({
    	initialValues: {
			username: '',
			role: '',
			contactNumber: '',
			email: '',
			newEmail: '',
			confirmNewEmail: '',
			currentPassword: '',
			newPassword: '',
			confirmNewPassword: '',
    	},
    	validationSchema: validationSchema,
    	onSubmit: (values) => {
		// Handle login logic here
		axios
		  .put("admin/myProfile", values)
		  .then((response) => {
			console.log(response);
			alert("Profile Updated Successfully");
		  })
		  .catch((error) => {
			console.log(error);
			alert("Error Updating Profile");
		  });
		},
  	});
  
	return (
		<Box m="5px 20px" width="90%">
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
			>
				<Header
					title="SUPER ADMIN PROFILE"
					subtitle="Edit your profile"
				/>
			</Box>	

			<Box style={containerStyle}>
				<Typography variant="h5" gutterBottom style={{ color: '#FFAC09', margin: '10px 0 15px 0' }}>
				Basic Information
				</Typography>
		
				{/* Basic Profile Information */}
				<form onSubmit={formik.handleSubmit}>
				<Grid container spacing={2}>
					<Grid item xs={12} md={6}>
					<TextField
						label="Username"
						variant="outlined"
						fullWidth
						style={textFieldStyle}
						id="username"
						name="username"
						value={formik.values.username}
						onChange={formik.handleChange}
						error={formik.touched.username && Boolean(formik.errors.username)}
						helperText={formik.touched.username && formik.errors.username}
					/>
					</Grid>
					<Grid item xs={12} md={6}>
					<TextField
						label="Role"
						variant="outlined"
						fullWidth
						style={textFieldStyle}
						id="role"
						name="role"
						value={formik.values.role}
						onChange={formik.handleChange}
						error={formik.touched.role && Boolean(formik.errors.role)}
						helperText={formik.touched.role && formik.errors.role}
					/>
					</Grid>
					<Grid item xs={12} md={6}>
					<TextField
						label="Contact Number"
						variant="outlined"
						fullWidth
						style={textFieldStyle}
						id="contactNumber"
						name="contactNumber"
						value={formik.values.contactNumber}
						onChange={formik.handleChange}
						error={formik.touched.contactNumber && Boolean(formik.errors.contactNumber)}
						helperText={formik.touched.contactNumber && formik.errors.contactNumber}
					/>
					</Grid>
					<Grid item xs={12} md={6}>
					<TextField
						label="Email"
						variant="outlined"
						fullWidth
						style={textFieldStyle}
						id="email"
						name="email"
						value={formik.values.email}
						onChange={formik.handleChange}
						error={formik.touched.email && Boolean(formik.errors.email)}
						helperText={formik.touched.email && formik.errors.email}
					/>
					</Grid>
				</Grid>
		
				{/* Change Email Section */}
				<Typography variant="h6" gutterBottom style={{ color: '#FFAC09', margin: '10px 0 15px 0' }}>
					Change Email
				</Typography>
				<Grid container spacing={2}>
					<Grid item xs={12} md={6}>
					<TextField
						label="New Email"
						variant="outlined"
						fullWidth
						style={textFieldStyle}
						id="newEmail"
						name="newEmail"
						value={formik.values.newEmail}
						onChange={formik.handleChange}
						error={formik.touched.newEmail && Boolean(formik.errors.newEmail)}
						helperText={formik.touched.newEmail && formik.errors.newEmail}
					/>
					</Grid>
					<Grid item xs={12} md={6}>
					<TextField
						label="Confirm New Email"
						variant="outlined"
						fullWidth
						style={textFieldStyle}
						id="confirmNewEmail"
						name="confirmNewEmail"
						value={formik.values.confirmNewEmail}
						onChange={formik.handleChange}
						error={formik.touched.confirmNewEmail && Boolean(formik.errors.confirmNewEmail)}
						helperText={formik.touched.confirmNewEmail && formik.errors.confirmNewEmail}
					/>
					</Grid>
				</Grid>
		
				{/* Change Password Section */}
				<Typography variant="h6" gutterBottom style={{ color: '#FFAC09', margin: '10px 0 15px 0' }}>
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
						id="currentPassword"
						name="currentPassword"
						value={formik.values.currentPassword}
						onChange={formik.handleChange}
						error={formik.touched.currentPassword && Boolean(formik.errors.currentPassword)}
						helperText={formik.touched.currentPassword && formik.errors.currentPassword}
					/>
					</Grid>
					<Grid item xs={12} md={6}>
					<TextField
						label="New Password"
						type="password"
						variant="outlined"
						fullWidth
						style={textFieldStyle}
						id="newPassword"
						name="newPassword"
						value={formik.values.newPassword}
						onChange={formik.handleChange}
						error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
						helperText={formik.touched.newPassword && formik.errors.newPassword}
					/>
					</Grid>
					<Grid item xs={12} md={6}>
					<TextField
						label="Confirm New Password"
						type="password"
						variant="outlined"
						fullWidth
						style={textFieldStyle}
						id="confirmNewPassword"
						name="confirmNewPassword"
						value={formik.values.confirmNewPassword}
						onChange={formik.handleChange}
						error={formik.touched.confirmNewPassword && Boolean(formik.errors.confirmNewPassword)}
						helperText={formik.touched.confirmNewPassword && formik.errors.confirmNewPassword}
					/>
					</Grid>
					<Grid item xs={12} md={6}>
						<div style={buttonContainerStyle}>
						<Button type="submit" variant="contained" color="primary" style={buttonStyle}>
							Save Changes
						</Button>
						<Button variant="contained" color="primary" style={buttonStyle}>
							Cancel
						</Button>
						</div>
					</Grid>
				</Grid>		  
				</form>
			</Box>
	  </Box>
	);
  };
  

export default SuperAdminProfile;
