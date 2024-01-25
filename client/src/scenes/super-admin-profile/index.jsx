import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const SuperAdminProfile = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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

  const [user, setUser] = useState({
    username: "",
    contact_number: "",
    email: "",
  });

  useEffect(() => {
    axios
      .get("/admin/view")
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        console.log(data);
      });
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Box m="5px 20px" width="90%">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="SUPER ADMIN PROFILE" subtitle="Edit your profile" />
      </Box>

      <Box style={containerStyle}>
        <Typography
          variant="h5"
          gutterBottom
          style={{ color: "#FFAC09", margin: "10px 0 15px 0" }}
        >
          Basic Information
        </Typography>

        {/* Basic Profile Information */}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                id="username"
                name="username"
                label="Username"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="contact_number"
                label="Contact Number"
                variant="outlined"
                fullWidth
              />
            </Grid>
          </Grid>

          {/* Change Email Section */}
          <Typography
            variant="h6"
            gutterBottom
            style={{ color: "#FFAC09", margin: "10px 0 15px 0" }}
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
            style={{ color: "#FFAC09", margin: "10px 0 15px 0" }}
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
