import React from 'react';
import Header from '../../components/Header';
import { useTheme } from '@mui/system';
import { tokens } from '../../theme';
import { Box, Typography, TextField, Button } from '@mui/material';

const AdminAdduser = () => {
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
					title="USERS & DEVICES"
					subtitle="Add new user"
				/>
			</Box>

      <form onSubmit={handleSubmit} style={{ background: `${colors.primary[400]}` }}>
        <Box m="0px 25px">
          <TextField
            label="Full Name"
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Address"
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Contact Number"
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="User ID"
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Device ID"
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ background: '#FFAC09', color: 'black', fontWeight: 'bold', marginTop: '20px', marginBottom: '20px' }}
            >
            Add User
            </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AdminAdduser;
