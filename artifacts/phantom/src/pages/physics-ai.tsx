import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Plus, Trash2, ChevronLeft, Atom, Zap, Globe } from "lucide-react";
import { Link } from "wouter";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
}

interface Conversation {
  id: number;
  title: string;
  createdAt: string;
}

const EXAMPLE_QUESTIONS = [
  "Explain quantum entanglement",
  "How do black holes evaporate?",
  "Derive E = mc²",
  "What is the Heisenberg uncertainty principle?",
  "How does gravity bend spacetime?",
  "Explain the double-slit experiment",
];

function formatMessage(content: string): React.ReactNode {
  const lines = content.split("\n");
  return lines.map((line, i) => {
    if (line.startsWith("### ")) {
      return <h3 key={i} className="text-purple-300 font-bold text-lg mt-4 mb-1">{line.slice(4)}</h3>;
    }
    if (line.startsWith("## ")) {
      return <h2 key={i} className="text-purple-200 font-bold text-xl mt-4 mb-1">{line.slice(3)}</h2>;
    }
    if (line.startsWith("**") && line.endsWith("**")) {
      return <p key={i} className="font-bold text-white">{line.slice(2, -2)}</p>;
    }
    if (line.startsWith("- ") || line.startsWith("• ")) {
      return <li key={i} className="ml-4 text-gray-300 list-disc">{line.slice(2)}</li>;
    }
    if (line.trim() === "") {
      return <br key={i} />;
    }
    const bold = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    return (
      <p key={i} className="text-gray-200 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: bold }} />
    );
  });
}

export default function PhysicsAI() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConvo, setActiveConvo] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages, streamingContent, scrollToBottom]);

  useEffect(() => {
    fetchConversations();
  }, []);

  async function fetchConversations() {
    try {
      const res = await fetch("/api/openai/conversations");
      if (res.ok) {
        const data = await res.json();
        setConversations(data.reverse());
      }
    } catch {}
  }

  async function loadConversation(id: number) {
    try {
      const res = await fetch(`/api/openai/conversations/${id}`);
      if (res.ok) {
        const data = await res.json();
        setMessages(data.messages);
        setActiveConvo(id);
      }
    } catch {}
  }

  async function createConversation(firstMessage: string) {
    const title = firstMessage.length > 50
      ? firstMessage.slice(0, 47) + "..."
      : firstMessage;
    try {
      const res = await fetch("/api/openai/conversations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      if (res.ok) {
        const data = await res.json();
        setActiveConvo(data.id);
        await fetchConversations();
        return data.id;
      }
    } catch {}
    return null;
  }

  async function sendMessage(content: string) {
    if (!content.trim() || streaming) return;
    setInput("");

    let convoId = activeConvo;
    if (!convoId) {
      convoId = await createConversation(content);
      if (!convoId) return;
    }

    const userMsg: Message = {
      id: Date.now(),
      role: "user",
      content,
    };
    setMessages((prev) => [...prev, userMsg]);
    setStreaming(true);
    setStreamingContent("");

    abortRef.current = new AbortController();

    try {
      const res = await fetch(`/api/openai/conversations/${convoId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
        signal: abortRef.current.signal,
      });

      if (!res.ok || !res.body) {
        setStreaming(false);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value, { stream: true });
        const lines = text.split("\n");
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const parsed = JSON.parse(line.slice(6));
              if (parsed.content) {
                accumulated += parsed.content;
                setStreamingContent(accumulated);
              }
              if (parsed.done) {
                const assistantMsg: Message = {
                  id: Date.now() + 1,
                  role: "assistant",
                  content: accumulated,
                };
                setMessages((prev) => [...prev, assistantMsg]);
                setStreamingContent("");
                setStreaming(false);
              }
            } catch {}
          }
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name !== "AbortError") {
        setStreaming(false);
      }
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  function startNewChat() {
    setActiveConvo(null);
    setMessages([]);
    setStreamingContent("");
    setStreaming(false);
    if (abortRef.current) abortRef.current.abort();
    inputRef.current?.focus();
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Starfield */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {Array.from({ length: 80 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1 + "px",
              height: Math.random() * 2 + 1 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              opacity: Math.random() * 0.6 + 0.1,
              animation: `twinkle ${Math.random() * 4 + 2}s ease-in-out infinite`,
              animationDelay: Math.random() * 4 + "s",
            }}
          />
        ))}
      </div>

      {/* Top navbar */}
      <div className="relative z-10 flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/80 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <Link href="/">
            <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
              <ChevronLeft size={16} />
              <span>PHANTOM</span>
            </button>
          </Link>
          <span className="text-gray-600">|</span>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center">
              <Atom size={12} className="text-white" />
            </div>
            <span className="font-bold text-sm tracking-widest text-white">PHYSICS AI</span>
          </div>
        </div>
        <button
          onClick={startNewChat}
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white border border-white/10 hover:border-white/30 px-3 py-1.5 rounded-lg transition-all"
        >
          <Plus size={14} />
          New Chat
        </button>
      </div>

      <div className="relative z-10 flex flex-1 overflow-hidden" style={{ height: "calc(100vh - 57px)" }}>
        {/* Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 260, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="border-r border-white/10 bg-black/60 backdrop-blur-sm flex flex-col overflow-hidden shrink-0"
            >
              <div className="p-3 border-b border-white/10 flex items-center justify-between">
                <span className="text-xs text-gray-500 uppercase tracking-widest">History</span>
                <button onClick={() => setSidebarOpen(false)} className="text-gray-600 hover:text-gray-400 transition-colors">
                  <ChevronLeft size={14} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-2 space-y-1">
                {conversations.length === 0 && (
                  <p className="text-xs text-gray-600 text-center mt-4 px-2">No conversations yet. Ask a physics question to get started!</p>
                )}
                {conversations.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => loadConversation(c.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-xs transition-all group flex items-center gap-2 ${
                      activeConvo === c.id
                        ? "bg-purple-900/40 text-purple-200 border border-purple-500/30"
                        : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
                    }`}
                  >
                    <Atom size={10} className="shrink-0 text-purple-400" />
                    <span className="truncate flex-1">{c.title}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main chat area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {messages.length === 0 && !streaming ? (
            /* Welcome / empty state */
            <div className="flex-1 flex flex-col items-center justify-center p-8">
              {!sidebarOpen && (
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="absolute top-16 left-4 text-gray-600 hover:text-gray-400 transition-colors"
                >
                  <ChevronLeft size={16} className="rotate-180" />
                </button>
              )}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center max-w-lg"
              >
                <div className="relative w-20 h-20 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600 to-cyan-500 opacity-20 animate-ping" />
                  <div className="absolute inset-2 rounded-full bg-gradient-to-br from-purple-600 to-cyan-500 opacity-40" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Atom size={36} className="text-purple-300" />
                  </div>
                </div>
                <h1 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-300 to-cyan-400 bg-clip-text text-transparent">
                  PHANTOM Physics AI
                </h1>
                <p className="text-gray-500 text-sm mb-8">
                  Ask anything about physics — from quantum mechanics to black holes, from thermodynamics to the nature of spacetime.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
                  {EXAMPLE_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="text-left px-4 py-3 rounded-xl border border-white/10 hover:border-purple-500/40 bg-white/5 hover:bg-purple-900/20 text-gray-400 hover:text-gray-200 text-xs transition-all"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          ) : (
            /* Messages */
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
              {!sidebarOpen && (
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="fixed top-16 left-4 z-20 text-gray-600 hover:text-gray-400 transition-colors"
                >
                  <ChevronLeft size={16} className="rotate-180" />
                </button>
              )}
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.role === "assistant" && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center shrink-0 mt-1">
                        <Atom size={14} className="text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                        msg.role === "user"
                          ? "bg-purple-600/30 border border-purple-500/30 text-white rounded-tr-sm"
                          : "bg-white/5 border border-white/10 text-gray-200 rounded-tl-sm"
                      }`}
                    >
                      {msg.role === "assistant" ? (
                        <div className="space-y-1">{formatMessage(msg.content)}</div>
                      ) : (
                        <p>{msg.content}</p>
                      )}
                    </div>
                    {msg.role === "user" && (
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-1">
                        <Globe size={14} className="text-gray-400" />
                      </div>
                    )}
                  </motion.div>
                ))}

                {/* Streaming message */}
                {streaming && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3 justify-start"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center shrink-0 mt-1">
                      <Atom size={14} className="text-white" style={{ animation: "spin 2s linear infinite" }} />
                    </div>
                    <div className="max-w-[80%] rounded-2xl rounded-tl-sm px-4 py-3 text-sm bg-white/5 border border-white/10">
                      {streamingContent ? (
                        <div className="space-y-1 text-gray-200">
                          {formatMessage(streamingContent)}
                          <span className="inline-block w-1.5 h-4 bg-purple-400 animate-pulse ml-0.5 align-middle" />
                        </div>
                      ) : (
                        <div className="flex gap-1 items-center h-5">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>
          )}

          {/* Input area */}
          <div className="p-4 border-t border-white/10 bg-black/60 backdrop-blur-sm">
            <div className="max-w-3xl mx-auto flex gap-3 items-end">
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask a physics question..."
                  rows={1}
                  disabled={streaming}
                  className="w-full bg-white/5 border border-white/15 hover:border-purple-500/40 focus:border-purple-500/60 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none resize-none transition-colors"
                  style={{ maxHeight: "200px", minHeight: "48px" }}
                  onInput={(e) => {
                    const t = e.currentTarget;
                    t.style.height = "auto";
                    t.style.height = Math.min(t.scrollHeight, 200) + "px";
                  }}
                />
              </div>
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || streaming}
                className="w-11 h-11 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:bg-white/10 disabled:text-gray-600 flex items-center justify-center transition-all shrink-0"
              >
                {streaming ? (
                  <Zap size={16} className="text-purple-300 animate-pulse" />
                ) : (
                  <Send size={16} className="text-white" />
                )}
              </button>
            </div>
            <p className="text-center text-gray-700 text-xs mt-2">Press Enter to send · Shift+Enter for new line</p>
          </div>
        </div>
      </div>
    </div>
  );
}
