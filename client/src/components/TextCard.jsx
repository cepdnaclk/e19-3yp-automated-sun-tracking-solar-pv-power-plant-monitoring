import React from 'react';
import { Box, useTheme, Typography } from '@mui/material';
import { tokens } from '../theme';

const TextCard = ({ title, details }) => {
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
						variant="h4"
						fontWeight="bold"
						sx={{ color: colors.yellowAccent[500] }}
					>
						{details}
					</Typography>
				</Box>
			</Box>
		</Box>
	);
};

export default TextCard;
