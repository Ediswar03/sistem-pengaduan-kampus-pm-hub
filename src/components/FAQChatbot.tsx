import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, Loader2, RefreshCw } from "lucide-react";

interface ChatMessage {
  role: "user" | "bot";
  text: string;
  timestamp: string;
}

const QUICK_QUESTIONS = [
  "Bagaimana cara membuat aduan baru?",
  "Apa saja status aduan di SIPELAK?",
  "Bagaimana penanganan AC kelas rusak?",
  "Apa inovasi utama proyek ini?"
];

export default function FAQChatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "bot",
      text: "Halo! Saya SIPELAK AI Assistant. Ada yang bisa saya bantu terkait pengaduan fasilitas, akademik, IT, atau cara penggunaan sistem ini?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMessage: ChatMessage = {
      role: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const history = messages.map(msg => ({
        role: msg.role === "user" ? "user" : "model",
        text: msg.text
      }));

      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend, history })
      });

      const data = await res.json();
      
      const botMessage: ChatMessage = {
        role: "bot",
        text: data.text || "Maaf, saya mengalami gangguan koneksi ke server.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Chatbot error:", err);
      setMessages((prev) => [...prev, {
        role: "bot",
        text: "Maaf, terjadi kesalahan saat menghubungi asisten AI. Silakan coba kembali.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[520px] bg-white rounded-2xl border border-slate-100 shadow-xl overflow-hidden" id="faq-chatbot">
      {/* Bot Header */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-700 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center border border-white/20 animate-pulse">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-white flex items-center space-x-1.5 text-sm md:text-base">
              <span>Asisten AI SIPELAK</span>
              <Sparkles className="w-3.5 h-3.5 text-teal-200 fill-teal-200" />
            </h3>
            <span className="text-xs text-teal-100/80 flex items-center">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-1.5 inline-block"></span>
              Online • Gemini 3.5 Flash
            </span>
          </div>
        </div>
        <button 
          onClick={() => setMessages([{
            role: "bot",
            text: "Halo! Saya SIPELAK AI Assistant. Ada yang bisa saya bantu terkait pengaduan fasilitas, akademik, IT, atau cara penggunaan sistem ini?",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }])}
          className="text-white/80 hover:text-white p-1.5 hover:bg-white/10 rounded-lg transition-all"
          title="Reset Percakapan"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Message Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-slate-50/50">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className={`flex items-start max-w-[85%] space-x-2.5 ${msg.role === "user" ? "flex-row-reverse space-x-reverse" : ""}`}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-sm ${
                msg.role === "user" ? "bg-teal-600 text-white" : "bg-white border border-slate-100 text-teal-700"
              }`}>
                {msg.role === "user" ? <User className="w-4.5 h-4.5" /> : <Bot className="w-4.5 h-4.5" />}
              </div>
              <div className={`rounded-2xl px-4 py-2.5 shadow-sm relative ${
                msg.role === "user"
                  ? "bg-teal-600 text-white rounded-tr-none"
                  : "bg-white text-slate-800 border border-slate-100 rounded-tl-none"
              }`}>
                <p className="text-sm whitespace-pre-line leading-relaxed">{msg.text}</p>
                <span className={`text-[10px] block mt-1 text-right ${msg.role === "user" ? "text-teal-200" : "text-slate-400"}`}>
                  {msg.timestamp}
                </span>
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="flex items-start max-w-[85%] space-x-2.5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white border border-slate-100 text-teal-700 shadow-sm">
                <Bot className="w-4.5 h-4.5" />
              </div>
              <div className="bg-white text-slate-800 border border-slate-100 rounded-2xl rounded-tl-none px-4 py-2.5 shadow-sm flex items-center space-x-2">
                <Loader2 className="w-4 h-4 text-teal-600 animate-spin" />
                <span className="text-xs text-slate-500 font-mono">Memikirkan jawaban...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Suggested chips if messages length is short */}
      {messages.length < 4 && (
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex flex-wrap gap-1.5 items-center">
          <span className="text-[11px] text-slate-400 font-medium mr-1 uppercase tracking-wider">Tanya:</span>
          {QUICK_QUESTIONS.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(q)}
              className="text-xs bg-white text-slate-600 hover:text-teal-700 hover:border-teal-300 border border-slate-200/80 rounded-full px-3 py-1 transition-all shadow-2xs hover:bg-teal-50"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input area */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(input);
        }}
        className="p-3 bg-white border-t border-slate-100 flex items-center space-x-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tanyakan sesuatu tentang pengaduan..."
          className="flex-1 text-sm border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-hidden focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="bg-teal-600 text-white p-2.5 rounded-xl hover:bg-teal-700 disabled:opacity-50 transition-all flex items-center justify-center shadow-md hover:shadow-teal-100"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
