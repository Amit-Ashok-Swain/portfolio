import { useEffect, useRef, useState, useMemo, Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { audio } from "./utils/audio";

import Preloader from "./components/Preloader";
import NeuralCursor from "./components/NeuralCursor";
import Navbar from "./components/Navbar";
import CommandPalette from "./components/CommandPalette";
import Hero from "./components/Hero";

const Philosophy = lazy(() => import("./components/Philosophy"));
const SkillsMarquee = lazy(() => import("./components/SkillsMarquee"));
const ProjectGallery = lazy(() => import("./components/ProjectGallery"));
const SceneGenerator = lazy(() => import("./components/SceneGenerator"));
const SystemBlueprint = lazy(() => import("./components/SystemBlueprint"));
const SpatialTunnel = lazy(() => import("./components/SpatialTunnel"));
const BentoBox = lazy(() => import("./components/BentoBox"));
const TechMatrix = lazy(() => import("./components/TechMatrix"));
const Certifications = lazy(() => import("./components/Certifications"));
const Trajectory = lazy(() => import("./components/Trajectory"));
const TerminalOS = lazy(() => import("./components/TerminalOS"));
const Contact = lazy(() => import("./components/Contact"));

export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [glitchMode, setGlitchMode] = useState(false);
  const [isCmdOpen, setIsCmdOpen] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);
  const lenisRef = useRef(null);
  const cursorRef = useRef(null);

  const fullPortfolioData = useSelector((state) => state.portfolio);

  useEffect(() => {
    let originalTitle = document.title;
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = "> System Paused...";
      } else {
        document.title = originalTitle;
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  const isNight = useMemo(() => {
    const d = new Date();
    const utc = d.getTime() + d.getTimezoneOffset() * 60000;
    const ist = new Date(utc + 3600000 * 5.5);
    const hour = ist.getHours();
    return hour >= 18 || hour < 6;
  }, []);

  useEffect(() => {
    if (isLightMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, [isLightMode]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--theme-color",
      isNight ? "#0ea5e9" : "#f97316",
    );
  }, [isNight]);

  useEffect(() => {
    let keyBuffer = "";
    const handleKeydown = (e) => {
      if (e.key === "Escape") {
        setGlitchMode(false);
        return;
      }
      keyBuffer += e.key.toLowerCase();
      if (keyBuffer.length > 4) keyBuffer = keyBuffer.slice(-4);

      if (keyBuffer === "amit") {
        audio.playMilestone();
        setGlitchMode(true);
        keyBuffer = "";
      }
    };
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  useEffect(() => {
    if (!appReady || glitchMode) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });
    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, [appReady, glitchMode]);

  useGSAP(() => {
    const xTo = gsap.quickTo(cursorRef.current, "x", {
      duration: 0.2,
      ease: "power3",
    });
    const yTo = gsap.quickTo(cursorRef.current, "y", {
      duration: 0.2,
      ease: "power3",
    });
    const moveCursor = (e) => {
      xTo(e.clientX - 8);
      yTo(e.clientY - 8);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  const grainStyle = {
    position: "fixed",
    inset: 0,
    zIndex: 9997,
    pointerEvents: "none",
    opacity: 0.04,
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
  };

  return (
    <main
      className={`min-h-screen w-full overflow-x-hidden text-slate-900 bg-slate-50 dark:text-white dark:bg-slate-950 transition-colors duration-500 ${glitchMode ? "overflow-hidden h-screen" : ""}`}
    >
      {!appReady && <Preloader onComplete={() => setAppReady(true)} />}

      <CommandPalette
        isOpen={isCmdOpen}
        setIsOpen={setIsCmdOpen}
        toggleTheme={() => setIsLightMode(!isLightMode)}
      />

      {appReady && <Navbar toggleTheme={() => setIsLightMode(!isLightMode)} />}

      {glitchMode && (
        <div className="fixed inset-0 z-[100000] bg-black p-8 overflow-y-auto pointer-events-auto">
          <div className="text-green-500 font-mono text-xs sm:text-sm whitespace-pre-wrap leading-relaxed animate-pulse">
            <div className="text-red-500 mb-4">
              [SYSTEM OVERRIDE INITIATED] // GHOST_IN_MACHINE // PRESS ESC TO
              EXIT
            </div>
            {JSON.stringify(fullPortfolioData, null, 2)}
          </div>
        </div>
      )}

      <NeuralCursor isLightMode={isLightMode} />
      <div
        ref={cursorRef}
        className="custom-cursor fixed top-0 left-0 w-4 h-4 rounded-full mix-blend-multiply dark:mix-blend-screen pointer-events-none z-[99999] shadow-[0_0_15px_currentColor] hidden md:block bg-orange-600 dark:bg-orange-500 text-orange-600 dark:text-orange-500 transition-colors duration-500"
      ></div>

      <div style={grainStyle}></div>

      {appReady && (
        <a
          href="https://www.buymeacoffee.com/amitashokswain7"
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-6 left-6 z-40 flex items-center gap-2 px-3 py-3 sm:px-4 sm:py-3 bg-[#FFDD00] text-black font-bold font-sans text-sm rounded-full sm:rounded-2xl shadow-[0_0_20px_rgba(255,221,0,0.3)] hover:scale-105 hover:shadow-[0_0_30px_rgba(255,221,0,0.6)] transition-all duration-300"
        >
          <img
            src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
            alt="Buy me a coffee"
            className="w-5 h-5 sm:w-5 sm:h-5"
          />
          <span className="hidden sm:inline">Buy me a coffee</span>
        </a>
      )}

      <div
        className={`transition-opacity duration-1000 ${appReady && !glitchMode ? "opacity-100" : "opacity-0 h-screen overflow-hidden"}`}
      >
        <div className="relative z-10 bg-slate-50 dark:bg-slate-950 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-colors duration-500">
          <Hero />

          <Suspense
            fallback={
              <div className="h-32 w-full flex items-center justify-center font-mono text-xs text-orange-500 animate-pulse bg-slate-50 dark:bg-slate-950">
                [LOADING SYSTEM MODULES...]
              </div>
            }
          >
            <Philosophy />
            <SkillsMarquee />
            <ProjectGallery />
            <SceneGenerator />
            <SystemBlueprint />
            <SpatialTunnel />
            <BentoBox />
            <TechMatrix />
            <Certifications />
            <Trajectory />

            <Contact />
          </Suspense>
        </div>

        <div className="relative z-50 pointer-events-none">
          <div className="pointer-events-auto">
            <Suspense fallback={null}>
              <TerminalOS />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}