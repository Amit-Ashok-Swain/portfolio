import React, { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function TerminalOS() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    { type: "system", text: "Amit-OS v3.0 [Neural Interface Initialized]" },
    {
      type: "system",
      text: 'Type "help" to see available commands or click a quick prompt below.',
    },
  ]);

  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const overlayRef = useRef(null);
  const terminalBoxRef = useRef(null);
  const bottomRef = useRef(null);

  const commands = {
    help: "Available commands: about, experience, projects, skills, metrics, clear, exit",
    about:
      "Amit Ashok Swain: Sr. Engineering Project Manager & AI Product Builder operating at the intersection of AI, Java/Spring Boot, and 0→1 execution.",
    experience:
      "Current: Sr. PM at Persist Ventures (40+ projects managed). Past: Digital PM at GSK (100% timeline improvement) & Operations Manager at Teleperformance (57% efficiency gain).",
    projects:
      "Shipped Platforms: DeepVid.ai, SongGPT, Sound Of Meme, NeighborGood. Focus on AI video generation, Web3 audio engines, and microservices.",
    skills:
      "Core Stack: Java, Spring Boot, Python, AWS EC2, Machine Learning, Agile/Scrum, JIRA, MySQL, React & GSAP 3D.",
    metrics:
      "Key Stats: 600+ LeetCode/HackerRank problems solved | 57% operational efficiency gain | 35% reduction in approval times at GSK.",
  };

  const { contextSafe } = useGSAP();

  const handleOpen = () => setIsOpen(true);

  const handleClose = contextSafe(() => {
    if (!isOpen || isAnimatingOut) return;
    setIsAnimatingOut(true);

    gsap.to(terminalBoxRef.current, {
      scale: 0.95,
      opacity: 0,
      duration: 0.2,
      ease: "power2.in",
    });

    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        setIsOpen(false);
        setIsAnimatingOut(false);
      },
    });
  });

  useGSAP(() => {
    if (isOpen && !isAnimatingOut) {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 },
      );
      gsap.fromTo(
        terminalBoxRef.current,
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.2)" },
      );
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [handleClose]);

  useEffect(() => {
    if (isOpen && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history, isOpen]);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;

      const nextIndex =
        historyIndex === -1
          ? commandHistory.length - 1
          : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(commandHistory[nextIndex] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (commandHistory.length === 0) return;

      if (historyIndex < commandHistory.length - 1) {
        const nextIndex = historyIndex + 1;
        setHistoryIndex(nextIndex);
        setInput(commandHistory[nextIndex] || "");
      } else {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  const handleCommand = (e) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    setCommandHistory((prev) => [...prev, input.trim()]);
    setHistoryIndex(-1);

    if (cmd === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    if (cmd === "exit") {
      handleClose();
      setInput("");
      return;
    }

    const response =
      commands[cmd] ||
      `Command not recognized: "${cmd}". Type "help" for a list of commands.`;
    setHistory((prev) => [
      ...prev,
      { type: "user", text: `> ${input}` },
      { type: "response", text: response },
    ]);
    setInput("");
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="fixed bottom-6 right-6 z-50 bg-white dark:bg-slate-900 border border-orange-500/30 dark:border-orange-500/50 hover:border-orange-500 text-orange-600 dark:text-orange-400 px-4 py-3 rounded-2xl shadow-lg dark:shadow-[0_0_20px_rgba(249,115,22,0.3)] flex items-center gap-3 font-mono text-xs tracking-widest backdrop-blur-md transition-all hover:scale-105 duration-500"
      >
        <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
        [COMMAND: AMIT-OS]
      </button>

      {isOpen && (
        <div
          ref={overlayRef}
          onClick={handleClose}
          className="fixed inset-0 z-[100] bg-slate-900/40 dark:bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 transition-colors duration-500"
        >
          <div
            ref={terminalBoxRef}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-3xl h-[500px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden font-mono text-sm transition-colors duration-500"
          >
            <div className="bg-slate-100 dark:bg-slate-950 px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center group/mac transition-colors duration-500">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleClose}
                  className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] flex items-center justify-center overflow-hidden"
                >
                  <span className="opacity-0 group-hover/mac:opacity-100 text-black text-[9px] font-bold leading-none mb-[1px]">
                    ✕
                  </span>
                </button>
                <button
                  onClick={() => setInput("clear")}
                  className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] flex items-center justify-center overflow-hidden"
                >
                  <span className="opacity-0 group-hover/mac:opacity-100 text-black text-[10px] font-bold leading-none mb-[1px]">
                    -
                  </span>
                </button>
                <button className="w-3.5 h-3.5 rounded-full bg-[#27c93f] flex items-center justify-center overflow-hidden cursor-default">
                  <span className="opacity-0 group-hover/mac:opacity-100 text-black text-[9px] font-bold leading-none mb-[1px]"></span>
                </button>
              </div>
              <span className="text-slate-500 dark:text-slate-400 text-xs ml-4 transition-colors duration-500">
                amit-swain@neural-core:~
              </span>
            </div>

            <div className="flex-1 p-6 overflow-y-auto space-y-3 transition-colors duration-500">
              {history.map((h, i) => (
                <div
                  key={i}
                  className={`transition-colors duration-500 ${h.type === "user" ? "text-orange-600 dark:text-orange-400 font-bold" : h.type === "system" ? "text-slate-500 dark:text-slate-500" : "text-slate-700 dark:text-slate-200 pl-4 border-l-2 border-orange-500/30"}`}
                >
                  {h.text}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            <div className="px-6 py-2 bg-slate-50 dark:bg-slate-950/50 border-t border-slate-200 dark:border-slate-800 flex gap-2 overflow-x-auto text-xs transition-colors duration-500 scrollbar-hide">
              {["about", "experience", "projects", "skills", "metrics"].map(
                (cmd) => (
                  <button
                    key={cmd}
                    onClick={() => {
                      setInput(cmd);
                    }}
                    className="px-3 py-1 bg-slate-200 dark:bg-slate-800 hover:bg-orange-500 dark:hover:bg-orange-600 text-slate-700 dark:text-slate-300 hover:text-white dark:hover:text-white rounded-md transition-colors whitespace-nowrap duration-300"
                  >
                    {cmd}
                  </button>
                ),
              )}
            </div>

            <form
              onSubmit={handleCommand}
              className="p-4 bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center gap-3 transition-colors duration-500"
            >
              <span className="text-orange-600 dark:text-orange-500 font-bold transition-colors duration-500">
                $&gt;
              </span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a command (use ↑↓ for history) or click the red dot to close..."
                className="flex-1 bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none font-mono transition-colors duration-500"
                autoFocus
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
}
