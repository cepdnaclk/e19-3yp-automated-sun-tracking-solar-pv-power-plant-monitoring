import React, { useState, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
	GridRowModes,
	DataGrid,
	GridActionsCellItem,
	GridRowEditStopReasons,
} from '@mui/x-data-grid';
import Header from '../../components/Header';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, useTheme } from '@mui/material';
import { tokens } from '../../theme';

const AdminDeviceMng = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const [adminDeviceData, setAdminDeviceData] = useState([]);
	const [rows, setRows] = useState([]);
	const [rowModesModel, setRowModesModel] = useState({});

	useEffect(() => {
		axios
			.get('/devices/')
			.then((res) => {
				setAdminDeviceData(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	// data-grid functions
	const handleRowEditStop = (params, event) => {
		if (params.reason === GridRowEditStopReasons.rowFocusOut) {
			event.defaultMuiPrevented = true;
		}
	};

	const handleEditClick = (id) => () => {
		setRowModesModel({
			...rowModesModel,
			[id]: { mode: GridRowModes.Edit },
		});
	};

	const handleSaveClick = (id) => () => {
		setRowModesModel({
			...rowModesModel,
			[id]: { mode: GridRowModes.View },
		});
	};

	const handleDeleteClick = (id) => () => {
		// Get the index of the row to be deleted
		const rowIndex = adminDeviceData.findIndex((row) => row.id === id);

		// Remove the row from the data
		const updatedData = [...adminDeviceData];
		updatedData.splice(rowIndex, 1);

		setAdminDeviceData(updatedData);

		setRowModesModel({
			...rowModesModel,
			[id]: { mode: GridRowModes.View, ignoreModifications: true },
		});

		// Uncomment the following lines if you want to make a delete request to the API
		// const password = prompt('Enter your password for verification:', '');
		// axios
		// 	.delete('/companies/', {
		// 		data: {
		// 			companyId: id,
		// 			password: password,
		// 		},
		// 	})
		// 	.then((res) => {
		// 		// Handle the response if needed
		// 		console.log(res.data);
		// 	})
		// 	.catch((err) => {
		// 		console.error(err);
		// 		// Handle the error
		// 	});
	};

	const handleCancelClick = (id) => () => {
		const editedRow = rows.find((row) => row.id === id);

		if (editedRow) {
			if (editedRow.isNew) {
				setRows((prevRows) => prevRows.filter((row) => row.id !== id));
			}

			setRowModesModel({
				...rowModesModel,
				[id]: {
					mode: GridRowModes.View,
					ignoreModifications: true,
				},
			});
		}
	};

	const processRowUpdate = (newRow) => {
		const updatedRow = { ...newRow, isNew: false };
		setRows((prevRows) =>
			prevRows.map((row) => (row.id === newRow.id ? updatedRow : row))
		);
		return updatedRow;
	};

	const handleRowModesModelChange = (newRowModesModel) => {
		setRowModesModel(newRowModesModel);
	};

	// columns of the data grid
	const columns = [
		{ field: 'id', headerName: 'ID' },
		{
			field: 'modelName',
			headerName: 'Model Name',
			flex: 1,
			cellClassName: 'name-column--cell',
			width: 150,
			editable: true,
		},
		{
			field: 'modelNumber',
			headerName: 'Model Number',
			width: 150,
			editable: true,
		},
		{
			field: 'deviceDescription',
			headerName: 'Description',
			flex: 1,
			cellClassName: 'name-column--cell',
			width: 200,
			editable: true,
		},
		{
			field: 'purchasedCustomerEmail',
			headerName: 'Customer Email',
			flex: 1,
			editable: true,
		},
		{
			field: 'actions',
			headerName: 'Actions',
			flex: 1,
			type: 'actions',
			cellClassName: 'actions',
			getActions: ({ id }) => {
				const isInEditMode =
					rowModesModel[id]?.mode === GridRowModes.Edit;

				if (isInEditMode) {
					return [
						<GridActionsCellItem
							icon={<SaveIcon />}
							label="Save"
							sx={{
								color: colors.yellowAccent[400],
							}}
							onClick={handleSaveClick(id)}
						/>,
						<GridActionsCellItem
							icon={<CancelIcon />}
							label="Cancel"
							className="textPrimary"
							onClick={handleCancelClick(id)}
							sx={{
								color: colors.redAccent[500],
							}}
						/>,
					];
				}

				return [
					<GridActionsCellItem
						icon={<EditIcon />}
						label="Edit"
						className="textPrimary"
						onClick={handleEditClick(id)}
						sx={{
							color: colors.yellowAccent[400],
						}}
					/>,
					<GridActionsCellItem
						icon={<DeleteIcon />}
						label="Delete"
						onClick={handleDeleteClick(id)}
						sx={{
							color: colors.redAccent[500],
						}}
					/>,
				];
			},
		},
	];

	return (
		<Box m="20px" width="90%">
			{/* Header */}
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
			>
				<Header
					title="DEVICE MANAGEMENT"
					subtitle="Manage Devices and Device Overview"
				/>
			</Box>

			<Box>
				<Link
					to="/admin-add-device"
					style={{
						textDecoration: 'none',
						margin: '1rem 0',
						display: 'flex',
					}}
				>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						style={{
							background: '#FFAC09',
							color: 'black',
							fontWeight: 'bold',
							marginLeft: 'auto',
						}}
					>
						Add New Device
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
					rows={adminDeviceData}
					columns={columns}
					editMode="row"
					rowModesModel={rowModesModel}
					onRowModesModelChange={handleRowModesModelChange}
					onRowEditStop={handleRowEditStop}
					onSelectionModelChange={(newSelection) => {
						// Handle selection changes if needed
					}}
				/>
			</Box>
		</Box>
	);
};

export default AdminDeviceMng;
