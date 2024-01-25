import {
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { AlertContext } from "../../contexts/AlertContext";
import { DataContext } from "../../contexts/DataContext";

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

const Login = ({ onRegisterClick }) => {
  const { showAlert } = useContext(AlertContext);
  const { data, setData } = useContext(DataContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Required"),
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

          setData({
            ...data,
            username: res.data.username,
            user_type: data.user_type_mapper[res.data.user_type],
            user_id: res.data.user_id,
          });

          axios.defaults.headers.common["Authorization"] =
            "Bearer " + res.data.accessToken;

          // redirect to home page
          navigate("/");
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
            id="username"
            name="username"
            label="Username"
            variant="outlined"
            margin="normal"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
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
          <Box>
            <Typography variant="b1">Don't have an account?</Typography>
            <Link component="button" variant="body2" to="/register">
              <Typography variant="b1" pl="1rem">
                Register here
              </Typography>
            </Link>
          </Box>
        </StyledForm>
      </div>
    </StyledContainer>
  );
};

export default Login;
