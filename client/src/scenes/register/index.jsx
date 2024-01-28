import {
	Button,
	Container,
	CssBaseline,
	TextField,
	Typography,
	styled,
	Box,
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
			email: '',
			password: '',
			confirmPassword: '',
		},
		validationSchema: Yup.object({
			username: Yup.string().required('Required'),
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
				<Typography component="h1" variant="h5">
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
