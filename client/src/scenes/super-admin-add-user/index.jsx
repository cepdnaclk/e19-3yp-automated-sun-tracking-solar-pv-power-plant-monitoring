import React from 'react';
import Header from '../../components/Header';
import { useTheme } from '@mui/system';
import { tokens } from '../../theme';
import { Box, Typography, TextField, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const SuperAdminAdduser = () => {
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
					title="COMPANY & DEVICES"
					subtitle="Add new company"
				/>
			</Box>

      <form onSubmit={handleSubmit} style={{ background: `${colors.primary[400]}` }}>
        <Box m="0px 25px">
          <TextField
            label="Company Name"
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Company Address"
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
            label="Company ID"
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Company Username"
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
            Add Company
            </Button>
        </Box>
      </form>
    </Box>
  );
};

export default SuperAdminAdduser;
