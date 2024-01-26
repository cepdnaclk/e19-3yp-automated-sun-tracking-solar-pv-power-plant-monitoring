import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Header from '../../components/Header';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/system';
import { tokens } from '../../theme';
import { Box, TextField, Button, Grid, Input } from '@mui/material';

const AdminAdduser = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    // You can access form data using event.target.elements
    // For example: event.target.elements.companyName.value
  };

  const validationSchema = Yup.object({
    user_id: Yup.string().required("Required"),
    username: Yup.string().required("Required"),
    device_id: Yup.string().required("Required"),
    devicename: Yup.string().required("Required"),
    contact_number: Yup.string()
      .required("Required")
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(10, "Must be exactly 10 digits")
      .max(10, "Must be exactly 10 digits"),
    address: Yup.string().required("Required"),
    location: Yup.string().required("Required"),
    file: Yup.mixed().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      user_id: "",
      username: "",
      device_id: "",
      devicename: "",
      address: "",
      contact_number: "",
      location: "",
      file: null,
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      // Handle login logic here
    },

  });

  return (
    <Box style={{ margin: '1px 100px 15px 25px' }}>
      <Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
			>
				<Header
					title="USERS & DEVICES"
					subtitle="Add new user with device"
				/>
			</Box>

      <form onSubmit={handleSubmit} style={{ background: `${colors.primary[400]}` }}>
        <Box m="0px 25px">
          <Grid container spacing={2}>              
            <Grid item xs={6}>
              <TextField
                label="User ID"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                id="user_id"
                name="user_id"
                value={formik.values.user_id}
                onChange={formik.handleChange}
                error={formik.touched.user_id && Boolean(formik.errors.user_id)}
                helperText={formik.touched.user_id && formik.errors.user_id}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                id="username"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>              
            <Grid item xs={6}>
              <TextField
                label="Device ID"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                id="device_id"
                name="device_id"
                value={formik.values.device_id}
                onChange={formik.handleChange}
                error={formik.touched.device_id && Boolean(formik.errors.device_id)}
                helperText={formik.touched.device_id && formik.errors.device_id}
              />
            </Grid>
            <Grid item xs={6}>
                <TextField
                  label="Device Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  id="devicename"
                  name="devicename"
                  value={formik.values.devicename}
                  onChange={formik.handleChange}
                  error={formik.touched.devicename && Boolean(formik.errors.devicename)}
                  helperText={formik.touched.devicename && formik.errors.devicename}
                />
            </Grid>
          </Grid>
          <TextField
            label="Address"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            id="address"
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
          />
          <TextField
            label="Contact Number"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            id="contact_number"
            name="contact_number"
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
          <TextField
            label="Device Location"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            id="location"
            name="location"
            value={formik.values.location}
            onChange={formik.handleChange}
            error={formik.touched.location && Boolean(formik.errors.location)}
            helperText={formik.touched.location && formik.errors.location}
          />
          <Input
            type="file"
            fullWidth
            margin="normal"
            inputProps={{ accept: '.pdf, .doc, .docx', multiple: true }} // Specify accepted file types
            onChange={(event) => {
              // Handle file upload logic here
              // You can access the selected file using event.target.files[0]
              formik.setFieldValue('file', event.target.files[0]);
            }}
            error={formik.touched.file && Boolean(formik.errors.file)}
            helperText={formik.touched.file && formik.errors.file}
            style={{ marginTop: '10px' }}
          />
          <Box style={{ display: 'flex' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ background: '#FFAC09', color: 'black', fontWeight: 'bold', margin: '20px 20px 20px 0' }}
              >
              Add User
            </Button>
            <Link to="/admin-user-management" style={{ textDecoration: 'none' }}>
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

export default AdminAdduser;
