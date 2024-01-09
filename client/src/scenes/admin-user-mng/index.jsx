import React from 'react';
import { useTheme } from '@mui/system';
import { tokens } from '../../theme';
import { Typography, Checkbox, FormControlLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const AdminUserMng = () => {
	const theme = useTheme();
  	const colors = tokens(theme.palette.mode);

	const headingStyle = {
	  fontSize: '20px',
	  fontWeight: 'bold',
	  margin: '10px 0 10px 50px',
	  color: '#FFAC09',
	  marginLeft: '20px',
	};

    const filterSectionStyle = {
        display: 'flex',
        marginLeft: '20px',
        alignItems: 'center', // Center align the checkboxes with the labels
    };

    const tableStyle = {
        marginLeft: '20px',
        marginTop: '20px',
        width: '80%',
    };

    const columnStyle = {
		
        maxWidth: '200px', // Adjust the maximum width as needed
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    };

	const editStyle = {
        marginRight: '10px',
		fontSize: '15px',
		color: '#FFAC09',
    };

	const removeStyle = {
        marginLeft: '10px',
		fontSize: '15px',
		color: '#FF610A',
    };

    return (
        <div>
			<Typography variant="h2" style={headingStyle}>
				User Management
			</Typography>

            <div style={filterSectionStyle}>
                <span style={{ marginRight: '10px' }}>Filter by:</span>
                <div style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
                    <FormControlLabel
                        label="User"
                        control={<Checkbox />}
                        labelPlacement="start"
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
                    <FormControlLabel
                        label="Devices"
                        control={<Checkbox />}
                        labelPlacement="start"
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
                    <FormControlLabel
                        label="Active"
                        control={<Checkbox />}
                        labelPlacement="start"
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <FormControlLabel
                        label="Inactive"
                        control={<Checkbox />}
                        labelPlacement="start"
                    />
                </div>
                <div style={{ marginLeft: '30px', color: '#FFAC09' }}>Save</div>
            </div>

			<div>
				<Button href="/admin-add-user" color="secondary" size="small" style={{ background: '#FFAC09', color: 'black', marginLeft: '950px', fontWeight: 'bold' }}>
					<AddIcon style={{ marginRight: '4px' }} /> Add User
				</Button>
			</div>

            <div style={tableStyle}>
                <TableContainer component={Paper}>
                    <Table style={{ background: `${colors.primary[400]}` }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>User ID</TableCell>
                                <TableCell>User Name</TableCell>
                                <TableCell>Devices</TableCell>
                                <TableCell>Active</TableCell>
                                <TableCell>Inactive</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell style={columnStyle}>01</TableCell>
                                <TableCell style={columnStyle}>User name</TableCell>
                                <TableCell style={columnStyle}>50</TableCell>
                                <TableCell style={columnStyle}>40</TableCell>
                                <TableCell style={columnStyle}>10</TableCell>
                                <TableCell style={columnStyle}>
                                    <a style={editStyle} href="#edit">Edit</a>
                                    <a style={removeStyle} href="#remove">Remove</a>
                                </TableCell>
                            </TableRow>
							<TableRow>
                                <TableCell style={columnStyle}>02</TableCell>
                                <TableCell style={columnStyle}>User name</TableCell>
                                <TableCell style={columnStyle}>50</TableCell>
                                <TableCell style={columnStyle}>40</TableCell>
                                <TableCell style={columnStyle}>10</TableCell>
                                <TableCell >
                                    <a style={editStyle} href="#edit">Edit</a>
                                    <a style={removeStyle} href="#remove">Remove</a>
                                </TableCell>
                            </TableRow>
							<TableRow>
                                <TableCell style={columnStyle}>03</TableCell>
                                <TableCell style={columnStyle}>User name</TableCell>
                                <TableCell style={columnStyle}>50</TableCell>
                                <TableCell style={columnStyle}>40</TableCell>
                                <TableCell style={columnStyle}>10</TableCell>
                                <TableCell style={columnStyle}>
                                    <a style={editStyle} href="#edit">Edit</a>
                                    <a style={removeStyle} href="#remove">Remove</a>
                                </TableCell>
                            </TableRow>
							<TableRow>
                                <TableCell style={columnStyle}>04</TableCell>
                                <TableCell style={columnStyle}>User name</TableCell>
                                <TableCell style={columnStyle}>50</TableCell>
                                <TableCell style={columnStyle}>40</TableCell>
                                <TableCell style={columnStyle}>10</TableCell>
                                <TableCell style={columnStyle}>
                                    <a style={editStyle} href="#edit">Edit</a>
                                    <a style={removeStyle} href="#remove">Remove</a>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};

export default AdminUserMng;
