import React from 'react';
import Header from '../../components/Header';
import { Box, useTheme } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { tokens } from '../../theme';

const UserFaq = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const contentStyle = {
		width: `98%`,
		
	  };

	return (
		<Box m="15px 20px" width="90%">
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
			>
				<Header title="FAQ" subtitle="Frequently Asked Questions" />
			</Box>
			<Accordion defaultExpanded>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}>
					<Typography color={colors.yellowAccent[500]} variant="h5">
					What is the specialty of the solution?
					</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography style={contentStyle}>
					This solution has a dual-axis rotation system for the solar panel to be rotated such that 
					it is always facing the sun's direction. It has a web application that shows real-time 
					energy generation data and past energy generation information.
					</Typography>
				</AccordionDetails>
			</Accordion>
			<Accordion defaultExpanded>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}>
					<Typography color={colors.yellowAccent[500]} variant="h5">
					How do I add a device to the app?
					</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography style={contentStyle}>
					Click Add Device on the device management section, Add the device ID given to you by the vendor, 
					add other necessary details, and submit. If not successful, contact the vendor.
					</Typography>
				</AccordionDetails>
			</Accordion>
			<Accordion defaultExpanded>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}>
					<Typography color={colors.yellowAccent[500]} variant="h5">
					Is there anything that I should provide for the system to work?
					</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography style={contentStyle}>
					Yes, an active internet connection should be provided using Wi-Fi
					</Typography>
				</AccordionDetails>
			</Accordion>
			<Accordion defaultExpanded>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}>
					<Typography color={colors.yellowAccent[500]} variant="h5">
					Can I add multiple devices to the app?
					</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography style={contentStyle}>
					Yes you can add multiple devices to the app as long as the devices 
					are purchased using the same email address as your app profile. 
					</Typography>
				</AccordionDetails>
			</Accordion>
		</Box>
	);
};

export default UserFaq;
