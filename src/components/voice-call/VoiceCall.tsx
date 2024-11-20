/// <reference types="vite/client" />
import { ThemeProvider } from "@emotion/react";
import { Box, createTheme, CssBaseline } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Vapi from "@vapi-ai/web";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import ActiveCallDetail from "./ActiveCallDetail";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#00adee",
    },
  },
});
// Initialize Vapi with your Public Key
const vapi = new Vapi(import.meta.env.VITE_VAPI_PUBLIC_KEY);

const VoiceCall = forwardRef((props, ref) => {
  const [assistants, setAssistants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAssistant, setSelectedAssistant] = useState(
    "97bf207f-4aac-4fcf-8d06-4e1590ce4803"
  );
  const [connected, setConnected] = useState(false);
  const [callEnabled, setCallEnabled] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [assistantIsSpeaking, setAssistantIsSpeaking] = useState(false);

  // Expose the handleClick method to parent components
  useImperativeHandle(ref, () => ({
    handleClick: handleCallClick,
  }));

  const getAssistants = async () => {
    setLoading(true);
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_VAPI_TOKEN}`,
      },
    };

    fetch("https://api.vapi.ai/assistant", options)
      .then((response) => response.json())
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getAssistants();
  }, []);

  const handleAssistantSelect = (event, value) => {
    setSelectedAssistant(value);
    setCallEnabled(!!value);
  };

  const handleCallClick = () => {
    console.log("selectedAssistant", selectedAssistant);
    if (selectedAssistant) {
      setConnected(true);
      try {
        vapi.start(selectedAssistant);
      } catch (error) {
        console.error("Error starting call with Vapi:", error);
      }
    }
  };

  const handleEndCall = () => {
    setConnected(false);
    vapi.stop();
  };

  useEffect(() => {
    vapi.on("speech-start", () => setAssistantIsSpeaking(true));
    vapi.on("speech-end", () => setAssistantIsSpeaking(false));
    vapi.on("volume-level", (level) => setVolumeLevel(level));
    vapi.on("error", (error) => console.error("Vapi emitted an error:", error));

    return () => {
      vapi.stop();
    };
  }, []);

  console.log("connected ", connected);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <img
          src="https://hollo.ai/assets/images/home/Hollo_Logo-10-Color.png"
          alt="Company Logo"
          style={{ height: "150px", marginBottom: "30px" }}
        />
        <h1 style={{ fontSize: "24px", color: "white", textAlign: "center" }}>
          {connected ? `Calling AI VC` : "start a call"}
        </h1>

        {!connected ? (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCallClick}
              fullWidth
              sx={{ width: 400, marginTop: "20px" }}
            >
              Call
            </Button>
          </>
        ) : (
          <ActiveCallDetail
            onEndCallClick={handleEndCall}
            volumeLevel={volumeLevel}
            // assistantIsSpeaking={assistantIsSpeaking}
          />
        )}
      </Box>
    </ThemeProvider>
  );
});

export default VoiceCall;
