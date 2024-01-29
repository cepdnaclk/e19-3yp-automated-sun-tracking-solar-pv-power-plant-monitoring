import React from 'react';
import Header from '../../components/Header';
import { Box, useTheme } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { tokens } from '../../theme';

const AdminFaq = () => {
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
						This solution has a dual-axis rotation system for the solar panel to be 
						rotated such that it is always facing the sun's direction. It has a web application 
						that shows real-time energy generation data and past energy generation information.

					</Typography>
				</AccordionDetails>
			</Accordion>
			<Accordion defaultExpanded>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}>
					<Typography color={colors.yellowAccent[500]} variant="h5">
						How can I order new devices?
					</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography style={contentStyle}>
						You must contact the HelioEye team and place your order. 
						You will receive the ordered devices quickly 
						and your ordered devices will be added to your profile by HelioEye.

					</Typography>
				</AccordionDetails>
			</Accordion>
			<Accordion defaultExpanded>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}>
					<Typography color={colors.yellowAccent[500]} variant="h5">
						What should I do when I am selling a device to a customer?
					</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography style={contentStyle}>
						Get their email address and enter it into the system. 
						And instruct them to use the same email address when they are registering to the app. 
						If they already have an account, they can use the same email address. However, 
						the device data will be shown only to the profile created using the given email address.
					</Typography>
				</AccordionDetails>
			</Accordion>
			{/* <Accordion defaultExpanded>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}>
					<Typography color={colors.yellowAccent[500]} variant="h5">
						Some Random Question
					</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography style={contentStyle}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit.
						Suspendisse malesuada lacus ex, sit amet blandit leo
						lobortis eget.
					</Typography>
				</AccordionDetails>
			</Accordion> */}
		</Box>
	);
};

export default AdminFaq;
