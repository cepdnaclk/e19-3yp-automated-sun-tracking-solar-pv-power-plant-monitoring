import React from 'react';
import { useTheme } from '@mui/system';
import { tokens } from '../../theme';
import { TextField, Button, Typography, Container, Grid } from '@mui/material';

const SuperAdminProfile = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const containerStyle = {
    marginTop: '15px',
    background: `${colors.primary[400]}`,
    padding: '20px',
    justifyContent: 'flex-start'
  };

  const textFieldStyle = {
    marginBottom: '15px',
  };

  const buttonContainerStyle = {
    marginTop: '15px',
    display: 'flex',
    justifyContent: 'center',
  };

  const buttonStyle = {
    marginRight: '40px',
    color: 'black',
    backgroundColor: '#FFAC09',
  };

  return (
    <Container maxWidth="md" style={containerStyle}>
      <Typography variant="h5" gutterBottom style={{ color: '#FFAC09', margin: '10px 0 15px 0' }}>
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
              label="Role"
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
        </Grid>

        <div style={buttonContainerStyle}>
          <Button variant="contained" color="primary" style={buttonStyle}>
            Save Changes
          </Button>
          <Button variant="contained" color="primary" style={buttonStyle}>
            Cancel
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default SuperAdminProfile;
