import React from 'react';
import { Sparkles, ScanLine, ArrowRight } from 'lucide-react';
import { DeviceUpload } from '../components/analysis/DeviceUpload';
import { ImagePreview } from '../components/analysis/ImagePreview';
import { ProblemInput } from '../components/analysis/ProblemInput';
import { LocationSelector } from '../components/analysis/LocationSelector';
import { AnalysisProgress } from '../components/analysis/AnalysisProgress';
import { AnalysisResultView } from '../components/analysis/AnalysisResultView';
import { useAnalysis } from '../context/AnalysisContext';

export function AnalyzeDevice() {
  const {
    currentAnalysis,
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
  } = useAnalysis();

  const handleImageSelect = (url, name) => {
    setUploadedImage(url);
  };

  const handleSelectSample = (sampleType) => {
    if (sampleType === 'dell') {
      setUploadedImage(null);
      setProblemDescription("My laptop turns on and the fan spins, but the screen stays black. An external monitor worked previously.");
    } else if (sampleType === 'iphone') {
      setUploadedImage(null);
      setProblemDescription("iPhone 12 with 84% battery health, slight micro-scratches on screen frame but touchscreen works flawlessly.");
    } else if (sampleType === 'monitor') {
      setUploadedImage(null);
      setProblemDescription("Curved Samsung 27-inch monitor with cracked internal VA matrix panel after a fall.");
    }
  };

  const handleStartAnalysis = (e) => {
    e.preventDefault();
    runSimulatedAnalysis(uploadedImage, problemDescription);
  };

  // 1. Loading Pipeline View
  if (isAnalyzing) {
    return (
      <div className="py-8">
        <AnalysisProgress currentStep={analysisStep} />
      </div>
    );
  }

  // 2. Completed Analysis Result View
  if (hasCompletedAnalysis && currentAnalysis) {
    return (
      <AnalysisResultView
        result={currentAnalysis}
        uploadedImage={uploadedImage}
        onReset={resetAnalysisFlow}
      />
    );
  }

  // 3. Upload & Initial Input Form
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-6 sm:p-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <ScanLine className="w-3.5 h-3.5 text-teal-400" />
          <span>Core Diagnostic Workflow</span>
        </div>

        <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-['Outfit'] text-slate-50 tracking-tight">
          Analyze Your Device
        </h2>

        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl leading-relaxed">
          Upload a photo and describe the problem to get a complete sustainability assessment, guided troubleshooting steps, and certified drop-off locations.
        </p>
      </div>

      <form onSubmit={handleStartAnalysis} className="space-y-6">
        {/* Image Upload / Preview Area */}
        {uploadedImage ? (
          <ImagePreview
            imageSrc={uploadedImage}
            onChange={() => setUploadedImage(null)}
            onRemove={() => setUploadedImage(null)}
          />
        ) : (
          <DeviceUpload
            onImageSelect={handleImageSelect}
            onSelectSample={handleSelectSample}
          />
        )}

        {/* Problem Description Textarea */}
        <ProblemInput
          value={problemDescription}
          onChange={setProblemDescription}
          onClear={() => setProblemDescription("")}
        />

        {/* Location Selector */}
        <LocationSelector
          mode={locationMode}
          onModeChange={setLocationMode}
          manualValue={manualLocation}
          onManualChange={setManualLocation}
        />

        {/* Submit Analyze Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 active:from-teal-500 active:to-emerald-500 text-slate-950 font-extrabold text-base transition-all duration-200 shadow-xl shadow-teal-500/20 hover:shadow-teal-500/35 hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-slate-950" />
            <span>Analyze Device</span>
            <ArrowRight className="w-5 h-5 text-slate-950" />
          </button>

          <p className="text-center text-xs text-slate-500 mt-2.5">
            Deterministic rule engine simulated analysis • No external API data transmitted
          </p>
        </div>
      </form>
    </div>
  );
}
