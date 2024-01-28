import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import { Box, Typography, useTheme } from '@mui/material';
import { tokens } from '../../theme';
import axios from "axios";
import StatBoxVal from '../../components/StatBoxVal';

import PhonelinkEraseIcon from '@mui/icons-material/PhonelinkErase';
import TapAndPlayIcon from '@mui/icons-material/TapAndPlay';
import PhonelinkSetupIcon from '@mui/icons-material/PhonelinkSetup';

const AdminDashboard = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const [registeredUsers, setRegisteredUsers] = useState(0);
	const [totalDevices, setTotalDevies] = useState(0);
	const [unregisteredDevices, setUnregisteredDevices] = useState(0);

	useEffect(() => {
		axios
		  .get("/customers/companyCustomerCount")
		  .then(response => {
			setRegisteredUsers(response.data['COUNT(*)']);
		  })
		  .catch(err => {
			console.error(err);
		  });
	  }, []);

	  useEffect(() => {
		axios
		  .get("/devices/deviceCountforCompany")
		  .then(response => {
			setTotalDevies(response.data['COUNT(*)']);
		  })
		  .catch(err => {
			console.error(err);
		  });
	  }, []);

	  useEffect(() => {
		// Difference between totalDevices and registeredUsers
		setUnregisteredDevices(totalDevices - registeredUsers);
	}, [totalDevices, registeredUsers]);

	return (
		<Box m="20px" width="70%">
			{/* Header */}
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
			>
				<Header title="DASHBORD" subtitle="Welcome to your dahboard" />
			</Box>
			{/* Grid */}

			<Box
				display="grid"
				gridTemplateColumns="repeat(10, 1fr)"
				gridAutoRows="40px"
				gap="10px"
			>
				<Box
					gridColumn="span 10"
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
						Users & Device Summery
					</Typography>
				</Box>
				<Box
					gridColumn="span 5"
					gridRow="span 3"
					backgroundColor={colors.primary[400]}
					display="flex"
					alignItems="center"
					justifyContent="center"
				>
					<StatBoxVal
						title="TOTAL USERS"
						value={registeredUsers}
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
				<Box
					gridColumn="span 5"
					gridRow="span 3"
					backgroundColor={colors.primary[400]}
					display="flex"
					alignItems="center"
					justifyContent="center"
				>
					<StatBoxVal
						title="TOTAL DEVICES"
						value={totalDevices}
						icon={
							<PhonelinkEraseIcon
								sx={{
									color: colors.orangeAccent[600],
									fontSize: '26px',
								}}
							/>
						}
					></StatBoxVal>
				</Box>
				<Box
					gridColumn="span 5"
					gridRow="span 3"
					backgroundColor={colors.primary[400]}
					display="flex"
					alignItems="center"
					justifyContent="center"
				>
					<StatBoxVal
						title="REGISTERED DEVICES"
						value={registeredUsers}
						icon={
							<PhonelinkSetupIcon
								sx={{
									color: colors.grey[200],
									fontSize: '26px',
								}}
							/>
						}
					></StatBoxVal>
				</Box>
				<Box
					gridColumn="span 5"
					gridRow="span 3"
					backgroundColor={colors.primary[400]}
					display="flex"
					alignItems="center"
					justifyContent="center"
				>
					<StatBoxVal
						title="UNREGISTERED DEVICES"
						value={unregisteredDevices}
						icon={
							<PhonelinkSetupIcon
								sx={{
									color: colors.grey[200],
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

export default AdminDashboard;
