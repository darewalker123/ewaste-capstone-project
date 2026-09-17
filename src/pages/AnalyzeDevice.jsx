import React from 'react';
import { ScanLine, ArrowRight, Radio, Activity } from 'lucide-react';
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
    selectedDeviceKey,
    switchDevice,
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
    runSimulatedAnalysis,
    resetAnalysisFlow,
  } = useAnalysis();

  const handleImageSelect = (url) => {
    setUploadedImage(url);
  };

  const handleSelectSample = (sampleType) => {
    switchDevice(sampleType);
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
      <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6 sm:p-7 shadow-xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-wider mb-2">
          <Radio className="w-3 h-3 text-cyan-400 animate-led" />
          <span>OPTICAL SCAN CHAMBER & DIAGNOSTIC INTAKE</span>
        </div>

        <h2 className="text-xl sm:text-2xl lg:text-3xl font-black font-['Outfit'] text-slate-50 tracking-tight">
          Analyze Hardware Specimen
        </h2>

        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl leading-relaxed font-sans">
          Feed high-resolution device photos into the optical scan chamber, define hardware symptoms, and generate component-level repairability and toxicity reports.
        </p>
      </div>

      <form onSubmit={handleStartAnalysis} className="space-y-6">
        {/* Image Upload / Scan Chamber Preview */}
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
            activePresetKey={selectedDeviceKey}
          />
        )}

        {/* Problem Description & Symptoms */}
        <ProblemInput
          value={problemDescription}
          onChange={(e) => setProblemDescription(e.target.value)}
        />

        {/* Location Drop-Off Preference */}
        <LocationSelector
          mode={locationMode}
          onModeChange={setLocationMode}
          manualLocation={manualLocation}
          onManualLocationChange={setManualLocation}
        />

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-slate-950 font-mono font-black text-sm transition-all duration-200 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <ScanLine className="w-4 h-4" />
            <span>RUN FULL HARDWARE & LCA DIAGNOSTICS</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
