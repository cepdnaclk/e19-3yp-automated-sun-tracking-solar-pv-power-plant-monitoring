import React, { useContext } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Header from '../../components/Header';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/system';
import { tokens } from '../../theme';
import { Box, TextField, Button, Grid } from '@mui/material';
import { AlertContext } from "../../contexts/AlertContext";

const AdminAddDevice = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { showAlert } = useContext(AlertContext);

  const validationSchema = Yup.object({
    id: Yup.string().required("Required"),
    device_description: Yup.string().required("Required"),
    purchased_customer_email: Yup.string().email("Invalid email address").required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      id: "",
      device_description: "",
      purchased_customer_email: "",
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
          showAlert("Device Updated Successfully", "success");
          resetForm();
        })
        .catch((error) => {
          console.log(error);
          showAlert("Error Updating Device", "error");
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
					title="ADD DEVICES "
					subtitle="Update new device"
				/>
			</Box>

      <form onSubmit={formik.handleSubmit} style={{ background: `${colors.primary[400]}` }}>
        <Box m="0px 25px">
          <TextField
            label="Device ID"
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
            label="Description"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            id="device_description"
            name="device_description"
            value={formik.values.device_description}
            onChange={formik.handleChange}
            error={formik.touched.device_description && Boolean(formik.errors.device_description)}
            helperText={formik.touched.device_description && formik.errors.device_description}
          />
          <TextField
            label="Customer Email"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            id="purchased_customer_email"
            name="purchased_customer_email"
            value={formik.values.purchased_customer_email}
            onChange={formik.handleChange}
            error={formik.touched.purchased_customer_email && Boolean(formik.errors.purchased_customer_email)}
            helperText={formik.touched.purchased_customer_email && formik.errors.purchased_customer_email}
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
            <Link to="/admin-device-management" style={{ textDecoration: 'none' }}>
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

export default AdminAddDevice;
