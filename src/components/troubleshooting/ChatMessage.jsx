import React from 'react';
import { Bot, User, Clock } from 'lucide-react';
import { SourcesList } from './SourcesList';

export function ChatMessage({ message }) {
  const isUser = message.sender === 'user';

  return (
    <div
      className={`flex items-start gap-3 w-full ${
        isUser ? 'flex-row-reverse' : 'flex-row'
      }`}
    >
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold shadow-sm ${
          isUser
            ? 'bg-teal-500 text-slate-950 shadow-teal-500/20'
            : 'bg-slate-800 text-teal-400 border border-teal-500/30'
        }`}
      >
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>

      {/* Bubble Container */}
      <div
        className={`max-w-[85%] sm:max-w-xl rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-md ${
          isUser
            ? 'bg-teal-600/90 text-white rounded-tr-none'
            : 'bg-[#111827] text-slate-200 border border-[#1E293B] rounded-tl-none'
        }`}
      >
        {/* Message Header */}
        <div className="flex items-center justify-between gap-4 mb-1.5 pb-1 border-b border-white/10 text-[10px] text-slate-400">
          <span className="font-semibold uppercase tracking-wider">
            {isUser ? 'You' : 'Hardware AI Assistant'}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-2.5 h-2.5" />
            {message.timestamp}
          </span>
        </div>

        {/* Text Content */}
        <div className="whitespace-pre-wrap">{message.text}</div>

        {/* Expandable Sources (if assistant message has sources) */}
        {!isUser && message.sources && message.sources.length > 0 && (
          <SourcesList sources={message.sources} />
        )}
      </div>
    </div>
  );
}
