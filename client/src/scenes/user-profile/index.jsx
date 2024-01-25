import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const UserProfile = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [user, setUser] = React.useState({
    name: "John Doe",
    email: "",
    contact_number: "",
    address: "",
  });

  const containerStyle = {
    background: `${colors.primary[400]}`,
    padding: "20px",
    justifyContent: "flex-start",
  };

  const textFieldStyle = {
    marginBottom: "10px",
  };

  const buttonContainerStyle = {
    marginTop: "15px",
    display: "flex",
    justifyContent: "flex-end",
  };

  const buttonStyle = {
    marginLeft: "20px",
    color: "black",
    backgroundColor: "#FFAC09",
  };

  axios
    .get("/customers/viewProfile")
    .then((response) => {
      setUser(response.data);
    })
    .catch((error) => {
      console.log(error);
    });

  const formik = useFormik({
    initialValues: {
      username: "",
      user_address: "",
      contact_number: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Required"),
      user_address: Yup.string().required("Required"),
      contact_number: Yup.string()
        .required("Required")
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(10, "Must be exactly 10 digits")
        .max(10, "Must be exactly 10 digits"),
    }),
    onSubmit: (values) => {
      // Handle login logic here
      axios
        .put("customers/updateProfile", values)
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
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="MY PROFILE" subtitle="User profile details" />
      </Box>

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
      </form>
      <Box style={containerStyle}>
        <Typography
          variant="h5"
          gutterBottom
          style={{ color: "#FFAC09", margin: "10px 0 15px 0" }}
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
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Address"
                variant="outlined"
                fullWidth
                style={textFieldStyle}
                value={formik.values.user_address}
                onChange={formik.handleChange}
                error={
                  formik.touched.user_address &&
                  Boolean(formik.errors.user_address)
                }
                helperText={
                  formik.touched.user_address && formik.errors.user_address
                }
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Contact Number"
                variant="outlined"
                fullWidth
                style={textFieldStyle}
                value={formik.values.contact_number}
                onChange={formik.handleChange}
                error={
                  formik.touched.contact_number &&
                  Boolean(formik.errors.contact_number)
                }
                helperText={
                  formik.touched.contact_number && formik.errors.contact_number
                }
              />
            </Grid>
          </Grid>

          {/* Change Password Section */}
          <Typography
            variant="h6"
            gutterBottom
            style={{
              color: "#FFAC09",
              margin: "10px 0 15px 0",
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
                <Button variant="contained" color="primary" style={buttonStyle}>
                  Save Changes
                </Button>
              </div>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default UserProfile;
