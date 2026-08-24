import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Sparkles, Laptop, ShieldCheck } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { useAnalysis } from '../../context/AnalysisContext';

const suggestedPrompts = [
  "How do I reseat the 30-pin eDP cable?",
  "What is the diagnostic LED code 2-7?",
  "Estimated repair cost vs new laptop?",
  "Can this be repurposed as a home server?",
];

export function ChatWindow({ selectedDevice = "Dell Latitude 5420 Laptop" }) {
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
    <div className="bg-[#111827] border border-[#1E293B] rounded-2xl flex flex-col h-[700px] max-h-[80vh] shadow-xl overflow-hidden">
      {/* Chat Window Header */}
      <div className="p-4 sm:p-5 bg-[#0F172A] border-b border-[#1E293B] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20 flex items-center justify-center font-bold">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-bold font-['Outfit'] text-slate-100">
                AI Troubleshooting Assistant
              </h3>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Laptop className="w-3.5 h-3.5 text-teal-400" />
              <span>Target: {selectedDevice}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
            <ShieldCheck className="w-3 h-3" /> Manuals Loaded
          </span>
        </div>
      </div>

      {/* Message List Stream */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {chatMessages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-slate-800 text-teal-400 border border-teal-500/30 flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl rounded-tl-none p-3.5 text-xs text-slate-300 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-bounce [animation-delay:0.4s]" />
              <span className="text-slate-400 ml-1">Analyzing service manual & diagnostic tree...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Questions */}
      <div className="px-4 py-2 bg-[#0F172A]/70 border-t border-[#1E293B] overflow-x-auto">
        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1 shrink-0">
            <Sparkles className="w-3 h-3 text-teal-400" /> Suggested:
          </span>
          {suggestedPrompts.map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => sendChatMessage(prompt)}
              className="text-xs px-2.5 py-1 rounded-lg bg-[#111827] border border-[#1E293B] text-slate-300 hover:text-teal-300 hover:border-teal-500/40 hover:bg-[#172033] transition-all shrink-0"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Message Input Form */}
      <form
        onSubmit={handleSend}
        className="p-3 sm:p-4 bg-[#0F172A] border-t border-[#1E293B] flex items-center gap-2"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask diagnostic questions (e.g., 'What tools are required to open the bottom cover?')..."
          className="flex-1 bg-[#111827] border border-[#1E293B] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-hidden focus:border-teal-500/60 transition-all"
        />

        <button
          type="submit"
          disabled={!inputText.trim() || isTyping}
          className="px-4 py-2.5 rounded-xl bg-teal-400 hover:bg-teal-300 disabled:opacity-40 disabled:cursor-not-allowed text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-md shadow-teal-500/20"
        >
          <span>Send</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
