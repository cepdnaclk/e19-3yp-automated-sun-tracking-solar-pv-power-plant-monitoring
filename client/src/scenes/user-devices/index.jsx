import { Box, useTheme } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import DeviceCard from "../../components/DeviceCard";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const UserDevices = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [devices, setDevices] = React.useState([]);

  useEffect(() => {
    console.log("hello");
    axios
      .get("/devices/mydevices")
      .then((res) => {
        setDevices(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Box m="20px" width="100%">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="MY DEVICES" subtitle="Device Overview" />
      </Box>

      <Box
        display="grid"
        gridTemplateColumns="repeat(3, 1fr)"
        gridAutoRows="300px"
        gap="10px"
        overflow="auto"
        m=" 10px 10px 10px 0px"
        width="95%"
      >
        {devices.map((device) => (
          <DeviceCard
            key={device.id}
            deviceId={device.deviceNameByCustomer}
            status={device.modelName}
          />
        ))}
      </Box>
    </Box>
  );
};

export default UserDevices;
