import React, { useState, useRef, useEffect } from 'react';
import { useStudent } from '../context/StudentContext';
import {
  Send,
  Bot,
  User,
  Paperclip,
  Mic,
  RotateCcw,
  Sparkles,
  Zap,
  HelpCircle,
  FileText,
  Volume2
} from 'lucide-react';

export const AITutorPage: React.FC = () => {
  const {
    chatMessages,
    sendMessageToTutor,
    clearChat,
    isAiThinking,
    student,
    selectedSubjectId,
    getSubjectById,
    navigateTo,
    addToast
  } = useStudent();

  const [inputVal, setInputVal] = useState('');
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeSubject = getSubjectById(selectedSubjectId || 'physics') || getSubjectById('physics')!;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isAiThinking]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputVal.trim() || isAiThinking) return;

    const message = inputVal.trim();
    setInputVal('');
    await sendMessageToTutor(message);
  };

  const handleQuickPrompt = (promptText: string) => {
    setInputVal(promptText);
    sendMessageToTutor(promptText);
  };

  const handleVoiceToggle = () => {
    if (!isListening) {
      setIsListening(true);
      addToast({
        title: 'Microphone Activated (Simulated)',
        description: 'Speak your question clearly...',
        type: 'info'
      });
      setTimeout(() => {
        setInputVal("Can you explain how resistance affects current in Ohm's Law?");
        setIsListening(false);
      }, 2200);
    } else {
      setIsListening(false);
    }
  };

  const handleUploadClick = () => {
    navigateTo('notes');
  };

  const quickPrompts = [
    { label: 'Explain simply', prompt: "Can you explain Ohm's Law in simple terms?" },
    { label: 'Give an example', prompt: 'Give a real-life practical example of how this applies.' },
    { label: 'Create a quiz', prompt: 'Create a 3-question quick concept quiz to test me on this.' },
    { label: 'Summarize this topic', prompt: 'Summarize this topic with high-yield key formulas and takeaways.' },
    { label: "Explain like I'm a beginner", prompt: "Explain this like I'm a complete beginner with a water pipe analogy." }
  ];

  return (
    <div id="ai-tutor-page" className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto flex flex-col h-[calc(100vh-5rem)]">
      {/* Tutor Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-200">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading">
                AI Study Tutor
              </h1>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Online & Ready
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Ask anything about what you're learning. Socratic step-by-step guidance.
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            id="tutor-clear-chat-btn"
            onClick={clearChat}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors cursor-pointer"
            title="Start new conversation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>New Chat</span>
          </button>
        </div>
      </div>

      {/* Quick Prompt Chips */}
      <div className="py-3 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
        <span className="text-xs font-semibold text-slate-400 shrink-0 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          <span>Quick Prompts:</span>
        </span>
        {quickPrompts.map((p) => (
          <button
            key={p.label}
            onClick={() => handleQuickPrompt(p.prompt)}
            className="text-xs font-medium px-3 py-1 bg-white hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 text-slate-700 border border-slate-200 rounded-full shrink-0 transition-colors shadow-2xs cursor-pointer"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Chat Messages Log Area */}
      <div className="flex-1 overflow-y-auto pr-2 py-4 space-y-4">
        {chatMessages.length === 0 ? (
          <div className="text-center py-16 px-4 bg-white/70 border border-dashed border-slate-200 rounded-2xl max-w-lg mx-auto my-auto space-y-3">
            <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mx-auto">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-heading">
              How can I assist your study session today?
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Ask about formulas, request an intuitive analogy, or generate practice questions on Physics, Chemistry, or Mathematics.
            </p>
          </div>
        ) : (
          chatMessages.map((msg) => {
            const isUser = msg.sender === 'user';

            return (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white shrink-0 mt-1 shadow-xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-2xl rounded-2xl p-4 sm:p-5 text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-indigo-600 text-white rounded-tr-none shadow-sm'
                      : 'bg-white border border-slate-200/80 text-slate-800 rounded-tl-none shadow-xs'
                  }`}
                >
                  {/* Context pill if user asked about specific subject */}
                  {isUser && msg.contextSubject && (
                    <span className="block text-[10px] text-indigo-200 font-bold uppercase tracking-wider mb-1">
                      {msg.contextSubject}
                    </span>
                  )}

                  <div className="whitespace-pre-wrap font-sans">{msg.text}</div>

                  <div
                    className={`mt-2 text-[10px] flex items-center justify-end ${
                      isUser ? 'text-indigo-200' : 'text-slate-400'
                    }`}
                  >
                    <span>{msg.timestamp}</span>
                  </div>
                </div>

                {isUser && (
                  <img
                    src={student.avatarUrl}
                    alt={student.name}
                    className="w-8 h-8 rounded-full border border-indigo-200 object-cover shrink-0 mt-1"
                  />
                )}
              </div>
            );
          })
        )}

        {/* Thinking Indicator */}
        {isAiThinking && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white shrink-0 shadow-xs">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-4 rounded-tl-none text-xs text-slate-500 flex items-center gap-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
              <span className="font-medium text-slate-600">SmartLearn AI is thinking...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar & Actions */}
      <div className="pt-2 border-t border-slate-200/80 shrink-0">
        <form
          onSubmit={handleSend}
          className="bg-white rounded-2xl border border-slate-300 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 shadow-xs p-2 transition-all flex items-center gap-2"
        >
          {/* Upload Material Button */}
          <button
            type="button"
            onClick={handleUploadClick}
            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors cursor-pointer"
            title="Upload Material for AI analysis"
            aria-label="Upload material"
          >
            <Paperclip className="w-5 h-5" />
          </button>

          {/* Voice Input Button */}
          <button
            type="button"
            onClick={handleVoiceToggle}
            className={`p-2 rounded-xl transition-colors cursor-pointer ${
              isListening
                ? 'bg-rose-100 text-rose-600 animate-pulse'
                : 'text-slate-400 hover:text-indigo-600 hover:bg-indigo-50'
            }`}
            title="Voice dictation"
            aria-label="Voice input"
          >
            <Mic className="w-5 h-5" />
          </button>

          <input
            id="tutor-chat-input"
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Ask your question (e.g. 'Explain Ohm’s Law with an example')..."
            className="flex-1 text-sm bg-transparent border-none focus:outline-hidden text-slate-800 placeholder:text-slate-400 px-2 py-1"
          />

          <button
            id="tutor-send-btn"
            type="submit"
            disabled={!inputVal.trim() || isAiThinking}
            className="p-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white rounded-xl shadow-xs transition-colors cursor-pointer"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        <p className="text-[11px] text-slate-400 text-center mt-2">
          SmartLearn AI answers provide educational scaffolding. Double check equations with course materials.
        </p>
      </div>
    </div>
  );
};
