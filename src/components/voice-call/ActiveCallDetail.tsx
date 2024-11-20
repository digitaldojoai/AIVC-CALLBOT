import React from "react";
import VolumeLevel from "./call/VolumeLevel";
import { Box, Button } from "@mui/material";

const ActiveCallDetail = ({
  volumeLevel,
  onEndCallClick,
}: {
  volumeLevel: number;
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
      <Box sx={{ textAlign: "center", width: "100%" }}>
        {/* Default MUI button with 'error' color for Hang Up */}
        <Button
          variant="contained"
          color="error" // Use MUI's error color for danger (red)
          onClick={onEndCallClick}
          fullWidth
        >
          Hang Up
        </Button>
      </Box>
    </Box>
  );
};

export default ActiveCallDetail;
