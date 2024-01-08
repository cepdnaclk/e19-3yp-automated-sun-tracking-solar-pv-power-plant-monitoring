import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import { Box, useTheme } from '@mui/material';
import { tokens } from '../../theme';
import StatBoxVal from '../../components/StatBoxVal';

import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import AppSettingsAltOutlinedIcon from '@mui/icons-material/AppSettingsAltOutlined';

const SuperAdminDashboard = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	return (
		<Box m="20px">
			{/* Header */}
			<Box
				display="flex"
				justifyContent="space-between"
				alignItems="center"
			>
				<Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
			</Box>

			{/* Grid */}
			<Box
				display="grid"
				gridTemplateColumns="repeat(12, 1fr)"
				gridAutoRows="160px"
				gap="20px"
			>
				{/* Row 1 */}
				<Box
					gridColumn="span 3"
					backgroundColor={colors.primary[400]}
					display="flex"
					alignItems="center"
					justifyContent="center"
				>
					<Link to="//super-admin-user-management" style={{ textDecoration: 'none' }}>
						<StatBoxVal
							title="User Management"
							icon={
								<ManageAccountsOutlinedIcon
									sx={{
										color: colors.yellowAccent[600],
										fontSize: '26px',
									}}
								/>
							}
						/>
					</Link>
				</Box>
				<Box
					gridColumn="span 3"
					backgroundColor={colors.primary[400]}
					display="flex"
					alignItems="center"
					justifyContent="center"
				>
					<Link to="/super-admin-device-management" style={{ textDecoration: 'none' }}>
						<StatBoxVal
							title="Device Management"
							icon={
								<AppSettingsAltOutlinedIcon
									sx={{
										color: colors.yellowAccent[600],
										fontSize: '26px',
									}}
								/>
							}
						/>
					</Link>
				</Box>
			</Box>
		</Box>
	);
};

export default SuperAdminDashboard;
