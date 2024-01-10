import React from 'react';
import Header from '../../components/Header';
import { Link } from 'react-router-dom';
import { Box, Button, IconButton, Typography, useTheme } from '@mui/material';
import { tokens } from '../../theme';

import { DataGrid } from '@mui/x-data-grid';

// admin user data
import { adminUserData } from '../../data/adminUserData';

const AdminUserMng = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	// columns of the data grid
	const columns = [
        { field: 'id', headerName: 'ID' },
		{ field: 'userId', headerName: 'User ID' },
		{
			field: 'userName',
			headerName: 'User Name',
			flex: 1,
			cellClassName: 'name-column--cell',
		},
		{
			field: 'devices',
			headerName: 'User Devices',
			flex: 1,
		},
		{ field: 'active', headerName: 'Active', flex: 1 },
		{ field: 'inactive', headerName: 'Inactive', flex: 1 },
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

	const handleEdit = (userId) => {
		// Handle edit logic here
		console.log(`Editing device with ID: ${userId}`);
	};

	const handleDelete = (userId) => {
		// Handle delete logic here
		console.log(`Deleting device with ID: ${userId}`);
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
				<Link to="/admin-add-user" style={{ textDecoration: 'none' }}>
					<Button type="submit" variant="contained" color="primary"
					style={{ background: '#FFAC09', color: 'black', fontWeight: 'bold', margin: '0px 0px 10px 1000px'}}
					>
					Add New User
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
					rows={adminUserData}
					columns={columns}
				/>
			</Box>
		</Box>
	);
};

export default AdminUserMng;
