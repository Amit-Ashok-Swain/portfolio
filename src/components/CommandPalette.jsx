import React, { useEffect, useState, useRef, useMemo } from "react";
import gsap from "gsap";
import { audio } from "../utils/audio";

export default function CommandPalette({ isOpen, setIsOpen, toggleTheme }) {
  const overlayRef = useRef(null);
  const modalRef = useRef(null);
  const inputRef = useRef(null);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const commands = useMemo(
    () => [
      { label: "Toggle Light/Dark Theme", action: toggleTheme, icon: "◑" },
      {
        label: "Download Resume.pdf",
        action: () => {
          const link = document.createElement("a");
          link.href = "/resume.pdf";
          link.download = "Amit_Ashok_Swain_Resume.pdf";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        },
        icon: "↓",
      },
      {
        label: "View Source Code",
        action: () =>
          window.open("https://github.com/Amit-Ashok-Swain/portfolio.git", "_blank"),
        icon: "⌨",
      },
      {
        label: "Send an Email",
        action: () =>
          (window.location.href = "mailto:amitashokswain@gmail.com"),
        icon: "✉",
      },
    ],
    [toggleTheme],
  );

  const filtered = useMemo(() => {
    return commands.filter((c) =>
      c.label.toLowerCase().includes(search.toLowerCase()),
    );
  }, [commands, search]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  useEffect(() => {
    const handleOpenCustomEvent = () => setIsOpen(true);
    window.addEventListener("open-command-palette", handleOpenCustomEvent);

    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        audio.playClick();
      }

      if (!isOpen) return;

      if (e.key === "Escape") {
        setIsOpen(false);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filtered.length - 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filtered.length > 0 && filtered[selectedIndex]) {
          filtered[selectedIndex].action();
          setIsOpen(false);
          audio.playClick();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleOpenCustomEvent);
    };
  }, [isOpen, setIsOpen, filtered, selectedIndex]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        pointerEvents: "auto",
      });
      gsap.fromTo(
        modalRef.current,
        { scale: 0.95, y: 20, opacity: 0 },
        { scale: 1, y: 0, opacity: 1, duration: 0.4, ease: "back.out(1.5)" },
      );
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "auto";
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        pointerEvents: "none",
      });
      gsap.to(modalRef.current, {
        scale: 0.95,
        y: 10,
        opacity: 0,
        duration: 0.2,
      });
      setSearch("");
    }
  }, [isOpen]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100000] bg-slate-900/30 dark:bg-black/70 backdrop-blur-md flex items-start justify-center pt-[15vh] px-4 opacity-0 pointer-events-none transition-colors duration-500"
      onClick={() => setIsOpen(false)}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-colors duration-500"
      >
        <div className="flex items-center px-4 py-4 border-b border-slate-100 dark:border-slate-800 transition-colors duration-500">
          <span className="text-orange-600 dark:text-orange-500 text-xl mr-3">
            &gt;
          </span>
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-slate-900 dark:text-white font-mono text-sm outline-none placeholder:text-slate-400 dark:placeholder:text-slate-600 transition-colors duration-500"
          />
          <button
            onClick={() => setIsOpen(false)}
            className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-slate-500 dark:text-slate-400 font-mono text-[10px] transition-colors"
          >
            ESC
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2">
          {filtered.length === 0 && (
            <div className="p-4 text-slate-400 dark:text-slate-500 font-mono text-xs transition-colors duration-500">
              No commands found.
            </div>
          )}
          {filtered.map((cmd, i) => {
            const isSelected = i === selectedIndex;
            return (
              <button
                key={i}
                onClick={() => {
                  cmd.action();
                  setIsOpen(false);
                  audio.playClick();
                }}
                onMouseEnter={() => setSelectedIndex(i)}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-left transition-colors group ${
                  isSelected
                    ? "bg-orange-500/15 dark:bg-orange-500/20 text-slate-900 dark:text-white"
                    : "hover:bg-orange-500/10 text-slate-700 dark:text-slate-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`${isSelected ? "text-orange-600 dark:text-orange-500" : "text-slate-400 dark:text-slate-500"} transition-colors`}
                  >
                    {cmd.icon}
                  </span>
                  <span className="font-medium text-sm transition-colors">
                    {cmd.label}
                  </span>
                </div>
                <span
                  className={`font-mono text-[10px] transition-opacity ${isSelected ? "opacity-150 text-orange-600 dark:text-orange-400 font-bold" : "opacity-0 group-hover:opacity-100"}`}
                >
                  EXECUTE ↵
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
