import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { audio } from "../utils/audio";

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null);
  const ringRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);
  const glitchRef = useRef(null);
  const greetingRef = useRef(null);

  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isHolding, setIsHolding] = useState(false);
  const holdTl = useRef(null);

  const greetings = [
    "HELLO",
    "नमस्ते",
    "BONJOUR",
    "HOLA",
    "こんにちは",
    "CIAO",
    "안녕하세요",
    "你好",
    "ПРИВЕТ",
    "مرحباً",
  ];

  const { contextSafe } = useGSAP({ scope: containerRef });

  useEffect(() => {
    if (isHolding || isUnlocked) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (greetingRef.current) {
        gsap.to(greetingRef.current, {
          opacity: 0,
          duration: 0.15,
          onComplete: () => {
            currentIndex = (currentIndex + 1) % greetings.length;
            if (greetingRef.current)
              greetingRef.current.innerText = greetings[currentIndex];
            gsap.to(greetingRef.current, { opacity: 0.1, duration: 0.15 });
          },
        });
      }
    }, 800);

    return () => clearInterval(interval);
  }, [isHolding, isUnlocked]);

  const scrambleText = (targetText) => {
    contextSafe(() => {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
      let iteration = 0;
      const interval = setInterval(() => {
        if (textRef.current) {
          textRef.current.innerText = textRef.current.innerText
            .split("")
            .map((letter, index) => {
              if (index < iteration) return targetText[index];
              return chars[Math.floor(Math.random() * 26)];
            })
            .join("");
        }
        if (iteration >= targetText.length) clearInterval(interval);
        iteration += 1 / 3;
      }, 30);
    })();
  };

  useGSAP(() => {
    scrambleText("AWAITING BIOMETRIC INPUT...");

    holdTl.current = gsap.timeline({
      paused: true,
      onComplete: () => {
        setIsUnlocked(true);
        executeIgnition();
      },
    });

    holdTl.current.to(
      ringRef.current,
      { strokeDashoffset: 0, duration: 1.5, ease: "power1.inOut" },
      0,
    );

    holdTl.current.to(
      buttonRef.current,
      {
        x: () => gsap.utils.random(-4, 4),
        y: () => gsap.utils.random(-4, 4),
        duration: 0.05,
        repeat: 30,
        yoyo: true,
        ease: "none",
      },
      0,
    );

    holdTl.current.to(
      textRef.current,
      { scale: 1.05, color: "#f97316", duration: 1.5 },
      0,
    );
  }, []);

  const handleDown = () => {
    contextSafe(() => {
      if (isUnlocked) return;
      setIsHolding(true);
      gsap.to(greetingRef.current, { opacity: 0, duration: 0.3 });

      audio.init();
      audio.playClick();
      scrambleText("DECRYPTING NEURAL PATHWAYS...");
      if (holdTl.current) holdTl.current.play();
    })();
  };

  const handleUp = () => {
    contextSafe(() => {
      if (isUnlocked) return;
      if (holdTl.current && holdTl.current.progress() < 1) {
        setIsHolding(false);
        holdTl.current.reverse();
        scrambleText("ACCESS DENIED. HOLD TO RETRY.");
        gsap.to(textRef.current, { color: "#ef4444", duration: 0.3 });
      }
    })();
  };

  const executeIgnition = () => {
    contextSafe(() => {
      audio.playMilestone();
      scrambleText("ROOT ACCESS GRANTED.");

      const masterTl = gsap.timeline({ onComplete: onComplete });

      masterTl
        .to(glitchRef.current, {
          opacity: 1,
          duration: 0.1,
          yoyo: true,
          repeat: 1,
        })
        .to(
          containerRef.current,
          {
            scale: 5,
            opacity: 0,
            filter: "blur(20px)",
            duration: 1.2,
            ease: "expo.in",
          },
          "+=0.3",
        );
    })();
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white overflow-hidden origin-center transition-colors duration-500 select-none"
      style={{ willChange: "transform, opacity, filter" }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.1)_0%,transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      <div className="absolute top-[25%] sm:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-4 text-center pointer-events-none z-0">
        <h1
          ref={greetingRef}
          className="text-[14vw] sm:text-[15vw] whitespace-nowrap font-black text-slate-900 dark:text-slate-100 tracking-tighter opacity-10 uppercase transition-opacity"
        >
          HELLO
        </h1>
      </div>

      <div
        ref={glitchRef}
        className="absolute inset-0 bg-white mix-blend-difference opacity-0 pointer-events-none z-50"
      ></div>

      <div className="relative z-10 flex flex-col items-center w-full px-4 mt-20 sm:mt-0">
        <div className="font-mono text-[10px] sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] flex items-center mb-16 h-8 text-slate-500 dark:text-slate-400">
          <span className="mr-2 sm:mr-4 animate-pulse text-orange-500">_</span>
          <span ref={textRef} className="w-max sm:w-[300px] text-center">
            INITIALIZING KERNEL...
          </span>
        </div>

        <div className="relative w-32 h-32 flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
            <circle
              cx="64"
              cy="64"
              r="62"
              fill="none"
              className="stroke-slate-300 dark:stroke-slate-800 transition-colors duration-500"
              strokeWidth="2"
            />
            <circle
              ref={ringRef}
              cx="64"
              cy="64"
              r="62"
              fill="none"
              stroke="#f97316"
              strokeWidth="4"
              strokeDasharray="390"
              strokeDashoffset="390"
              strokeLinecap="round"
            />
          </svg>

          <button
            ref={buttonRef}
            onPointerDown={handleDown}
            onPointerUp={handleUp}
            onPointerLeave={handleUp}
            onPointerCancel={handleUp}
            onTouchStart={handleDown}
            onTouchEnd={handleUp}
            onTouchCancel={handleUp}
            onContextMenu={(e) => e.preventDefault()}
            className={`w-24 h-24 rounded-full border border-orange-500/30 flex items-center justify-center bg-white/50 dark:bg-slate-900/50 backdrop-blur-md transition-colors hover:bg-orange-500/10 cursor-none select-none outline-none ${isUnlocked ? "pointer-events-none opacity-0" : ""}`}
            style={{
              touchAction: "none",
              WebkitTouchCallout: "none",
              WebkitUserSelect: "none",
              userSelect: "none",
            }}
          >
            <div className="w-12 h-12 rounded-full border border-orange-500/50 flex items-center justify-center animate-pulse pointer-events-none">
              <div className="w-2 h-2 rounded-full bg-orange-500 pointer-events-none"></div>
            </div>
          </button>
        </div>

        <div
          className={`mt-12 font-mono text-[10px] tracking-widest text-slate-400 dark:text-slate-500 uppercase transition-opacity text-center ${isUnlocked ? "opacity-0" : "opacity-100"}`}
        >
          [ Press & Hold to Authenticate ]
        </div>
      </div>
    </div>
  );
}
