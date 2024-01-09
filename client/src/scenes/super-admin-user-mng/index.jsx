import React from 'react';
import Header from '../../components/Header';
import { Link } from 'react-router-dom';
import { Box, Button, IconButton, Typography, useTheme } from '@mui/material';
import { tokens } from '../../theme';

import { DataGrid } from '@mui/x-data-grid';

// super admin user data
import { superAdminUserData } from '../../data/superAdminUserData';

const SuperAdminUserMng = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	// columns of the data grid
	const columns = [
        { field: 'id', headerName: 'ID' },
		{ field: 'companyId', headerName: 'Company ID' },
		{
			field: 'companyName',
			headerName: 'Company Name',
			flex: 1,
			cellClassName: 'name-column--cell',
		},
		{
			field: 'devices',
			headerName: 'Devices',
			flex: 1,
		},
		{ field: 'registered', headerName: 'Registered', flex: 1 },
		{ field: 'unregistered', headerName: 'Unregistered', flex: 1 },
		{
			field: 'actions',
			headerName: 'Actions',
			flex: 1,
			renderCell: (params) => (
				<>
					<Button
						variant="outlined"
						size="small"
						onClick={() => handleEdit(params.id)} // Use params.id instead of params.row.deviceId
						sx={{
							ml: 2,
							color: colors.yellowAccent[400],
							borderColor: colors.yellowAccent[400],
						}}
					>
						Edit
					</Button>
					<Button
						variant="outlined"
						color="error"
						size="small"
						onClick={() => handleDelete(params.id)} // Use params.id instead of params.row.deviceId
						sx={{ ml: 1 }}
					>
						Delete
					</Button>
				</>
			),
		},
	];

	const handleEdit = (companyId) => {
		// Handle edit logic here
		console.log(`Editing device with ID: ${companyId}`);
	};

	const handleDelete = (companyId) => {
		// Handle delete logic here
		console.log(`Deleting device with ID: ${companyId}`);
	};

	return (
		<Box m="10px 20px 20px 20px" width="90%">
			{/* Header */}
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
			>
				<Header
					title="USER MANAGEMENT"
					subtitle="Manage Users and Device Overview"
				/>
			</Box>
			<Box>
				<Link to="/super-admin-add-user" style={{ textDecoration: 'none' }}>
					<Button type="submit" variant="contained" color="primary"
					style={{ background: '#FFAC09', color: 'black', fontWeight: 'bold', margin: '0px 0px 10px 1000px'}}
					>
					Add New Company
					</Button>
				</Link>
			</Box>

			<Box
				height="75vh"
				sx={{
					'& .MuiDataGrid-root': {
						border: 'none',
					},
					'& .MuiDataGrid-cell': {
						borderBottom: 'none',
					},
					'& .name-column--cell': {
						color: colors.yellowAccent[300],
					},
					'& .MuiDataGrid-columnHeaders': {
						backgroundColor: colors.blueAccent[700],
						borderBottom: 'none',
					},
					'& .MuiDataGrid-virtualScroller': {
						backgroundColor: colors.primary[400],
					},
					'& .MuiDataGrid-footerContainer': {
						borderTop: 'none',
						backgroundColor: colors.blueAccent[700],
					},
					'& .MuiCheckbox-root': {
						color: `${colors.yellowAccent[200]} !important`,
					},
				}}
			>
				<DataGrid
					checkboxSelection
					rows={superAdminUserData}
					columns={columns}
				/>
			</Box>
		</Box>
	);
};

export default SuperAdminUserMng;
