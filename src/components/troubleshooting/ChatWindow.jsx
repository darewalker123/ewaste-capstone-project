import React, { useState, useRef, useEffect } from 'react';
import { Send, Cpu, Radio, ShieldCheck, Wrench } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { useAnalysis } from '../../context/AnalysisContext';

const suggestedPrompts = [
  "How do I test Fuse F1 with a multimeter in continuity mode?",
  "Safety protocol for disconnecting the 63Wh Li-ion battery?",
  "What is the pinout for the 40-pin eDP display backlight rail?",
  "Compare repair cost ($24) vs metal recovery scrap yield ($6.20)",
];

export function ChatWindow({ selectedDevice = "Dell Latitude 5420 Enterprise" }) {
  const { chatMessages, isTyping, sendChatMessage } = useAnalysis();
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, isTyping]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim() || isTyping) return;
    sendChatMessage(inputText);
    setInputText("");
  };

  return (
    <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl flex flex-col h-[650px] shadow-2xl overflow-hidden relative">
      {/* Tactical HUD Corner Marks */}
      <div className="hud-corner-tl" />
      <div className="hud-corner-tr" />
      <div className="hud-corner-bl" />
      <div className="hud-corner-br" />

      {/* Copilot Header */}
      <div className="p-4 bg-[#080D18] border-b border-[#1E293B] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-bold">
            <Wrench className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-black font-['Outfit'] text-slate-100">
                Hardware Repair Copilot
              </h3>
              <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">
                IPC-7711 REWORK
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono mt-0.5">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>Target: {selectedDevice}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono">
          <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
            <ShieldCheck className="w-3.5 h-3.5" /> SCHEMATICS LOADED
          </span>
        </div>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 font-sans">
        {chatMessages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-[#080D18] border border-[#1E293B] w-fit font-mono text-xs text-cyan-400">
            <Radio className="w-3.5 h-3.5 animate-led" />
            <span>Consulting OEM service schematics & multimeter telemetry...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Bench Prompts */}
      <div className="px-4 py-2.5 bg-[#080D18]/90 border-t border-[#1E293B] overflow-x-auto">
        <div className="flex items-center gap-2 text-[11px] font-mono">
          <span className="text-slate-500 font-bold shrink-0">BENCH PROMPTS:</span>
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {suggestedPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => sendChatMessage(prompt)}
                className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-[#0F172A] border border-[#1E293B] text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 hover:bg-[#111C35] transition-all text-[11px]"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSend} className="p-3 sm:p-4 bg-[#080D18] border-t border-[#1E293B] flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask repair copilot: test procedures, component pinouts, torque specs..."
          className="flex-1 bg-[#0F172A] border border-[#1E293B] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/30 font-sans"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || isTyping}
          className="p-2.5 sm:px-4 sm:py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-mono font-bold text-xs transition-all flex items-center gap-1.5 shadow-md shadow-cyan-500/20"
        >
          <span className="hidden sm:inline">SEND</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
