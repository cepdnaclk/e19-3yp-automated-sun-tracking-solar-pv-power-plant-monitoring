import React from 'react';
import Header from '../../components/Header';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/system';
import { tokens } from '../../theme';
import { Box, Typography, TextField, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const SuperAdminAddDevice = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    // You can access form data using event.target.elements
    // For example: event.target.elements.companyName.value
  };

  return (
    <Box style={{ margin: '15px 100px 15px 25px' }}>
      <Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
			>
				<Header
					title="DEVICES OVERVIEW"
					subtitle="Add new device"
				/>
			</Box>

      <form onSubmit={handleSubmit} style={{ background: `${colors.primary[400]}` }}>
        <Box m="0px 25px">
          <TextField
            label="Device ID"
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Model Name"
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Model Number"
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

          <Box style={{ display: 'flex' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ background: '#FFAC09', color: 'black', fontWeight: 'bold', margin: '20px 20px 20px 0' }}
              >
              Add Device
            </Button>
            <Link to="/super-admin-device-management" style={{ textDecoration: 'none' }}>
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

export default SuperAdminAddDevice;
