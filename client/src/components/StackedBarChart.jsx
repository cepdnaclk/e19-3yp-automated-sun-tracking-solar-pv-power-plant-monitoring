import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { useTheme } from '@emotion/react';
import { tokens } from '../theme';

export default function StackedBarChart({ xLabels, data }) {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);
	const barColors = [colors.yellowAccent[500], colors.orangeAccent[500]];

	return (
		<>
			<BarChart
				width={500}
				height={300}
				series={[{ data, id: 'dataId', stack: 'total' }]}
				xAxis={[{ data: xLabels, scaleType: 'band' }]}
				yAxis={[{ id: 'energy', label: 'Energy (kW)' }]} // Set the yAxis prop to include the label and unit
				colors={barColors} // Set the colors prop to the colors array
			/>
		</>
	);
}
