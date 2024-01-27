import React, { useContext } from 'react';
import Header from '../../components/Header';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useTheme } from '@mui/system';
import { tokens } from '../../theme';
import { Box, TextField, Button, Grid } from '@mui/material';
import { useFormik } from "formik";
import * as Yup from "yup";
import { AlertContext } from "../../contexts/AlertContext";

const UserAddDevice = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { showAlert } = useContext(AlertContext);

    const validationSchema = Yup.object({
      id: Yup.string().required("Required"),
      assigned_customer_id: Yup.string().required("Required"),
      device_name_by_customer: Yup.string().required("Required"),
      device_latitude: Yup.string().required("Required"),
      device_longitude: Yup.string().required("Required"),
    });
  
    const formik = useFormik({
      initialValues: {
        id: "",
        assigned_customer_id: "",
        device_name_by_customer: "",
        device_latitude: "",
        device_longitude: "",
      },
      validationSchema: validationSchema,
      onSubmit: (values, { resetForm }) => {
        // Handle login logic here
        axios
          .put("/devices/", {
            ...values,
          })
          .then((response) => {
            console.log(response);
            showAlert("Device Assigned Successfully", "success");
            resetForm();
          })
          .catch((error) => {
            console.log(error);
            showAlert("Error Assigning Device", "error");
          });
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
  
        <form onSubmit={formik.handleSubmit} style={{ background: `${colors.primary[400]}` }}>
          <Box m="0px 25px">
          <TextField
              label="Device Id"
              variant="outlined"
              fullWidth
              margin="normal"
              required
              id="id"
              name="id"
              value={formik.values.id}
              onChange={formik.handleChange}
              error={formik.touched.id && Boolean(formik.errors.id)}
              helperText={formik.touched.id && formik.errors.id}
            />
            <TextField
              label="User Id"
              variant="outlined"
              fullWidth
              margin="normal"
              required
              id="assigned_customer_id"
              name="assigned_customer_id"
              value={formik.values.assigned_customer_id}
              onChange={formik.handleChange}
              error={formik.touched.assigned_customer_id && Boolean(formik.errors.assigned_customer_id)}
              helperText={formik.touched.assigned_customer_id && formik.errors.assigned_customer_id}
            />
            <TextField
              label="Device Name"
              variant="outlined"
              fullWidth
              margin="normal"
              required
              id="device_name_by_customer"
              name="device_name_by_customer"
              value={formik.values.device_name_by_customer}
              onChange={formik.handleChange}
              error={formik.touched.device_name_by_customer && Boolean(formik.errors.device_name_by_customer)}
              helperText={formik.touched.device_name_by_customer && formik.errors.device_name_by_customer}
            />
            <TextField
                label="Latitude"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                id="device_latitude"
                name="device_latitude"
                value={formik.values.device_latitude}
                onChange={formik.handleChange}
                error={formik.touched.device_latitude && Boolean(formik.errors.device_latitude)}
                helperText={formik.touched.device_latitude && formik.errors.device_latitude}
            />
            <TextField
                label="Longitude"
                variant="outlined"
                fullWidth
                margin="normal"
                required
                id="device_longitude"
                name="device_longitude"
                value={formik.values.device_longitude}
                onChange={formik.handleChange}
                error={formik.touched.device_longitude && Boolean(formik.errors.device_longitude)}
                helperText={formik.touched.device_longitude && formik.errors.device_longitude}
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
