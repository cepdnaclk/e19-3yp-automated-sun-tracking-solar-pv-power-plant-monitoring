import CancelIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { Box, Button, useTheme } from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
  GridRowModes,
  useGridApiRef,
} from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const SuperAdminUserMng = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [superAdminUserData, setSuperAdminUserData] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  const apiRef = useGridApiRef();

  useEffect(() => {
    axios
      .get("/companies/view")
      .then((res) => {
        setSuperAdminUserData(res.data);
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
  };

  const handleSaveClick = (id) => () => {
    const editRowsModel = apiRef.current.getEditRowsModel();
    const editedCellValues = editRowsModel[id];

    console.log(editedCellValues);
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View },
    });
  };

	const handleDeleteClick = (id) => () => {
		// Get the index of the row to be deleted
    const password = prompt('Enter your password for verification:', '');
		const rowIndex = superAdminUserData.findIndex((row) => row.id === id);

		// Remove the row from the data
		const updatedData = [...superAdminUserData];
		updatedData.splice(rowIndex, 1);

		setSuperAdminUserData(updatedData);

		setRowModesModel({
			...rowModesModel,
			[id]: { mode: GridRowModes.View, ignoreModifications: true },
		});

		// Uncomment the following lines if you want to make a delete request to the API
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
				[id]: { mode: GridRowModes.View, ignoreModifications: true },
			});
		}
	};

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setSuperAdminUserData(
      superAdminUserData.map((row) => (row.id === newRow.id ? updatedRow : row))
    );
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  // columns of the data grid
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "username",
      headerName: "Company Name",
      flex: 1,
      cellClassName: "name-column--cell",
      editable: true,
    },
    {
      field: "email",
      headerName: "Company Email",
      flex: 1,
      editable: true,
    },
    {
      field: "userAddress",
      headerName: "Company Address",
      flex: 1,
      editable: true,
    },
    {
      field: "contactNumber",
      headerName: "Company Contact",
      flex: 1,
      editable: true,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      type: "actions",
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

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
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
			>
				<Header
					title="USERS MANAGEMENT"
					subtitle="Manage Users and Users Overview"
				/>
			</Box>

      <Box>
        <Link
          to="/super-admin-add-user"
          style={{
            textDecoration: "none",
            margin: "1rem 0",
            display: "flex",
          }}
        >
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{
              background: "#FFAC09",
              color: "black",
              fontWeight: "bold",
              marginLeft: "auto",
            }}
          >
            Add New Company
          </Button>
        </Link>
      </Box>

      <Box
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.yellowAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.yellowAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          checkboxSelection
          rows={superAdminUserData}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          apiRef={apiRef}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          onProcessRowUpdateError={(error) => {
            console.error("Failed to process row update:", error);
          }}
        />
      </Box>
    </Box>
  );
};

export default SuperAdminUserMng;
