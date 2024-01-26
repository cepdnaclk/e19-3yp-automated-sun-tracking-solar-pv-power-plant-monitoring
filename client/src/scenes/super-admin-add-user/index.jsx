import { Box, Button, TextField } from "@mui/material";
import { useTheme } from "@mui/system";
import axios from "axios";
import { useFormik } from "formik";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import Header from "../../components/Header";
import { AlertContext } from "../../contexts/AlertContext";
import { tokens } from "../../theme";

const SuperAdminAdduser = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { showAlert } = useContext(AlertContext);

  const validationSchema = Yup.object({
    username: Yup.string().required("Required"),
    contact_number: Yup.string()
      .required("Required")
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(10, "Must be exactly 10 digits")
      .max(10, "Must be exactly 10 digits"),
    email: Yup.string().email("Invalid email address").required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      contact_number: "",
      user_address: "",
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      // Handle login logic here
      axios
        .post("/companies/new", {
          ...values,
        })
        .then((response) => {
          console.log(response);
          showAlert("Company Added Successfully", "success");
          resetForm();
        })
        .catch((error) => {
          console.log(error);
          showAlert("Error Adding Company", "error");
        });
    },
  });

  return (
    <Box style={{ margin: "15px 100px 15px 25px" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="COMPANY & DEVICES" subtitle="Add new company" />
      </Box>

      <form
        onSubmit={formik.handleSubmit}
        style={{ background: `${colors.primary[400]}` }}
      >
        <Box m="0px 25px">
          <TextField
            label="Company Username"
            variant="outlined"
            fullWidth
            margin="normal"
            id="username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
            label="Company Email"
            variant="outlined"
            fullWidth
            margin="normal"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            label="Company Address"
            variant="outlined"
            fullWidth
            margin="normal"
            id="user_address"
            name="user_address"
            value={formik.values.user_address}
            onChange={formik.handleChange}
            error={
              formik.touched.user_address && Boolean(formik.errors.user_address)
            }
            helperText={
              formik.touched.user_address && formik.errors.user_address
            }
          />
          <TextField
            label="Contact Number"
            variant="outlined"
            fullWidth
            margin="normal"
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

          <Box style={{ display: "flex" }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{
                background: "#FFAC09",
                color: "black",
                fontWeight: "bold",
                margin: "20px 20px 20px 0",
              }}
            >
              Add Company
            </Button>
            <Link
              to="/super-admin-user-management"
              style={{ textDecoration: "none" }}
            >
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{
                  background: "#FFAC09",
                  color: "black",
                  fontWeight: "bold",
                  margin: "20px 0",
                }}
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

export default SuperAdminAdduser;
