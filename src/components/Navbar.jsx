import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { audio } from "../utils/audio";

export default function Navbar({ toggleTheme }) {
  const [time, setTime] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMobileMenuOpen]);

  const handleMagneticMove = (e) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(btn, { x: x * 0.4, y: y * 0.4, duration: 0.3, ease: "power3.out" });
  };

  const handleMagneticLeave = (e) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
    });
  };

  const navItems = [
    { label: "WORK", target: "work-section" },
    { label: "SYSTEM", target: "system-section" },
    { label: "CONTACT", target: "contact-section" },
  ];

  return (
    <>
      <nav className="fixed top-1 md:top-2 left-1/2 -translate-x-1/2 z-[9999] w-[92%] max-w-3xl flex items-center justify-between px-5 py-3 md:py-4 rounded-full border bg-white/70 dark:bg-slate-950/40 backdrop-blur-xl border-black/10 dark:border-white/10 transition-colors duration-500 shadow-2xl">
        <div className="flex font-mono tracking-widest items-center gap-3 z-10">
          <img
            src="/icon.svg"
            alt="Lord Jagannath"
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-orange-500/40 shadow-[0_0_12px_rgba(249,115,22,0.5)] object-cover"
          />
          <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white tracking-wider">
            AMIT_OS
          </span>
          <span className="hidden sm:inline text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 ml-1">
            // {time}
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 font-mono text-xs font-bold tracking-widest absolute left-1/2 -translate-x-1/2">
          {navItems.map((item) => (
            <button
              key={item.label}
              onMouseMove={handleMagneticMove}
              onMouseLeave={handleMagneticLeave}
              onClick={() => {
                audio.playClick();
                document
                  .getElementById(item.target)
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-4 py-2 rounded-full transition-colors hover:bg-black/5 dark:hover:bg-white/10 text-slate-800 dark:text-white"
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3 z-10">
          <button
            onClick={() => {
              audio.playClick();
              window.dispatchEvent(new CustomEvent("open-command-palette"));
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-full border border-orange-500/40 bg-orange-500/10 hover:bg-orange-500/20 text-orange-600 dark:text-orange-400 font-mono text-xs font-bold transition-all shadow-[0_0_10px_rgba(249,115,22,0.2)] active:scale-95 cursor-pointer"
            title="Open Command Palette"
          >
            <span className="text-orange-500 animate-pulse">&gt;_</span>
            <span>CMD</span>
          </button>

          {/* AUDIO TOGGLE BUTTON */}
          <button
            onClick={() => {
              const isNowMuted = audio.toggleMute();
              setIsAudioOn(!isNowMuted);
              audio.playClick();
            }}
            className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full border transition-all bg-transparent border-slate-300 text-slate-600 dark:border-slate-700 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95"
            title="Toggle Audio"
          >
            {isAudioOn ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <line x1="23" y1="9" x2="17" y2="15"></line>
                <line x1="17" y1="9" x2="23" y2="15"></line>
              </svg>
            )}
          </button>

          <button
            onClick={() => {
              audio.playClick();
              toggleTheme();
            }}
            className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full border transition-all bg-orange-500 border-orange-600 text-white dark:bg-transparent dark:border-slate-700 dark:text-orange-500 dark:hover:bg-orange-500/20 active:scale-95"
            title="Toggle Theme"
          >
            <span className="block dark:hidden text-sm">☀</span>
            <span className="hidden dark:block text-sm">☾</span>
          </button>

          <div className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full border border-slate-300 dark:border-slate-800 text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 transition-colors duration-500">
            <kbd className="font-mono text-[10px]">⌘</kbd>
            <span className="font-mono text-[10px]">K</span>
          </div>

          <button
            className="md:hidden relative w-8 h-8 flex justify-center items-center rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-colors duration-500"
            onClick={() => {
              audio.playClick();
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
          >
            <span
              className={`absolute w-3.5 h-[1.5px] bg-slate-900 dark:bg-white transition-all duration-300 ease-out ${isMobileMenuOpen ? "rotate-45" : "-translate-y-1"}`}
            ></span>
            <span
              className={`absolute w-3.5 h-[1.5px] bg-slate-900 dark:bg-white transition-all duration-300 ease-out ${isMobileMenuOpen ? "-rotate-45" : "translate-y-1"}`}
            ></span>
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-[9998] md:hidden bg-slate-50/95 dark:bg-slate-950/95 backdrop-blur-3xl flex flex-col items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${isMobileMenuOpen ? "opacity-100 pointer-events-auto scale-100" : "opacity-0 pointer-events-none scale-110"}`}
      >
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none -z-10 transition-colors duration-500"></div>

        <div className="flex flex-col items-center gap-8">
          <span
            className={`text-orange-600 dark:text-orange-500 font-mono text-[10px] tracking-[0.4em] uppercase mb-4 transition-all duration-500 delay-100 ${isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            System Navigation
          </span>

          {navItems.map((item, index) => (
            <button
              key={item.label}
              style={{
                transitionDelay: `${isMobileMenuOpen ? 200 + index * 100 : 0}ms`,
              }}
              onClick={() => {
                audio.playClick();
                setIsMobileMenuOpen(false);
                setTimeout(() => {
                  document
                    .getElementById(item.target)
                    ?.scrollIntoView({ behavior: "smooth" });
                }, 400);
              }}
              className={`text-5xl font-black uppercase tracking-tighter text-slate-900 dark:text-white transition-all duration-500 hover:text-orange-600 dark:hover:text-orange-500 ${isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
            >
              {item.label}
            </button>
          ))}

          <div
            className={`mt-16 text-slate-500 dark:text-slate-600 font-mono text-[10px] tracking-widest transition-all duration-500 delay-500 ${isMobileMenuOpen ? "opacity-100" : "opacity-0"}`}
          >
            LOCAL TIME // {time}
          </div>
        </div>
      </div>
    </>
  );
}