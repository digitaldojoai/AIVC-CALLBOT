/// <reference types="vite/client" />
import { ThemeProvider } from "@emotion/react";
import {
  Box,
  Checkbox,
  createTheme,
  CssBaseline,
  Dialog,
  MenuItem,
  Select,
} from "@mui/material";
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
  const [sessionId, setSessionId] = useState<string | undefined>();

  // Expose the handleClick method to parent components
  useImperativeHandle(ref, () => ({
    handleClick: handleCallClick,
  }));

  const handleAssistantSelect = (event, value) => {
    setSelectedAssistant(value);
    setCallEnabled(!!value);
  };

  const handleCallClick = () => {
    console.log("selectedAssistant", selectedAssistant);
    if (selectedAssistant) {
      setConnected(true);
      try {
        vapi.start(selectedAssistant).then((e) => {
          setSessionId(e?.id);
        });
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
    // vapi
    return () => {
      vapi.stop();
    };
  }, []);

  console.log("connected ", connected);
  const screenSize = window.innerWidth;

  return (
    <>
      <Dialog
        open={!connected && sessionId ? true : false}
        onClose={() => setSessionId(undefined)}
      >
        <div className="p-4 space-y-4">
          <p className="font-semibold text-2xl max-md:text-lg">
            Receive Feedback for the Pitch
          </p>
          <div className="space-y-2">
            <p className="max-sm:text-sm">Email</p>
            <TextField
              title="Email"
              placeholder="Email"
              size={screenSize < 768 ? "small" : "medium"}
              fullWidth
            />
          </div>
          <div>
            <div className="flex items-center">
              <Checkbox size={screenSize < 768 ? "small" : "medium"} />
              <p className="relative top-[1px]">I am a VC</p>
            </div>
            <div className="flex items-center">
              <Checkbox size={screenSize < 768 ? "small" : "medium"} />
              <p className="relative top-[1px]">I am a Startup</p>
            </div>
          </div>
          <div className="flex justify-end">
            {" "}
            <Button variant="contained" color="primary">
              Submit
            </Button>
          </div>
        </div>
      </Dialog>
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
          <div className="mt-4">
            <ActiveCallDetail
              onEndCallClick={handleEndCall}
              volumeLevel={volumeLevel}
              connected={connected}
              // assistantIsSpeaking={assistantIsSpeaking}
            />
          </div>
          <div className={`w-[400px] max-md:w-full mt-8 md:mt-20`}>
            <Button
              variant="contained"
              color={connected ? "error" : "primary"}
              onClick={() => {
                if (connected) {
                  handleEndCall();
                } else {
                  handleCallClick();
                }
              }}
              fullWidth
              size="large"
            >
              {connected ? "Hang Up" : "Call Now"}
            </Button>
          </div>
        </Box>
      </ThemeProvider>
    </>
  );
});

export default VoiceCall;
