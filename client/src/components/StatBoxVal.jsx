import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import ProgressCircle from './ProgressCircle';
import { tokens } from '../theme';

const StatBox = ({ title, icon, value }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	return (
		<Box width="100%" m="0 30px">
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
			>
				<Box>
					{icon}
					<Typography
						variant="h4"
						fontWeight="bold"
						sx={{ color: colors.grey[100] }}
					>
						{title}
					</Typography>
				</Box>
				<Box>
					<Typography
						variant="h3"
						fontWeight="bold"
						sx={{ color: colors.yellowAccent[500] }}
					>
						{value}
					</Typography>
				</Box>
			</Box>
		</Box>
	);
};

export default StatBox;
