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
  useCallback,
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

  // Create cleanup function
  const cleanup = useCallback(() => {
    vapi.stop();
    vapi.removeAllListeners(); // Remove all event listeners
    setConnected(false);
    setVolumeLevel(0);
    setAssistantIsSpeaking(false);
  }, []);

  // Handle call end
  const handleEndCall = useCallback(() => {
    cleanup();
  }, [cleanup]);

  // Setup event listeners
  useEffect(() => {
    const setupListeners = () => {
      vapi.on("speech-start", () => setAssistantIsSpeaking(true));
      vapi.on("speech-end", () => setAssistantIsSpeaking(false));
      vapi.on("volume-level", (level) => setVolumeLevel(level));
      vapi.on("error", (error) => {
        console.error("Vapi emitted an error:", error);
        cleanup(); // Cleanup on error
      });
    };

    setupListeners();

    // Cleanup when component unmounts
    return () => {
      cleanup();
    };
  }, [cleanup]);

  // Handle call start
  const handleCallClick = async () => {
    if (selectedAssistant) {
      try {
        setConnected(true);
        const response = await vapi.start(selectedAssistant);
        setSessionId(response?.id);
      } catch (error) {
        console.error("Error starting call with Vapi:", error);
        cleanup(); // Cleanup on error
        toast.error("Failed to start call. Please try again.");
      }
    }
  };

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
        open={!connected && sessionId ? true : false}
        onClose={() => setSessionId(undefined)}
        PaperProps={{
          style: {
            borderRadius: "12px",
            backgroundColor: "#ffffff",
            color: "#333333",
          },
        }}
      >
        <div className="p-6 space-y-6 ">
          <div>
            <h2 className="font-semibold text-3xl max-md:text-2xl text-center ">
              Receive Pitch Feedback
            </h2>
            <p className="text-center text-sm">
              Select your role to get your feedback.
            </p>
          </div>
          <FormControl component="fieldset" className="w-full">
            <h2 className="text-2xl max-md:text-xl"> You Are A:</h2>

            <div
              className="flex items-start gap-4 border border-black rounded-xl p-4 select-none cursor-pointer mb-4"
              onClick={() => {
                console.log("startup");
                setIsInvestor(!isInvestor);
              }}
            >
              <Radio
                sx={{
                  "&.Mui-checked": {
                    color: "#00adee",
                  },
                  color: "#666666",
                }}
                checked={isInvestor}
              />
              <div>
                <p className="text-[#00adee] font-bold text-2xl max-md:text-lg">
                  Venture Capitalist
                </p>
                <p className="text-sm max-md:text-xs">
                  You will receive a summary of the pitch you just receive with
                  feedback helping decisions-making.
                </p>
              </div>
            </div>
            <div
              className="flex items-start gap-4 border border-black rounded-xl p-4  select-none cursor-pointer"
              onClick={() => {
                console.log("investor");
                setIsStartup(!isStartup);
              }}
            >
              <Radio
                sx={{
                  "&.Mui-checked": {
                    color: "#00adee",
                  },
                  color: "#666666",
                }}
                checked={isStartup}
              />
              <div>
                <p className="text-[#00adee] font-bold text-2xl max-md:text-lg">
                  Start-Up Founder
                </p>
                <p className="text-sm max-md:text-xs">
                  You will receive feedback on your given pitch to help improve
                  for the better.
                </p>
              </div>
            </div>
          </FormControl>
          <div className="space-y-4">
            <h2 className="text-2xl max-md:text-xl">
              Enter Your Email Address
            </h2>
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
                    borderRadius: "0.75rem",
                  },
                  "&:hover fieldset": {
                    borderColor: "#00adee",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#666666",
                },
                borderRadius: "0.75rem",
              }}
            />
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
                fontWeight: "bold",
                fontSize: "1.1rem",
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
