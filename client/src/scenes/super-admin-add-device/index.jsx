import React from 'react';
import Header from '../../components/Header';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/system';
import { tokens } from '../../theme';
import { Box, TextField, Button, Input } from '@mui/material';
import { useFormik } from "formik";
import * as Yup from "yup";

const SuperAdminAddDevice = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    // You can access form data using event.target.elements
    // For example: event.target.elements.companyName.value
  };

  const validationSchema = Yup.object({
    device_id: Yup.string().required("Required"),
    model_name: Yup.string().required("Required"),
    model_number: Yup.string().required("Required"),
    company_id: Yup.string().required("Required"),
    company_name: Yup.string().required("Required"),
    file: Yup.mixed().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      device_id: "",
      model_name: "",
      model_number: "",
      company_id: "",
      company_name: "",
      file: null,
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      // Handle login logic here
    },
  });

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
            id="device_id"
            name="device_id"
            value={formik.values.device_id}
            onChange={formik.handleChange}
            error={formik.touched.device_id && Boolean(formik.errors.device_id)}
            helperText={formik.touched.device_id && formik.errors.device_id}
          />
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
