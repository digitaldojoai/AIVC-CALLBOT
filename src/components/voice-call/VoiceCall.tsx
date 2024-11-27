/// <reference types="vite/client" />
import { ThemeProvider } from "@emotion/react";
import {
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
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
import { toast } from "sonner";
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
  const [isInvestor, setIsInvestor] = useState(false);
  const [isStartup, setIsStartup] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    return () => {
      vapi.stop();
    };
  }, []);

  const screenSize = window.innerWidth;

  const handleSubmit = async () => {
    if (!email || (!isInvestor && !isStartup)) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://api.hollo.ai/v1/callbot/analyze-call",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            callId: sessionId,
            email: email,
            isInvestorFeedback: isInvestor,
            isStartupFeedback: isStartup,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.errors || "Failed to analyze call");
      }

      toast.success("Feedback email sent successfully");
      setSessionId(undefined);
    } catch (error) {
      console.error("Error analyzing call:", error);
      toast.error(error.message || "Failed to analyze call. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Dialog
        open={!connected && sessionId ? true : true}
        onClose={() => setSessionId(undefined)}
        PaperProps={{
          style: {
            borderRadius: "12px",
            backgroundColor: "#ffffff",
            color: "#333333",
          },
        }}
      >
        <div className="p-6 space-y-6 min-w-[350px]">
          <h2 className="font-semibold text-2xl max-md:text-xl text-center text-[#00adee]">
            Receive Pitch Feedback
          </h2>

          <div className="space-y-4">
            <TextField
              label="Email Address"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              size={screenSize < 768 ? "small" : "medium"}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#e0e0e0",
                  },
                  "&:hover fieldset": {
                    borderColor: "#00adee",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#666666",
                },
              }}
            />

            <FormControl component="fieldset" className="w-full">
              <FormLabel component="legend" sx={{ color: "#666666" }}>
                I am a:
              </FormLabel>

              <FormControlLabel
                control={
                  <Radio
                    sx={{
                      "&.Mui-checked": {
                        color: "#00adee",
                      },
                      color: "#666666",
                    }}
                  />
                }
                label="Venture Capitalist"
                checked={isInvestor}
                onClick={() => setIsInvestor(!isInvestor)}
              />
              <FormControlLabel
                control={
                  <Radio
                    sx={{
                      "&.Mui-checked": {
                        color: "#00adee",
                      },
                      color: "#666666",
                    }}
                  />
                }
                label="Startup Founder"
                checked={isStartup}
                onClick={() => setIsStartup(!isStartup)}
              />
            </FormControl>
          </div>

          <div className="flex justify-end pt-4">
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={isSubmitting}
              sx={{
                backgroundColor: "#00adee",
                "&:hover": {
                  backgroundColor: "#0095cc",
                },
                textTransform: "none",
                borderRadius: "8px",
                padding: "8px 24px",
              }}
            >
              {isSubmitting ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Submit"
              )}
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
              sx={{
                borderRadius: "8px",
                padding: "12px",
                fontSize: "1.1rem",
                textTransform: "none",
              }}
            >
              {connected ? "End Call" : "Start Call"}
            </Button>
          </div>
        </Box>
      </ThemeProvider>
    </>
  );
});

export default VoiceCall;
