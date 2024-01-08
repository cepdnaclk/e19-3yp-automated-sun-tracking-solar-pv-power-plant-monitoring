import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Box, Button, IconButton, Typography, useTheme } from '@mui/material';
import { tokens } from '../theme';
import StackedBarChart from './StackedBarChart';
import { weeklyData, monthlyData, yearlyData } from '../data/barChartData'; // Import the bar chart data file

// const weeklyData = {
// 	xLabels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
// 	data: [10, 20, 15, 25],
// };

// // Data for monthly bar chart
// const monthlyData = {
// 	xLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
// 	data: [100, 150, 120, 180, 200, 160],
// };

// // Data for yearly bar chart
// const yearlyData = {
// 	xLabels: ['2018', '2019', '2020', '2021'],
// 	data: [500, 600, 700, 800],
// };

const ToggleCharts = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const [alignment, setAlignment] = React.useState('Week');

	const handleChange = (event, newAlignment) => {
		setAlignment(newAlignment);
	};

	return (
		<Box width="100%" height="100%">
			<Box display="flex" justifyContent="center">
				<ToggleButtonGroup
					color="secondary"
					value={alignment}
					exclusive
					onChange={handleChange}
					aria-label="Platform"
				>
					<ToggleButton value="Week">
						<Typography
							variant="body1"
							sx={{ color: colors.grey[100] }}
						>
							Week
						</Typography>
					</ToggleButton>
					<ToggleButton value="Month">
						<Typography
							variant="body1"
							sx={{ color: colors.grey[100] }}
						>
							Month
						</Typography>
					</ToggleButton>
					<ToggleButton value="Year">
						<Typography
							variant="body1"
							sx={{ color: colors.grey[100] }}
						>
							Year
						</Typography>
					</ToggleButton>
				</ToggleButtonGroup>
			</Box>

			<Box
				dispaly="flex"
				justifyContent="center"
				alignItems="center"
				m="10px 10px 10px"
				pl="20px"
			>
				{alignment === 'Week' && (
					<StackedBarChart
						data={weeklyData.data}
						xLabels={weeklyData.xLabels}
					/>
				)}
				{alignment === 'Month' && (
					<StackedBarChart
						data={monthlyData.data}
						xLabels={monthlyData.xLabels}
					/>
				)}
				{alignment === 'Year' && (
					<StackedBarChart
						data={yearlyData.data}
						xLabels={yearlyData.xLabels}
					/>
				)}
			</Box>
		</Box>
	);
};

export default ToggleCharts;
