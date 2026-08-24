import React, { createContext, useContext, useState } from 'react';
import { defaultAnalysisResult, mockRecentAnalyses, mockChatInitialHistory } from '../data/mockData';

const AnalysisContext = createContext(null);

export function AnalysisProvider({ children }) {
  const [currentAnalysis, setCurrentAnalysis] = useState(defaultAnalysisResult);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [problemDescription, setProblemDescription] = useState(
    "My laptop turns on and the fan spins, but the screen stays black. An external monitor worked previously."
  );
  const [locationMode, setLocationMode] = useState('current'); // 'current' | 'manual'
  const [manualLocation, setManualLocation] = useState('San Francisco, CA');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0); // 0 to 5
  const [hasCompletedAnalysis, setHasCompletedAnalysis] = useState(true);
  const [showErrorState, setShowErrorState] = useState(false);

  // Chat conversation state for Troubleshooting
  const [chatMessages, setChatMessages] = useState(mockChatInitialHistory);
  const [isTyping, setIsTyping] = useState(false);

  // Notifications drawer/modal state
  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      title: 'Analysis Complete',
      message: 'Dell Latitude 5420 has been evaluated. Recommended action: REPAIR.',
      time: '10 mins ago',
      read: false,
      type: 'success',
    },
    {
      id: 'notif-2',
      title: 'Nearby Repair Center Promo',
      message: 'ABC Electronics Repair offers 15% discount for student repairs.',
      time: '1 hour ago',
      read: false,
      type: 'info',
    },
    {
      id: 'notif-3',
      title: 'E-Waste Milestone',
      message: 'You have prevented 1.8 Tons of electronic scrap emissions this semester!',
      time: 'Yesterday',
      read: true,
      type: 'milestone',
    },
  ]);

  // Trigger simulated multi-step AI pipeline progress
  const runSimulatedAnalysis = (customImage = null, customProblem = "") => {
    setIsAnalyzing(true);
    setShowErrorState(false);
    setAnalysisStep(1); // 01 Device Detection
    setHasCompletedAnalysis(false);

    // Step 1: Device Detection (0ms - 800ms)
    setTimeout(() => {
      setAnalysisStep(2); // 02 Condition Analysis
    }, 850);

    // Step 2: Condition Analysis (850ms - 1700ms)
    setTimeout(() => {
      setAnalysisStep(3); // 03 Troubleshooting
    }, 1700);

    // Step 3: Troubleshooting (1700ms - 2500ms)
    setTimeout(() => {
      setAnalysisStep(4); // 04 Sustainability Evaluation
    }, 2500);

    // Step 4: Sustainability Evaluation (2500ms - 3300ms)
    setTimeout(() => {
      setAnalysisStep(5); // 05 Recommendation
    }, 3300);

    // Step 5: Final Result Ready (3300ms - 4000ms)
    setTimeout(() => {
      setIsAnalyzing(false);
      setHasCompletedAnalysis(true);
      if (customImage) {
        setUploadedImage(customImage);
      }
      if (customProblem) {
        setProblemDescription(customProblem);
      }
    }, 4000);
  };

  const resetAnalysisFlow = () => {
    setUploadedImage(null);
    setProblemDescription("");
    setIsAnalyzing(false);
    setAnalysisStep(0);
    setHasCompletedAnalysis(false);
    setShowErrorState(false);
  };

  const loadSampleDevice = () => {
    setCurrentAnalysis(defaultAnalysisResult);
    setProblemDescription("My laptop turns on and the fan spins, but the screen stays black. An external monitor worked previously.");
    setHasCompletedAnalysis(true);
    setIsAnalyzing(false);
    setAnalysisStep(5);
  };

  // Troubleshooting send message handler
  const sendChatMessage = (userText) => {
    if (!userText.trim()) return;

    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages((prev) => [...prev, newMsg]);
    setIsTyping(true);

    // Simulate smart UI response based on topic
    setTimeout(() => {
      let replyText = "Based on our hardware diagnosis, this symptom indicates a signal handshake failure. Try testing with an alternative cable connector or inspecting the pin alignment.";
      let replySources = [
        {
          id: `src-${Date.now()}`,
          title: "Hardware Bus & Subsystem Maintenance Guide (Rev 2.1)",
          category: "Diagnostic Guide",
          badge: "Technical Note",
        }
      ];

      const lower = userText.toLowerCase();
      if (lower.includes("battery") || lower.includes("charge") || lower.includes("power")) {
        replyText = "For power and battery issues: Check if the charging LED illuminates when plugged in. You can perform an RTC reset by holding the power button for 35 seconds while disconnected from AC power.";
        replySources = [
          {
            id: `src-${Date.now()}`,
            title: "Lithium Power Management and RTC Reset Protocol (Dell)",
            category: "Power Subsystem",
            badge: "Service Manual",
          }
        ];
      } else if (lower.includes("screen") || lower.includes("display") || lower.includes("black")) {
        replyText = "Since the backlight seems unlit, verify if shining a flashlight closely against the LCD shows a faint desktop image. If yes, the inverter/LED driver fuse is blown. If completely dark, the 30-pin flex connector is unseated.";
        replySources = [
          {
            id: `src-${Date.now()}`,
            title: "LCD Panel Backlight & Inverter Troubleshooting Protocol",
            category: "Display Service",
            badge: "Manufacturer Guide",
          }
        ];
      } else if (lower.includes("cost") || lower.includes("repair") || lower.includes("fix")) {
        replyText = "Replacement 30-pin eDP display cables typically range between $15 - $25, and labor at certified repair shops averages $30. Total estimated repair cost is under $60, saving ~90% compared to purchasing a replacement laptop.";
      }

      setChatMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now() + 1}`,
          sender: 'assistant',
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          sources: replySources,
        },
      ]);
      setIsTyping(false);
    }, 1200);
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <AnalysisContext.Provider
      value={{
        currentAnalysis,
        setCurrentAnalysis,
        uploadedImage,
        setUploadedImage,
        problemDescription,
        setProblemDescription,
        locationMode,
        setLocationMode,
        manualLocation,
        setManualLocation,
        isAnalyzing,
        analysisStep,
        hasCompletedAnalysis,
        setHasCompletedAnalysis,
        runSimulatedAnalysis,
        resetAnalysisFlow,
        loadSampleDevice,
        showErrorState,
        setShowErrorState,
        chatMessages,
        isTyping,
        sendChatMessage,
        notifications,
        markAllNotificationsAsRead,
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
}

export function useAnalysis() {
  const context = useContext(AnalysisContext);
  if (!context) {
    throw new Error('useAnalysis must be used within an AnalysisProvider');
  }
  return context;
}
