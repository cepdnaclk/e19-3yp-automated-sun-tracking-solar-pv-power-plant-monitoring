import {
  Button,
  Container,
  CssBaseline,
  Link,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React, { useContext } from "react";
import * as Yup from "yup";
import { AlertContext } from "../../contexts/AlertContext";

const StyledContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: theme.spacing(8),
}));

const StyledForm = styled("form")(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(1),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

const user_type = {
  company: "admin",
  super_admin: "super_admin",
  customer: "customer",
};

const Login = ({ onRegisterClick }) => {
  const { showAlert } = useContext(AlertContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      // Handle login logic here
      axios
        .post("/login/", values)
        .then((res) => {
          // set token, refresh token and username in local storage
          localStorage.setItem("token", res.data.accessToken);
          localStorage.setItem("refreshToken", res.data.refreshToken);
          localStorage.setItem("username", res.data.username);
          localStorage.setItem("user_type", user_type[res.data.user_type]);

          axios.defaults.headers.common["Authorization"] =
            "Bearer " + res.data.accessToken;

          // redirect to home page
          window.location.href = "/";
        })
        .catch((err) => {
          console.log(err);
          showAlert(err.response.data.message, "error");
        });
    },
  });

  return (
    <StyledContainer component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <StyledForm onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            margin="normal"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
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
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Login
          </StyledButton>

          <Link component="button" variant="body2" onClick={onRegisterClick}>
            Don't have an account? Register here
          </Link>
        </StyledForm>
      </div>
    </StyledContainer>
  );
};

export default Login;
