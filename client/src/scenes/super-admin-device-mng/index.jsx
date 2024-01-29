import { Box, Button, useTheme } from '@mui/material';
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
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import { tokens } from '../../theme';

const SuperAdminDeviceMng = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const [superAdminDeviceData, setSuperAdminDeviceData] = useState([]);
	const [rows, setRows] = useState([]);
	const [rowModesModel, setRowModesModel] = useState({});
	const [editedRows, setEditedRows] = useState({});

	useEffect(() => {
		axios
			.get('/devices/view')
			.then((res) => {
				setSuperAdminDeviceData(res.data);
				setRows(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

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

		setEditedRows({
			...editedRows,
			[id]: { ...rows.find((row) => row.id === id) },
		});
	};

	const handleSaveClick = (id) => () => {
		const editedRow = rows.find((row) => row.id === id);
		const originalRow = editedRows[id];

		if (JSON.stringify(editedRow) !== JSON.stringify(originalRow)) {
			axios
				.put('/devices/adminUpdate', editedRow) // Update the endpoint as needed
				.then((res) => {
					setRows((prevRows) =>
						prevRows.map((row) => (row.id === id ? editedRow : row))
					);
					setRowModesModel({
						...rowModesModel,
						[id]: { mode: GridRowModes.View },
					});
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			setRowModesModel({
				...rowModesModel,
				[id]: { mode: GridRowModes.View },
			});
		}
	};

	const handleDeleteClick = (id) => () => {
		const password = prompt('Enter your password for verification:', '');
		const rowIndex = superAdminDeviceData.findIndex((row) => row.id === id);
		const updatedData = [...superAdminDeviceData];
		updatedData.splice(rowIndex, 1);

		setSuperAdminDeviceData(updatedData);

		setRowModesModel({
			...rowModesModel,
			[id]: { mode: GridRowModes.View, ignoreModifications: true },
		});
	};

	// const handleSaveClick = (id) => () => {
	// 	const editedRow = rows.find((row) => row.id === id);
	// 	const originalRow = editedRows[id];

	// 	if (JSON.stringify(editedRow) !== JSON.stringify(originalRow)) {
	// 		axios
	// 			.put('/devices/updateDevice', editedRow) // Update the endpoint as needed
	// 			.then((res) => {
	// 				setRows((prevRows) =>
	// 					prevRows.map((row) => (row.id === id ? editedRow : row))
	// 				);
	// 				setRowModesModel({
	// 					...rowModesModel,
	// 					[id]: { mode: GridRowModes.View },
	// 				});
	// 			})
	// 			.catch((err) => {
	// 				console.log(err);
	// 			});
	// 	} else {
	// 		setRowModesModel({
	// 			...rowModesModel,
	// 			[id]: { mode: GridRowModes.View },
	// 		});
	// 	}
	// };

	const handleCancelClick = (id) => () => {
		setRowModesModel({
			...rowModesModel,
			[id]: { mode: GridRowModes.View, ignoreModifications: true },
		});

		const editedRow = rows.find((row) => row.id === id);
		if (editedRow.isNew) {
			setRows(rows.filter((row) => row.id !== id));
		}
	};

	const processRowUpdate = (newRow) => {
		const updatedRow = { ...newRow, isNew: false };
		setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
		return updatedRow;
	};

	const handleRowModesModelChange = (newRowModesModel) => {
		setRowModesModel(newRowModesModel);
	};

	const columns = [
		{ field: 'id', headerName: 'ID' },
		{
			field: 'modelName',
			headerName: 'Model Name',
			flex: 1,
			editable: true,
		},
		{
			field: 'modelNumber',
			headerName: 'Model Number',
			flex: 1,
			editable: true,
		},
		{
			field: 'assignedCompanyId',
			headerName: 'Company ID',
			flex: 1,
			editable: true,
		},
		{
			field: 'assignedCompanyName',
			headerName: 'Company Name',
			flex: 1,
			cellClassName: 'name-column--cell',
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
		<Box m="10px 20px 20px 20px" width="90%">
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
					to="/super-admin-add-device"
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
					rows={superAdminDeviceData}
					columns={columns}
					editMode="row"
					rowModesModel={rowModesModel}
					onRowModesModelChange={handleRowModesModelChange}
					onRowEditStop={handleRowEditStop}
					processRowUpdate={processRowUpdate}
				/>
			</Box>
		</Box>
	);
};

export default SuperAdminDeviceMng;
