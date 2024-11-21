import React from "react";
import VolumeLevel from "./call/VolumeLevel";
import { Box, Button } from "@mui/material";

const ActiveCallDetail = ({
  volumeLevel,
  onEndCallClick,
  connected,
}: {
  volumeLevel: number;
  connected: boolean;
  onEndCallClick: () => void;
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "150px",
      }}
    >
      <VolumeLevel volume={volumeLevel} />
    </Box>
  );
};

export default ActiveCallDetail;
