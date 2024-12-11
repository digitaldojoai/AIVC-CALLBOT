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

const data = [
  {
    id: "investor",
    name: "Venture Capitalist",
    description:
      "You will receive a summary of the pitch along with feedback to support informed decision-making.",
  },
  {
    id: "startup",
    name: "Start-Up Founder",
    description:
      "You will receive feedback on your given pitch to help improve for the better.",
  },
  {
    id: "both",
    name: "Both",
    description:
      "You will receive and summary and feedback on your pitch for better decision making and improvement.",
  },
];

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
        maxWidth="md"
        fullWidth
        PaperProps={{
          style: {
            borderRadius: "12px",
            backgroundColor: "#ffffff",
            color: "#333333",
          },
        }}
      >
        <div className="grid grid-cols-4 relative">
          <div className="p-6 space-y-6 col-span-3 relative max-md:col-span-4">
            {/* <div className=" absolute top-0 right-0 left-0 bottom-0 min-h-full min-w-full bg-center"></div> */}
            <p
              className="absolute top-4 right-4 text-black select-none cursor-pointer text-lg"
              onClick={() => {
                setSessionId(undefined);
              }}
            >
              X
            </p>
            <div>
              <h2 className="font-semibold text-3xl max-md:text-2xl text-center text-black">
                Receive Pitch Feedback
              </h2>
              <p className="text-center text-base text-neutral-600">
                Select your role to get your feedback.
              </p>
            </div>
            <FormControl component="fieldset" className="w-full text-black">
              <h2 className="text-2xl max-md:text-lg mb-2 ">
                {" "}
                Select Your Role:
              </h2>

              <TextField
                select
                value={
                  isInvestor && isStartup
                    ? "both"
                    : isInvestor
                    ? "investor"
                    : "startup"
                }
                fullWidth
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "investor") {
                    setIsInvestor(true);
                    setIsStartup(false);
                  } else if (value === "startup") {
                    setIsInvestor(false);
                    setIsStartup(true);
                  } else {
                    setIsInvestor(true);
                    setIsStartup(true);
                  }
                }}
                size={screenSize < 768 ? "small" : "medium"}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#d4d4d4",
                      borderRadius: "0.75rem",
                    },
                    "&:hover fieldset": {
                      borderColor: "#00adee",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#666666",
                  },
                  "& .MuiInputBase-input": {
                    color: "#00adee",
                    fontWeight: "bold",
                    fontSize: screenSize < 768 ? "1rem" : "1.1rem",
                    display: "flex",
                    alignItems: "center",
                  },
                  borderRadius: "0.75rem",
                }}
              >
                {data.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
              <p className="px-4 mt-2 text-neutral-600 font-medium italic">
                *{" "}
                {isInvestor && isStartup
                  ? data[2].description
                  : isInvestor
                  ? data[0].description
                  : data[1].description}
              </p>
            </FormControl>
            <div className="">
              <h2 className="text-2xl max-md:text-lg text-black mb-2">
                Enter your Email Address
              </h2>
              <TextField
                className="mt-2"
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                size={screenSize < 768 ? "small" : "medium"}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#d4d4d4 ",
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
          <div className="relative col-span-1 max-md:hidden">
            <div className="bg-[url('/assets/bg-right-image.png')] top-0 right-0 left-0 bottom-0 bg-cover bg-center absolute"></div>
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
