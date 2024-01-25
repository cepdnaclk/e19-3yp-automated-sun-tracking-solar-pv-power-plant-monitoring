import React from 'react';
import Header from '../../components/Header';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/system';
import { tokens } from '../../theme';
import { Box, Typography, TextField, Button, Grid } from '@mui/material';

const UserAddDevice = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const handleSubmit = (event) => {
      event.preventDefault();
      // Handle form submission logic here
      // You can access form data using event.target.elements
      // For example: event.target.elements.companyName.value
    };
  
    return (
      <Box style={{ margin: '1px 100px 15px 25px' }}>
        <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
              >
                  <Header
                      title="ADD NEW DEVICE"
                      subtitle="Assign new device"
                  />
              </Box>
  
        <form onSubmit={handleSubmit} style={{ background: `${colors.primary[400]}` }}>
          <Box m="0px 25px">
            <Grid container spacing={2}>              
                <Grid item xs={6}>
                    <TextField
                        label="Model ID"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        required
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Model Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        required
                    />
                </Grid>
            </Grid>
            <TextField
              label="User ID"
              variant="outlined"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="User Email"
              variant="outlined"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Company ID"
              variant="outlined"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Device Name"
              variant="outlined"
              fullWidth
              margin="normal"
              required
            />
            <Grid container spacing={2}>              
              <Grid item xs={6}>
                  <TextField
                      label="Latitude"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      required
                  />
              </Grid>
              <Grid item xs={6}>
                  <TextField
                      label="Longitude"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      required
                  />
              </Grid>
          </Grid>
            <Box style={{ display: 'flex' }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ background: '#FFAC09', color: 'black', fontWeight: 'bold', margin: '20px 20px 20px 0' }}
                >
                Add Device
              </Button>
              <Link to="/my-devices" style={{ textDecoration: 'none' }}>
                <Button type="submit" variant="contained" color="primary"
                style={{ background: '#FFAC09', color: 'black', fontWeight: 'bold', margin: '20px 0' }}
                >
                Cancel
                </Button>
              </Link>
            </Box>
          </Box>
        </form>
      </Box>
    );
  };

export default UserAddDevice;
