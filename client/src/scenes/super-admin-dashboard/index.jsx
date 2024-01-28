import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import { Box, useTheme, Typography } from '@mui/material';
import { tokens } from '../../theme';
import StatBoxVal from '../../components/StatBoxVal';
import axios from "axios";

import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import AppSettingsAltOutlinedIcon from '@mui/icons-material/AppSettingsAltOutlined';

import PhonelinkEraseIcon from '@mui/icons-material/PhonelinkErase';
import TapAndPlayIcon from '@mui/icons-material/TapAndPlay';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';

const SuperAdminDashboard = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const [registeredCompanies, setRegisteredCompanies] = useState(0);
	const [registeredCustomers, setRegisteredCustomers] = useState(0);
	const [registeredDevices, setRegisteredDevices] = useState(0);
	// const [activeDevices, setActiveDevices] = useState(0);
	// const [inactiveDevices, setInactiveDevices] = useState(0);

	useEffect(() => {
		axios
		  .get("/companies/companyCount")
		  .then(response => {
			setRegisteredCompanies(response.data['COUNT(*)']);
		  })
		  .catch(err => {
			console.error(err);
		  });
	  }, []);

	  useEffect(() => {
		axios
		  .get("/customers/customerCount")
		  .then(response => {
			setRegisteredCustomers(response.data['COUNT(*)']);
		  })
		  .catch(err => {
			console.error(err);
		  });
	  }, []);
	  
	  useEffect(() => {
		axios
		  .get("/devices/deviceCount")
		  .then(response => {
			console.log(response);
			setRegisteredDevices(response.data['COUNT(*)']);
		  })
		  .catch(err => {
			console.error(err);
		  });
	  }, []);

	//   useEffect(() => {
	// 	axios
	// 	  .get("/devices/activeDeviceCount")
	// 	  .then(response => {
	// 		console.log(response);
	// 		setActiveDevices(response.data['COUNT(*)']);
	// 	  })
	// 	  .catch(err => {
	// 		console.error(err);
	// 	  });
	//   }, []);

	//   useEffect(() => {
	// 	axios
	// 	  .get("/devices/inactiveDeviceCount")
	// 	  .then(response => {
	// 		console.log(response);
	// 		setInactiveDevices(response.data['COUNT(*)']);
	// 	  })
	// 	  .catch(err => {
	// 		console.error(err);
	// 	  });
	//   }, []);

	return (
		<Box m="20px 100px 20px 20px" width={"70%"}>
			{/* Header */}
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
			>
				<Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
			</Box>

			
			<Box
				display="grid"
				gridTemplateColumns="repeat(12, 1fr)"
				gridAutoRows="40px"
				gap="10px"
			>
				<Box
					gridColumn="span 12"
					backgroundColor={colors.primary[400]}
					display="flex"
					alignItems="center"
					justifyContent="space-between"
					colors={colors.grey[100]}
					p="15px"
				>
					<Typography
						color={colors.grey[100]}
						variant="h5"
						fontWeight="600"
					>
						Users Summary
					</Typography>
				</Box>
				<Box
					gridColumn="span 6"
					gridRow="span 3"
					backgroundColor={colors.primary[400]}
					display="flex"
					alignItems="center"
					justifyContent="center"
					sx={{ minHeight: '150px' }}
				>
					<StatBoxVal
						title="REGISTERED COMPANIES"
						value={registeredCompanies}
						icon={
							<HowToRegOutlinedIcon
								sx={{
									color: '#FF610A',
									fontSize: '26px',
								}}
							/>
						}
					></StatBoxVal>
				</Box>
				<Box
					gridColumn="span 6"
					gridRow="span 3"
					backgroundColor={colors.primary[400]}
					display="flex"
					alignItems="center"
					justifyContent="center"
					sx={{ minHeight: '150px' }}
				>
					<StatBoxVal
						title="REGISTERED CUSTOMERS"
						value={registeredCustomers}
						icon={
							<PeopleAltOutlinedIcon
								sx={{
									color: '#14DD10',
									fontSize: '26px',
								}}
							/>
						}
					></StatBoxVal>
				</Box>
			</Box>
			<Box
				display="grid"
				gridTemplateColumns="repeat(12, 1fr)"
				gridAutoRows="40px"
				gap="10px"
			>
				<Box m="40px 0"
					gridColumn="span 12"
					backgroundColor={colors.primary[400]}
					display="flex"
					alignItems="center"
					justifyContent="space-between"
					colors={colors.grey[100]}
					p="15px"
				>
					<Typography
						color={colors.grey[100]}
						variant="h5"
						fontWeight="600"
					>
						Devices Summary
					</Typography>
				</Box>
				<Box m="30px 0"
					gridColumn="span 4"
					gridRow="span 3"
					backgroundColor={colors.primary[400]}
					display="flex"
					alignItems="center"
					justifyContent="center"
					sx={{ minHeight: '150px' }}
				>
					<StatBoxVal
						title="REGISTERED DEVICES"
						value={registeredDevices}
						icon={
							<TapAndPlayIcon
								sx={{
									color: '#14DD10',
									fontSize: '26px',
								}}
							/>
						}
					></StatBoxVal>
				</Box>
				<Box m="30px 0"
					gridColumn="span 4"
					gridRow="span 3"
					backgroundColor={colors.primary[400]}
					display="flex"
					alignItems="center"
					justifyContent="center"
					sx={{ minHeight: '150px' }}
				>
					<StatBoxVal
						title="ACTIVE DEVICES"
						value="5" // {activeDevices}
						icon={
							<PhonelinkEraseIcon
								sx={{
									color: '#FF0A0A',
									fontSize: '26px',
								}}
							/>
						}
					></StatBoxVal>
				</Box>
				<Box m="30px 0"
					gridColumn="span 4"
					gridRow="span 3"
					backgroundColor={colors.primary[400]}
					display="flex"
					alignItems="center"
					justifyContent="center"
					sx={{ minHeight: '150px' }}
				>
					<StatBoxVal
						title="INACTIVE DEVICES"
						value="3" // {inactiveDevices}
						icon={
							<PhonelinkEraseIcon
								sx={{
									color: '#FF0A0A',
									fontSize: '26px',
								}}
							/>
						}
					></StatBoxVal>
				</Box>
			</Box>

		</Box>
	);
};

export default SuperAdminDashboard;
