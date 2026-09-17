import React, { createContext, useContext, useState } from 'react';
import { defaultAnalysisResult, mockSampleDevices } from '../data/mockData';

const AnalysisContext = createContext(null);

export function AnalysisProvider({ children }) {
  const [currentAnalysis, setCurrentAnalysis] = useState(defaultAnalysisResult);
  const [selectedDeviceKey, setSelectedDeviceKey] = useState('dell');
  const [activeComponentId, setActiveComponentId] = useState('comp-display');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [problemDescription, setProblemDescription] = useState(
    mockSampleDevices.dell.defaultProblem
  );
  const [locationMode, setLocationMode] = useState('current'); // 'current' | 'manual'
  const [manualLocation, setManualLocation] = useState('San Francisco, CA');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0); // 0 to 5
  const [hasCompletedAnalysis, setHasCompletedAnalysis] = useState(true);
  const [showErrorState, setShowErrorState] = useState(false);

  // Chat conversation state for Troubleshooting / Repair Copilot
  const [chatMessages, setChatMessages] = useState([
    {
      id: 'msg-init-1',
      sender: 'assistant',
      text: "Repair Copilot initialized for Dell Latitude 5420. System diagnostics indicate an open circuit on the eDP backlight power rail (Fuse F1). I'm ready to walk you through safety isolation, multimeter testing, and component replacement.",
      timestamp: '10:24 AM',
      sources: [
        {
          id: 'src-1',
          title: 'Dell Latitude 5420 Enterprise Schematic (Rev A03 - Page 34: Backlight Rail)',
          category: 'OEM Circuit Schematic',
          badge: 'Service Manual',
        },
        {
          id: 'src-2',
          title: 'IPC-7711/7721 Rework & Repair of Electronic Assemblies (SMD Fuse Replacement)',
          category: 'Industry Standard',
          badge: 'IPC Certified',
        },
      ],
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // Notifications drawer/modal state
  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      title: 'Lab Telemetry Cleared',
      message: 'Dell Latitude 5420 hardware scan complete. Identified: Backlight Fuse F1 fault (96.4% confidence).',
      time: '10 mins ago',
      read: false,
      type: 'success',
    },
    {
      id: 'notif-2',
      title: 'Certified Center Update',
      message: 'Apex Circular Technology accepts eDP harness rework with same-day turnaround.',
      time: '1 hour ago',
      read: false,
      type: 'info',
    },
    {
      id: 'notif-3',
      title: 'Critical Materials Preserved',
      message: 'Your bench has diverted 28.6g of gold and 1.24kg of toxic lead this semester.',
      time: 'Yesterday',
      read: true,
      type: 'milestone',
    },
  ]);

  // Switch between sample devices
  const switchDevice = (deviceKey) => {
    const target = mockSampleDevices[deviceKey] || mockSampleDevices.dell;
    setSelectedDeviceKey(deviceKey);
    setProblemDescription(target.defaultProblem);
    setUploadedImage(null);
    if (target.components && target.components.length > 0) {
      setActiveComponentId(target.components[0].id);
    }

    // Build custom diagnostic object
    const newAnalysis = {
      ...defaultAnalysisResult,
      device: target,
      diagnostics: {
        ...defaultAnalysisResult.diagnostics,
        primaryFailure: target.components?.[0]?.status || "Hardware Subsystem Check Required",
        failureClass: target.repairabilityScore > 6 ? "Component-Level Repairable" : "Recycle & Smelt Target",
      },
      repairability: {
        ...defaultAnalysisResult.repairability,
        overallIndex: target.repairabilityScore,
        rating: target.repairabilityGrade,
      },
      toxicity: {
        ...defaultAnalysisResult.toxicity,
        riskIndex: target.toxicityRiskScore,
        riskCategory: target.toxicityRiskLevel,
      },
    };

    setCurrentAnalysis(newAnalysis);
    setHasCompletedAnalysis(true);
  };

  // Trigger simulated multi-step AI pipeline progress
  const runSimulatedAnalysis = (customImage = null, customProblem = "") => {
    setIsAnalyzing(true);
    setShowErrorState(false);
    setAnalysisStep(1); // 01 Optical Detection & Hardware Segmentation
    setHasCompletedAnalysis(false);

    setTimeout(() => {
      setAnalysisStep(2); // 02 Component Health & RoHS Hazard Scan
    }, 800);

    setTimeout(() => {
      setAnalysisStep(3); // 03 Root Cause & Schematics Cross-Reference
    }, 1600);

    setTimeout(() => {
      setAnalysisStep(4); // 04 Multicriteria LCA & Carbon Modelling
    }, 2400);

    setTimeout(() => {
      setAnalysisStep(5); // 05 Decision Matrix & Certified Intake Match
    }, 3200);

    setTimeout(() => {
      setIsAnalyzing(false);
      setHasCompletedAnalysis(true);
      if (customImage) setUploadedImage(customImage);
      if (customProblem) setProblemDescription(customProblem);
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

  // Repair Copilot send message handler
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

    setTimeout(() => {
      let replyText = "Inspecting circuit trace telemetry. Ensure the multimeter is set to 20V DC range with the black probe grounded to the chassis screw standoff.";
      let replySources = [
        {
          id: `src-${Date.now()}`,
          title: "Standard Electronic Bench Rework Protocol (SMD Inspection)",
          category: "Diagnostics",
          badge: "Bench Manual",
        }
      ];

      const lower = userText.toLowerCase();
      if (lower.includes("fuse") || lower.includes("f1") || lower.includes("multimeter") || lower.includes("ohm")) {
        replyText = "To test Fuse F1: Power off AC and disconnect battery. Touch probes to both SMD terminals of F1. A reading < 0.2Ω confirms normal continuity. An 'O.L' (Open Loop) indicates the fuse blew from an overcurrent surge to protect the GPU display controller.";
        replySources = [
          {
            id: `src-${Date.now()}`,
            title: "Display Rail Overcurrent Protection Schematics",
            category: "Circuit Analysis",
            badge: "OEM Service Bulletin",
          }
        ];
      } else if (lower.includes("battery") || lower.includes("safety") || lower.includes("esd") || lower.includes("fire")) {
        replyText = "Safety Protocol: Wear an anti-static ESD grounding strap connected to earth ground. Disconnect the battery harness connector prior to desoldering. Inspect pouch cells for any tactile swelling or puncture aroma.";
        replySources = [
          {
            id: `src-${Date.now()}`,
            title: "Lithium-Ion Polymer Safety & Thermal Runaway Mitigation (NFPA 855)",
            category: "Safety Standard",
            badge: "OSHA / NFPA",
          }
        ];
      } else if (lower.includes("recycle") || lower.includes("cost") || lower.includes("worth") || lower.includes("scrap")) {
        replyText = "Economic & Material Tradeoff: Repairing the eDP fuse costs ~$24 in parts/labor while saving 218.4 kg CO₂e. In contrast, sending it to scrap yields ~$6.20 in raw recovered metals (Gold 220mg, Copper 68g). Repair is strongly recommended (96/100 score).";
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
    }, 1100);
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <AnalysisContext.Provider
      value={{
        currentAnalysis,
        setCurrentAnalysis,
        selectedDeviceKey,
        switchDevice,
        activeComponentId,
        setActiveComponentId,
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
