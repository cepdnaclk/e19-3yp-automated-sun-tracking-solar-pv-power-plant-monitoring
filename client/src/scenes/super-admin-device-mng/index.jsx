import React from 'react';
import { useTheme } from '@mui/system';
import { tokens } from '../../theme';
import { FormControl, FormControlLabel, Checkbox, Typography, Container, Card, CardContent,} from '@mui/material';

const SuperAdminDeviceMng = () => {
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
	  alignItems: 'center',
	};
  
	const cardContainerStyle = {
	  display: 'flex',
	  flexDirection: 'row',
	  flexWrap: 'wrap',
	  marginTop: '20px',
	  marginLeft: '20px',
	};
  
	const cardStyle = {
	  background: `${colors.primary[400]}`,
	  width: '500px',
	  maxHeight: '500px',
	  marginRight: '10px',
	  marginBottom: '20px',
	};
  
	const cardContentStyle = {
	  display: 'flex',
	  flexDirection: 'column',
	  justifyContent: 'space-between',
	  height: '90%',
	  margin: '15px 0',
	};
  
	const deviceListStyle = {
	  marginTop: '10px',
	  flexDirection: 'column', // Change this line
	};
  
	return (
	  <div>
		<Typography variant="h2" style={headingStyle}>
			Device Management
		</Typography>

		<div style={filterSectionStyle}>
		  <span style={{ marginRight: '10px' }}>Filter by:</span>
		  <div style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
			<FormControlLabel label="Company" control={<Checkbox />} labelPlacement="start" />
		  </div>
		  <div style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
			<FormControlLabel label="Devices" control={<Checkbox />} labelPlacement="start" />
		  </div>
		  <div style={{ marginLeft: '30px', color: '#FFAC09' }}>Save</div>
		</div>
  
		<div style={cardContainerStyle}>
		  <Card style={cardStyle}>
			<CardContent style={cardContentStyle}>
			  <Typography variant="h4" component="div">
				Company 1
			  </Typography>
			  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<div>
				  <Typography variant="h5" component="div">
				  	Registered Devices:
				  </Typography>
				  <div style={deviceListStyle}>
					<span>Device name</span>
					<span>Device name</span>
				  </div>
				</div>
				<div>
				  <Typography variant="h5" component="div">
					Unregistered Devices:
				  </Typography>
				  <div style={deviceListStyle}>
					<span>Device name</span>
					<span>Device name</span>
				  </div>
				</div>
			  </div>
			</CardContent>
		  </Card>
  
		  <Card style={cardStyle}>
			<CardContent style={cardContentStyle}>
			  <Typography variant="h4" component="div">
				Company 2
			  </Typography>
			  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<div>
				  <Typography variant="h5" component="div">
					Registered Devices:
				  </Typography>
				  <div style={deviceListStyle}>
					<span>Device name</span>
					<span>Device name</span>
				  </div>
				</div>
				<div>
				  <Typography variant="h5" component="div">
					Unregistered Devices:
				  </Typography>
				  <div style={deviceListStyle}>
					<span>Device name</span>
					<span>Device name</span>
				  </div>
				</div>
			  </div>
			</CardContent>
		  </Card>

		  <Card style={cardStyle}>
			<CardContent style={cardContentStyle}>
			  <Typography variant="h4" component="div">
				Company 2
			  </Typography>
			  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<div>
				  <Typography variant="h5" component="div">
					Registered Devices:
				  </Typography>
				  <div style={deviceListStyle}>
					<span>Device name</span>
					<span>Device name</span>
				  </div>
				</div>
				<div>
				  <Typography variant="h5" component="div">
					Unregistered Devices:
				  </Typography>
				  <div style={deviceListStyle}>
					<span>Device name</span>
					<span>Device name</span>
				  </div>
				</div>
			  </div>
			</CardContent>
		  </Card>

		  <Card style={cardStyle}>
			<CardContent style={cardContentStyle}>
			  <Typography variant="h4" component="div">
				Company 2
			  </Typography>
			  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<div>
				  <Typography variant="h5" component="div">
					Registered Devices:
				  </Typography>
				  <div style={deviceListStyle}>
					<span>Device name</span>
					<span>Device name</span>
				  </div>
				</div>
				<div>
				  <Typography variant="h5" component="div">
					Unregistered Devices:
				  </Typography>
				  <div style={deviceListStyle}>
					<span>Device name</span>
					<span>Device name</span>
				  </div>
				</div>
			  </div>
			</CardContent>
		  </Card>
  
		  <Card style={cardStyle}>
			<CardContent style={cardContentStyle}>
			  <Typography variant="h4" component="div">
				Company 3
			  </Typography>
			  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<div>
				  <Typography variant="h5" component="div">
				  	Registered Devices:
				  </Typography>
				  <div style={deviceListStyle}>
					<span>Device name</span>
					<span>Device name</span>
				  </div>
				</div>
				<div>
				  <Typography variant="h5" component="div">
					Unregistered Devices:
				  </Typography>
				  <div style={deviceListStyle}>
					<span>Device name</span>
					<span>Device name</span>
				  </div>
				</div>
			  </div>
			</CardContent>
		  </Card>
  
		  <Card style={cardStyle}>
			<CardContent style={cardContentStyle}>
			  <Typography variant="h4" component="div">
				Company 4
			  </Typography>
			  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<div>
				  <Typography variant="h5" component="div">
				  	Registered Devices:
				  </Typography>
				  <div style={deviceListStyle}>
					<span>Device name</span>
					<span>Device name</span>
				  </div>
				</div>
				<div>
				  <Typography variant="h5" component="div">
					Unregistered Devices:
				  </Typography>
				  <div style={deviceListStyle}>
					<span>Device name</span>
					<span>Device name</span>
				  </div>
				</div>
			  </div>
			</CardContent>
		  </Card>
		</div>
	  </div>
	);
  };

export default SuperAdminDeviceMng;
