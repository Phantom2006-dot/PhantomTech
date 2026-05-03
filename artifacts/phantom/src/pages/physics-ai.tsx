import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send, Plus, Trash2, ChevronLeft, Atom, Zap, Globe,
  Copy, Check, BookOpen, FlaskConical, Telescope, Cpu,
} from "lucide-react";
import { Link } from "wouter";
import katex from "katex";

/* ─── Types ─────────────────────────────────────────────────────────── */
interface Message { id: number; role: "user" | "assistant"; content: string; }
interface Conversation { id: number; title: string; createdAt: string; }

/* ─── Stable starfield (memoised so it never re-renders) ─────────────── */
const STARS = Array.from({ length: 100 }, (_, i) => ({
  id: i,
  w: Math.random() * 2 + 1,
  top: Math.random() * 100,
  left: Math.random() * 100,
  opacity: Math.random() * 0.5 + 0.1,
  dur: Math.random() * 4 + 2,
  delay: Math.random() * 4,
}));

function Starfield() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {STARS.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            width: s.w, height: s.w,
            top: `${s.top}%`, left: `${s.left}%`,
            opacity: s.opacity,
            animation: `twinkle ${s.dur}s ease-in-out infinite`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── KaTeX math renderer ────────────────────────────────────────────── */
function renderMath(tex: string, display: boolean): string {
  try {
    return katex.renderToString(tex, { displayMode: display, throwOnError: false, output: "html" });
  } catch {
    return tex;
  }
}

/* ─── Markdown + LaTeX parser ────────────────────────────────────────── */
function parseInline(text: string): string {
  // Inline math $...$
  text = text.replace(/\$([^$\n]+?)\$/g, (_, tex) => renderMath(tex, false));
  // Bold **...**
  text = text.replace(/\*\*([^*]+?)\*\*/g, "<strong>$1</strong>");
  // Italic *...*
  text = text.replace(/(?<!\*)\*([^*\n]+?)\*(?!\*)/g, "<em>$1</em>");
  // Inline code `...`
  text = text.replace(/`([^`]+?)`/g, '<code class="px-1.5 py-0.5 rounded bg-white/10 text-purple-300 text-xs font-mono">$1</code>');
  return text;
}

interface ParsedBlock {
  type: "display-math" | "code-block" | "heading" | "bullet" | "numbered" | "hr" | "paragraph" | "blank";
  content: string;
  level?: number;
  lang?: string;
  number?: number;
}

function parseBlocks(raw: string): ParsedBlock[] {
  const blocks: ParsedBlock[] = [];
  const lines = raw.split("\n");
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Display math $$...$$
    if (line.trim().startsWith("$$")) {
      const start = line.trim().slice(2);
      if (start.trimEnd().endsWith("$$") && start.length > 2) {
        blocks.push({ type: "display-math", content: start.slice(0, -2).trim() });
        i++; continue;
      }
      const mathLines = [start];
      i++;
      while (i < lines.length && !lines[i].trim().endsWith("$$")) {
        mathLines.push(lines[i]); i++;
      }
      if (i < lines.length) { mathLines.push(lines[i].trim().slice(0, -2)); i++; }
      blocks.push({ type: "display-math", content: mathLines.join("\n").trim() });
      continue;
    }

    // Code block ```lang
    if (line.trim().startsWith("```")) {
      const lang = line.trim().slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]); i++;
      }
      i++;
      blocks.push({ type: "code-block", content: codeLines.join("\n"), lang });
      continue;
    }

    // Headings
    const headingMatch = line.match(/^(#{1,3})\s+(.+)$/);
    if (headingMatch) {
      blocks.push({ type: "heading", level: headingMatch[1].length, content: headingMatch[2] });
      i++; continue;
    }

    // HR
    if (/^---+$/.test(line.trim())) {
      blocks.push({ type: "hr", content: "" });
      i++; continue;
    }

    // Bullet list
    if (/^[-*•]\s/.test(line)) {
      blocks.push({ type: "bullet", content: line.replace(/^[-*•]\s/, "") });
      i++; continue;
    }

    // Numbered list
    const numMatch = line.match(/^(\d+)\.\s+(.+)$/);
    if (numMatch) {
      blocks.push({ type: "numbered", number: parseInt(numMatch[1]), content: numMatch[2] });
      i++; continue;
    }

    // Blank
    if (line.trim() === "") {
      blocks.push({ type: "blank", content: "" });
      i++; continue;
    }

    // Paragraph
    blocks.push({ type: "paragraph", content: line });
    i++;
  }
  return blocks;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-white/10 text-gray-500 hover:text-gray-300"
      title="Copy"
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
    </button>
  );
}

function MessageContent({ content }: { content: string }) {
  const blocks = useMemo(() => parseBlocks(content), [content]);

  return (
    <div className="space-y-2 text-sm leading-relaxed">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "display-math":
            return (
              <div key={i} className="my-3 overflow-x-auto py-2 text-center"
                dangerouslySetInnerHTML={{ __html: renderMath(block.content, true) }} />
            );
          case "code-block":
            return (
              <div key={i} className="relative group my-2">
                {block.lang && (
                  <span className="absolute top-2 right-8 text-xs text-gray-500 font-mono">{block.lang}</span>
                )}
                <CopyButton text={block.content} />
                <pre className="bg-black/60 border border-white/10 rounded-lg px-4 py-3 overflow-x-auto text-xs font-mono text-green-300 whitespace-pre">
                  {block.content}
                </pre>
              </div>
            );
          case "heading": {
            const cls = block.level === 1
              ? "text-lg font-bold text-purple-200 mt-4 mb-1"
              : block.level === 2
              ? "text-base font-bold text-purple-300 mt-3 mb-1"
              : "text-sm font-semibold text-purple-400 mt-2 mb-0.5";
            return <div key={i} className={cls} dangerouslySetInnerHTML={{ __html: parseInline(block.content) }} />;
          }
          case "bullet":
            return (
              <div key={i} className="flex gap-2 text-gray-300">
                <span className="text-purple-400 mt-0.5 shrink-0">•</span>
                <span dangerouslySetInnerHTML={{ __html: parseInline(block.content) }} />
              </div>
            );
          case "numbered":
            return (
              <div key={i} className="flex gap-2 text-gray-300">
                <span className="text-purple-400 font-mono text-xs mt-0.5 shrink-0 w-4">{block.number}.</span>
                <span dangerouslySetInnerHTML={{ __html: parseInline(block.content) }} />
              </div>
            );
          case "hr":
            return <hr key={i} className="border-white/10 my-2" />;
          case "blank":
            return <div key={i} className="h-1" />;
          default:
            return (
              <p key={i} className="text-gray-200"
                dangerouslySetInnerHTML={{ __html: parseInline(block.content) }} />
            );
        }
      })}
    </div>
  );
}

/* ─── Topic categories ───────────────────────────────────────────────── */
const TOPICS = [
  { icon: <Atom size={14} />, label: "Quantum", questions: ["What is quantum entanglement?", "Explain wave-particle duality", "Derive the Schrödinger equation"] },
  { icon: <Telescope size={14} />, label: "Cosmology", questions: ["How do black holes evaporate?", "What is dark matter?", "Explain the Big Bang singularity"] },
  { icon: <FlaskConical size={14} />, label: "Relativity", questions: ["Derive E = mc²", "How does gravity bend spacetime?", "What is time dilation?"] },
  { icon: <BookOpen size={14} />, label: "Classical", questions: ["Explain Lagrangian mechanics", "What is entropy?", "Derive Maxwell's equations"] },
  { icon: <Cpu size={14} />, label: "Particle", questions: ["What is the Higgs boson?", "Explain the Standard Model", "What are quarks and gluons?"] },
];

/* ─── Main component ─────────────────────────────────────────────────── */
export default function PhysicsAI() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConvo, setActiveConvo] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTopic, setActiveTopic] = useState(0);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages, streamingContent, scrollToBottom]);
  useEffect(() => { fetchConversations(); }, []);

  async function fetchConversations() {
    try {
      const res = await fetch("/api/openai/conversations");
      if (res.ok) setConversations((await res.json()).reverse());
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

  async function deleteConversation(id: number, e: React.MouseEvent) {
    e.stopPropagation();
    setDeletingId(id);
    try {
      await fetch(`/api/openai/conversations/${id}`, { method: "DELETE" });
      setConversations((prev) => prev.filter((c) => c.id !== id));
      if (activeConvo === id) { setActiveConvo(null); setMessages([]); }
    } catch {}
    setDeletingId(null);
  }

  async function createConversation(firstMessage: string) {
    const title = firstMessage.length > 50 ? firstMessage.slice(0, 47) + "..." : firstMessage;
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
        return data.id as number;
      }
    } catch {}
    return null;
  }

  async function sendMessage(content: string) {
    if (!content.trim() || streaming) return;
    setInput("");
    if (inputRef.current) { inputRef.current.style.height = "48px"; }

    let convoId = activeConvo;
    if (!convoId) {
      convoId = await createConversation(content);
      if (!convoId) return;
    }

    setMessages((prev) => [...prev, { id: Date.now(), role: "user", content }]);
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
      if (!res.ok || !res.body) { setStreaming(false); return; }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value, { stream: true });
        for (const line of text.split("\n")) {
          if (line.startsWith("data: ")) {
            try {
              const parsed = JSON.parse(line.slice(6));
              if (parsed.content) { accumulated += parsed.content; setStreamingContent(accumulated); }
              if (parsed.done) {
                setMessages((prev) => [...prev, { id: Date.now() + 1, role: "assistant", content: accumulated }]);
                setStreamingContent("");
                setStreaming(false);
              }
            } catch {}
          }
        }
      }
    } catch (err: unknown) {
      if (!(err instanceof Error) || err.name !== "AbortError") setStreaming(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); }
  }

  function startNewChat() {
    setActiveConvo(null);
    setMessages([]);
    setStreamingContent("");
    setStreaming(false);
    abortRef.current?.abort();
    setTimeout(() => inputRef.current?.focus(), 100);
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Starfield />

      {/* Navbar */}
      <div className="relative z-10 flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/80 backdrop-blur-sm shrink-0">
        <div className="flex items-center gap-3">
          <Link href="/">
            <button className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors text-sm">
              <ChevronLeft size={15} /><span className="font-mono tracking-widest text-xs">PHANTOM</span>
            </button>
          </Link>
          <span className="text-gray-700">|</span>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-purple-900/40">
              <Atom size={12} className="text-white" />
            </div>
            <span className="font-bold text-sm tracking-widest text-white">PHYSICS AI</span>
          </div>
        </div>
        <button
          onClick={startNewChat}
          className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white border border-white/10 hover:border-purple-500/40 hover:bg-purple-900/20 px-3 py-1.5 rounded-lg transition-all"
        >
          <Plus size={13} /> New Chat
        </button>
      </div>

      {/* Body */}
      <div className="relative z-10 flex flex-1 overflow-hidden" style={{ height: "calc(100vh - 53px)" }}>

        {/* Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 256, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="border-r border-white/10 bg-black/50 backdrop-blur-sm flex flex-col overflow-hidden shrink-0"
            >
              <div className="px-3 py-2.5 border-b border-white/10 flex items-center justify-between">
                <span className="text-xs text-gray-500 uppercase tracking-widest font-mono">History</span>
                <button onClick={() => setSidebarOpen(false)} className="text-gray-600 hover:text-gray-400 transition-colors p-0.5">
                  <ChevronLeft size={13} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
                {conversations.length === 0 && (
                  <p className="text-xs text-gray-600 text-center mt-6 px-3 leading-relaxed">
                    No conversations yet.<br />Ask a physics question to begin.
                  </p>
                )}
                {conversations.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => loadConversation(c.id)}
                    className={`group flex items-center gap-2 px-3 py-2.5 rounded-lg cursor-pointer transition-all ${
                      activeConvo === c.id
                        ? "bg-purple-900/40 border border-purple-500/30 text-purple-200"
                        : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
                    }`}
                  >
                    <Atom size={9} className="shrink-0 text-purple-500" />
                    <span className="truncate flex-1 text-xs">{c.title}</span>
                    <button
                      onClick={(e) => deleteConversation(c.id, e)}
                      disabled={deletingId === c.id}
                      className="opacity-0 group-hover:opacity-100 p-0.5 rounded hover:text-red-400 transition-all shrink-0"
                    >
                      <Trash2 size={11} />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main area */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          {messages.length === 0 && !streaming ? (
            /* Welcome screen */
            <div className="flex-1 flex flex-col items-center justify-center p-6 overflow-y-auto">
              {!sidebarOpen && (
                <button onClick={() => setSidebarOpen(true)} className="fixed top-14 left-3 z-20 text-gray-600 hover:text-gray-400 p-1">
                  <ChevronLeft size={15} className="rotate-180" />
                </button>
              )}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-xl w-full">
                {/* Logo */}
                <div className="relative w-20 h-20 mx-auto mb-5">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600 to-cyan-500 opacity-15 animate-ping" />
                  <div className="absolute inset-1 rounded-full bg-gradient-to-br from-purple-700 to-cyan-600 opacity-30" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Atom size={38} className="text-purple-300" style={{ animation: "spin 20s linear infinite" }} />
                  </div>
                </div>

                <h1 className="text-2xl font-bold mb-1.5 bg-gradient-to-r from-purple-300 via-white to-cyan-400 bg-clip-text text-transparent">
                  PHANTOM Physics AI
                </h1>
                <p className="text-gray-500 text-sm mb-7">
                  Explore the universe through equations, derivations, and cosmic insight.
                </p>

                {/* Topic tabs */}
                <div className="flex gap-1.5 justify-center mb-4 flex-wrap">
                  {TOPICS.map((t, i) => (
                    <button
                      key={t.label}
                      onClick={() => setActiveTopic(i)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
                        activeTopic === i
                          ? "bg-purple-600/40 border border-purple-500/60 text-purple-200"
                          : "border border-white/10 text-gray-500 hover:text-gray-300 hover:border-white/20"
                      }`}
                    >
                      {t.icon}{t.label}
                    </button>
                  ))}
                </div>

                {/* Questions for active topic */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTopic}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="grid grid-cols-1 gap-2"
                  >
                    {TOPICS[activeTopic].questions.map((q) => (
                      <button
                        key={q}
                        onClick={() => sendMessage(q)}
                        className="text-left px-4 py-3 rounded-xl border border-white/10 hover:border-purple-500/40 bg-white/3 hover:bg-purple-900/20 text-gray-400 hover:text-gray-200 text-sm transition-all"
                      >
                        {q}
                      </button>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>
          ) : (
            /* Messages */
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-5">
              {!sidebarOpen && (
                <button onClick={() => setSidebarOpen(true)} className="fixed top-14 left-3 z-20 text-gray-600 hover:text-gray-400 p-1">
                  <ChevronLeft size={15} className="rotate-180" />
                </button>
              )}
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.role === "assistant" && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center shrink-0 mt-1 shadow-lg shadow-purple-900/40">
                        <Atom size={13} className="text-white" />
                      </div>
                    )}
                    <div className={`group relative rounded-2xl px-4 py-3 text-sm max-w-[85%] ${
                      msg.role === "user"
                        ? "bg-purple-600/25 border border-purple-500/30 text-white rounded-tr-sm"
                        : "bg-white/4 border border-white/10 text-gray-200 rounded-tl-sm"
                    }`}>
                      {msg.role === "assistant" ? (
                        <>
                          <div className="absolute top-2 right-2">
                            <CopyButton text={msg.content} />
                          </div>
                          <MessageContent content={msg.content} />
                        </>
                      ) : (
                        <p className="whitespace-pre-wrap">{msg.content}</p>
                      )}
                    </div>
                    {msg.role === "user" && (
                      <div className="w-8 h-8 rounded-full bg-white/8 border border-white/10 flex items-center justify-center shrink-0 mt-1">
                        <Globe size={13} className="text-gray-400" />
                      </div>
                    )}
                  </motion.div>
                ))}

                {/* Streaming bubble */}
                {streaming && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3 justify-start">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center shrink-0 mt-1 shadow-lg shadow-purple-900/40">
                      <Atom size={13} className="text-white" style={{ animation: "spin 1.5s linear infinite" }} />
                    </div>
                    <div className="max-w-[85%] rounded-2xl rounded-tl-sm px-4 py-3 text-sm bg-white/4 border border-white/10">
                      {streamingContent ? (
                        <>
                          <MessageContent content={streamingContent} />
                          <span className="inline-block w-1.5 h-4 bg-purple-400 animate-pulse ml-0.5 align-middle rounded-sm" />
                        </>
                      ) : (
                        <div className="flex gap-1 items-center h-5 px-1">
                          {[0, 150, 300].map((d) => (
                            <div key={d} className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: `${d}ms` }} />
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>
          )}

          {/* Input */}
          <div className="px-4 py-3 border-t border-white/10 bg-black/60 backdrop-blur-sm shrink-0">
            <div className="max-w-3xl mx-auto flex gap-2.5 items-end">
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask a physics question... (LaTeX rendered automatically)"
                  rows={1}
                  disabled={streaming}
                  className="w-full bg-white/5 border border-white/12 hover:border-purple-500/40 focus:border-purple-500/50 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none resize-none transition-colors"
                  style={{ maxHeight: "160px", minHeight: "48px" }}
                  onInput={(e) => {
                    const t = e.currentTarget;
                    t.style.height = "auto";
                    t.style.height = Math.min(t.scrollHeight, 160) + "px";
                  }}
                />
              </div>
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || streaming}
                className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 disabled:from-white/8 disabled:to-white/8 disabled:text-gray-600 flex items-center justify-center transition-all shrink-0 shadow-lg shadow-purple-900/30"
              >
                {streaming ? <Zap size={15} className="text-purple-300 animate-pulse" /> : <Send size={15} className="text-white" />}
              </button>
            </div>
            <p className="text-center text-gray-700 text-xs mt-2">
              Enter to send · Shift+Enter for new line · LaTeX: <span className="font-mono text-gray-600">$E=mc^2$</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
