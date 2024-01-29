import {
	Button,
	Container,
	CssBaseline,
	TextField,
	styled,
	Box,
	Typography,
	Link,
	useTheme,
} from '@mui/material';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext } from 'react';
import * as Yup from 'yup';
import { AlertContext } from '../../contexts/AlertContext';
import { tokens } from '../../theme';
import { useNavigate } from 'react-router-dom';

const StyledContainer = styled(Container)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	marginTop: theme.spacing(8),
}));

const StyledForm = styled('form')(({ theme }) => ({
	width: '100%',
	marginTop: theme.spacing(1),
}));

const StyledButton = styled(Button)(({ theme }) => ({
	margin: theme.spacing(3, 0, 2),
}));

const Register = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const { showAlert } = useContext(AlertContext);
	const navigate = useNavigate();

	const formik = useFormik({
		initialValues: {
			username: '',
			address: '',
			contactNumber: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
		validationSchema: Yup.object({
			username: Yup.string().required('Required'),
			address: Yup.string().required('Required'),
			contactNumber: Yup.string()
				.required('Required')
				.matches(/^[0-9]+$/, 'Must be only digits')
				.min(10, 'Must be exactly 10 digits')
				.max(10, 'Must be exactly 10 digits'),
			email: Yup.string()
				.email('Invalid email address')
				.required('Required'),
			password: Yup.string()
				.required('Required')
				.min(6, 'Password must be at least 6 characters'),
			confirmPassword: Yup.string()
				.oneOf([Yup.ref('password'), null], 'Passwords must match')
				.required('Required'),
		}),
		onSubmit: (values) => {
			// Handle registration logic here
			if (values.password !== values.confirmPassword) {
				showAlert('Passwords must match', 'error');
				return;
			}
			axios
				.post('/customers/register', {
					username: values.username,
					user_address: values.address,
					contact_number: values.contactNumber,
					email: values.email,
					passphrase: values.password,
				})
				.then((res) => {
					// redirect to login page
					showAlert('Registration successful', 'success');
					window.location.href = '/login';
				})
				.catch((err) => {
					showAlert(err.response.data.message, 'error');
				});
		},
	});

	return (
		<StyledContainer component="main" maxWidth="xs">
			<CssBaseline />
			<div>
				<Box ml="120px" mb="10px">
					<img src="assets/logo_text.png" height="20px" alt="logo" />
				</Box>
				<Typography component="h1" variant="h4">
					Register
				</Typography>
				<StyledForm onSubmit={formik.handleSubmit}>
					<TextField
						fullWidth
						id="username"
						name="username"
						label="Username"
						variant="outlined"
						margin="normal"
						value={formik.values.username}
						onChange={formik.handleChange}
						error={
							formik.touched.username &&
							Boolean(formik.errors.username)
						}
						helperText={
							formik.touched.username && formik.errors.username
						}
					/>
					<TextField
						fullWidth
						id="address"
						name="address"
						label="Address"
						variant="outlined"
						margin="normal"
						value={formik.values.address}
						onChange={formik.handleChange}
						error={
							formik.touched.address &&
							Boolean(formik.errors.address)
						}
						helperText={
							formik.touched.address && formik.errors.address
						}
					/>
					<TextField
						fullWidth
						id="contactNumber"
						name="contactNumber"
						label="Contact Number"
						variant="outlined"
						margin="normal"
						value={formik.values.contactNumber}
						onChange={formik.handleChange}
						error={
							formik.touched.contactNumber &&
							Boolean(formik.errors.contactNumber)
						}
						helperText={
							formik.touched.contactNumber &&
							formik.errors.contactNumber
						}
					/>
					<TextField
						fullWidth
						id="email"
						name="email"
						label="Email"
						variant="outlined"
						margin="normal"
						value={formik.values.email}
						onChange={formik.handleChange}
						error={
							formik.touched.email && Boolean(formik.errors.email)
						}
						helperText={formik.touched.email && formik.errors.email}
					/>
					<TextField
						fullWidth
						id="password"
						name="password"
						label="Password"
						type="password"
						variant="outlined"
						margin="normal"
						value={formik.values.password}
						onChange={formik.handleChange}
						error={
							formik.touched.password &&
							Boolean(formik.errors.password)
						}
						helperText={
							formik.touched.password && formik.errors.password
						}
					/>
					<TextField
						fullWidth
						id="confirmPassword"
						name="confirmPassword"
						label="Confirm Password"
						type="password"
						variant="outlined"
						margin="normal"
						value={formik.values.confirmPassword}
						onChange={formik.handleChange}
						error={
							formik.touched.confirmPassword &&
							Boolean(formik.errors.confirmPassword)
						}
						helperText={
							formik.touched.confirmPassword &&
							formik.errors.confirmPassword
						}
					/>
					<StyledButton
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
					>
						Register
					</StyledButton>
					<Box>
						<Typography variant="b1">
							Already have an account?
						</Typography>
						<Link
							component="button"
							variant="body2"
							onClick={() => {
								navigate('/login');
								window.location.reload();
							}}
						>
							<Typography
								variant="body1"
								pl="1rem"
								color={colors.yellowAccent[500]}
								sx={{ textDecoration: 'underline' }}
							>
								Login here
							</Typography>
						</Link>
					</Box>
				</StyledForm>
			</div>
		</StyledContainer>
	);
};

export default Register;
