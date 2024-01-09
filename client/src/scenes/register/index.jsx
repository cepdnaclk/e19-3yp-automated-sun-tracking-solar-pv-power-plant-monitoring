import React from 'react';
import {
	Container,
	CssBaseline,
	Typography,
	styled,
	TextField,
	Button,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

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
	const formik = useFormik({
		initialValues: {
			fullName: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
		validationSchema: Yup.object({
			fullName: Yup.string().required('Required'),
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
			console.log('Register:', values);
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
						id="fullName"
						name="fullName"
						label="Full Name"
						variant="outlined"
						margin="normal"
						value={formik.values.fullName}
						onChange={formik.handleChange}
						error={
							formik.touched.fullName &&
							Boolean(formik.errors.fullName)
						}
						helperText={
							formik.touched.fullName && formik.errors.fullName
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
				</StyledForm>
			</div>
		</StyledContainer>
	);
};

export default Register;
