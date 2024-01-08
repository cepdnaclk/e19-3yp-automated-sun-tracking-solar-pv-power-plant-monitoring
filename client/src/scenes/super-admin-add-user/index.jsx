import React from 'react';
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
    <Box style={{ margin: '20px 100px 20px 25px' }}>
      <Typography variant="h2" style={{ fontSize: '20px', fontWeight: 'bold', color: '#FFAC09' }}>
        Add Company
      </Typography>

      <form onSubmit={handleSubmit} style={{ background: `${colors.primary[400]}` }}>
        <Box m="25px">
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
            Add 
            </Button>
        </Box>
      </form>
    </Box>
  );
};

export default SuperAdminAdduser;
