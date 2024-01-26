import React from 'react';
import Header from '../../components/Header';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/system';
import { tokens } from '../../theme';
import { Box, TextField, Button, Grid } from '@mui/material';
import { useFormik } from "formik";
import * as Yup from "yup";

const UserAddDevice = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const handleSubmit = (event) => {
      event.preventDefault();
      // Handle form submission logic here
      // You can access form data using event.target.elements
      // For example: event.target.elements.companyName.value
    };

    const validationSchema = Yup.object({
      devicename: Yup.string().required("Required"),
      model_number: Yup.string().required("Required"),
      model_name: Yup.string().required("Required"),
      user_id: Yup.string().required("Required"),
      username: Yup.string().required("Required"),
      company_id: Yup.string().required("Required"),
      company_name: Yup.string().required("Required"),
      latitude: Yup.string().required("Required"),
      longitude: Yup.string().required("Required"),
    });
  
    const formik = useFormik({
      initialValues: {
        devicename: "",
        model_name: "",
        model_number: "",
        user_id: "",
        username: "",
        company_id: "",
        company_name: "",
        latitude: "",
        longitude: "",
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
                      title="ADD NEW DEVICE"
                      subtitle="Assign new device"
                  />
              </Box>
  
        <form onSubmit={handleSubmit} style={{ background: `${colors.primary[400]}` }}>
          <Box m="0px 25px">
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
            <Grid container spacing={2}>              
                <Grid item xs={6}>
                    <TextField
                        label="Model Number"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        required
                        id="model_number"
                        name="model_number"
                        value={formik.values.model_number}
                        onChange={formik.handleChange}
                        error={formik.touched.model_number && Boolean(formik.errors.model_number)}
                        helperText={formik.touched.model_number && formik.errors.model_number}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Model Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        required
                        id="model_name"
                        name="model_name"
                        value={formik.values.model_name}
                        onChange={formik.handleChange}
                        error={formik.touched.model_name && Boolean(formik.errors.model_name)}
                        helperText={formik.touched.model_name && formik.errors.model_name}
                                />
                </Grid>
            </Grid>
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
                        label="User Name"
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
                        label="Company ID"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        required
                        id="company_id"
                        name="company_id"
                        value={formik.values.company_id}
                        onChange={formik.handleChange}
                        error={formik.touched.company_id && Boolean(formik.errors.company_id)}
                        helperText={formik.touched.company_id && formik.errors.company_id}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Company Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        required
                        id="company_name"
                        name="company_name"
                        value={formik.values.company_name}
                        onChange={formik.handleChange}
                        error={formik.touched.company_name && Boolean(formik.errors.company_name)}
                        helperText={formik.touched.company_name && formik.errors.company_name}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2}>              
              <Grid item xs={6}>
                  <TextField
                      label="Latitude"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      required
                      id="latitude"
                      name="latitude"
                      value={formik.values.latitude}
                      onChange={formik.handleChange}
                      error={formik.touched.latitude && Boolean(formik.errors.latitude)}
                      helperText={formik.touched.latitude && formik.errors.latitude}
                  />
              </Grid>
              <Grid item xs={6}>
                  <TextField
                      label="Longitude"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      required
                      id="longitude"
                      name="longitude"
                      value={formik.values.longitude}
                      onChange={formik.handleChange}
                      error={formik.touched.longitude && Boolean(formik.errors.longitude)}
                      helperText={formik.touched.longitude && formik.errors.longitude}
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
