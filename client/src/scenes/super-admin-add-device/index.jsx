import React, { useContext } from 'react';
import Header from '../../components/Header';
import axios from "axios";
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/system';
import { tokens } from '../../theme';
import { Box, TextField, Button, Input, Grid } from '@mui/material';
import { AlertContext } from "../../contexts/AlertContext";
import { useFormik } from "formik";
import * as Yup from "yup";

const SuperAdminAddDevice = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { showAlert } = useContext(AlertContext);

  const validationSchema = Yup.object({
    // device_id: Yup.string().required("Required"),
    model_name: Yup.string().required("Required"),
    model_number: Yup.string().required("Required"),
    assigned_company_id: Yup.string().required("Required"),
    assigned_company_name: Yup.string().required("Required"),
    files: Yup.mixed().required("File is required"),
  });

  const formik = useFormik({
    initialValues: {
      model_name: "",
      model_number: "",
      assigned_company_id: "",
      assigned_company_name: "",
      files: null,
    },
    validationSchema: validationSchema,
  });

  const handleUpload = async () => {
    console.log('Uploading file:', formik.values.files);
    try {
      // Create FormData object
      const formData = new FormData();

      // Append the single file to FormData
      formData.append('userManual', formik.values.files);

      // Upload files to the server
      await axios.post("/upload", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      showAlert("File Uploaded Successfully", "success");
    } catch (error) {
      console.error(error);
      showAlert("Error Uploading File", "error");
    }
  };

  const handleAddDevice = async () => {
    try {
      // Proceed to add the device
      const response = await axios.post("/devices/newDevice", {
        model_name: formik.values.model_name,
        model_number: formik.values.model_number,
        assigned_company_id: formik.values.assigned_company_id,
        assigned_company_name: formik.values.assigned_company_name,
      });

      console.log(response);
      showAlert("Device Added Successfully", "success");
      formik.resetForm();
    } catch (error) {
      console.error(error);
      showAlert("Error Adding Device", "error");
    }
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

      <form onSubmit={formik.handleSubmit} style={{ background: `${colors.primary[400]}` }}>
        <Box m="0px 25px">
          {/* <TextField
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
          /> */}
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
            id="assigned_company_id"
            name="assigned_company_id"
            value={formik.values.assigned_company_id}
            onChange={formik.handleChange}
            error={formik.touched.assigned_company_id && Boolean(formik.errors.assigned_company_id)}
            helperText={formik.touched.assigned_company_id && formik.errors.assigned_company_id}
          />
          <TextField
            label="Company Name"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            id="assigned_company_name"
            name="assigned_company_name"
            value={formik.values.assigned_company_name}
            onChange={formik.handleChange}
            error={formik.touched.assigned_company_name && Boolean(formik.errors.assigned_company_name)}
            helperText={formik.touched.assigned_company_name && formik.errors.assigned_company_name}
          />
           <Box display="flex" marginTop= '20px' >
            <Input
              type="file"
              margin="normal"
              inputProps={{ accept: '.pdf, .doc, .docx' }}
              onChange={(event) => {
                formik.setFieldValue('files', event.target.files[0]);
              }}
              error={formik.touched.files && Boolean(formik.errors.files)}
              helperText={formik.touched.files && formik.errors.files}
              style={{ width: '90%', marginRight: '5px' }}
            />
            <Button
              type="button"
              variant="contained"
              color="primary"
              onClick={handleUpload}
              style={{
                background: 'white',
                color: 'black',
                fontWeight: 'bold',
                fontSize: '10px',
                width: '10%',
                height: '27px',
              }}
            >
              Upload File
            </Button>
          </Box>
          <Box style={{ display: 'flex' }}>
            <Button
              type="button"
              variant="contained"
              color="primary"
              onClick={handleAddDevice}
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


