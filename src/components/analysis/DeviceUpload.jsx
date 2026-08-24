import React, { useRef, useState } from 'react';
import { Upload, Camera, Image, Sparkles, Laptop, Smartphone, Monitor } from 'lucide-react';

export function DeviceUpload({ onImageSelect, onSelectSample }) {
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onImageSelect(url, file.name);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onImageSelect(url, file.name);
    }
  };

  return (
    <div className="space-y-4">
      {/* Hidden file inputs */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/png, image/jpeg, image/jpg"
        className="hidden"
      />
      <input
        type="file"
        ref={cameraInputRef}
        onChange={handleFileChange}
        accept="image/*"
        capture="environment"
        className="hidden"
      />

      {/* Desktop Drag & Drop Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all cursor-pointer ${
          isDragging
            ? 'border-teal-400 bg-teal-500/10'
            : 'border-[#1E293B] hover:border-teal-500/40 bg-[#0F172A] hover:bg-[#172033]'
        }`}
      >
        <div className="max-w-md mx-auto space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20 flex items-center justify-center shadow-sm">
              <Camera className="w-6 h-6" />
            </div>
            <div className="w-12 h-12 rounded-xl bg-slate-800 text-slate-300 border border-slate-700 flex items-center justify-center shadow-sm">
              <Upload className="w-6 h-6" />
            </div>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-bold font-['Outfit'] text-slate-100 mb-1">
              Upload your electronic device
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Drag & drop an image here or browse from your device
            </p>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
              className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 active:bg-teal-500 rounded-xl transition-all shadow-md shadow-teal-500/20"
            >
              Browse Files
            </button>
          </div>

          <p className="text-[11px] text-slate-500 font-medium">
            PNG, JPG or JPEG supported (Max 15MB)
          </p>
        </div>
      </div>

      {/* Mobile-Optimized Prominent Actions */}
      <div className="grid grid-cols-2 gap-3 sm:hidden">
        <button
          type="button"
          onClick={() => cameraInputRef.current?.click()}
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-teal-500/15 border border-teal-500/40 text-teal-300 font-semibold text-xs active:bg-teal-500/25 transition-colors"
        >
          <Camera className="w-4 h-4 text-teal-400" />
          <span>Take Photo</span>
        </button>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-xs active:bg-slate-700 transition-colors"
        >
          <Image className="w-4 h-4 text-slate-400" />
          <span>Choose from Gallery</span>
        </button>
      </div>

      {/* Quick Preset Devices for Instant Demo */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-teal-400" /> Or load sample device preset:
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => onSelectSample('dell')}
            className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-[#111827] border border-[#1E293B] hover:border-teal-500/40 hover:bg-[#172033] text-xs font-medium text-slate-300 transition-all"
          >
            <Laptop className="w-3.5 h-3.5 text-teal-400" />
            <span className="truncate">Dell Laptop</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectSample('iphone')}
            className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-[#111827] border border-[#1E293B] hover:border-blue-500/40 hover:bg-[#172033] text-xs font-medium text-slate-300 transition-all"
          >
            <Smartphone className="w-3.5 h-3.5 text-blue-400" />
            <span className="truncate">iPhone 12</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectSample('monitor')}
            className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-[#111827] border border-[#1E293B] hover:border-amber-500/40 hover:bg-[#172033] text-xs font-medium text-slate-300 transition-all"
          >
            <Monitor className="w-3.5 h-3.5 text-amber-400" />
            <span className="truncate">Samsung Monitor</span>
          </button>
        </div>
      </div>
    </div>
  );
}
