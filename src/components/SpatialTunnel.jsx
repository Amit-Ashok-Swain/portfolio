import React, { useRef } from "react";
import { useSelector } from "react-redux";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function SpatialTunnel() {
  const container = useRef(null);
  const skills = useSelector((state) => state.portfolio.skills);

  useGSAP(
    () => {
      if (!container.current) return;

      let mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          isMobile: "(max-width: 767px)",
        },
        (context) => {
          let { isMobile, isDesktop } = context.conditions;

          gsap.set(container.current, { perspective: isMobile ? 800 : 1200 });
          const items = gsap.utils.toArray(".spatial-item");

          const scrollDistance = items.length * (isMobile ? 250 : 350);

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: container.current,
              start: "top top",
              end: `+=${scrollDistance}`,
              pin: true,
              scrub: 1.5,
              anticipatePin: 1,
            },
          });

          tl.to(
            ".center-title",
            { opacity: 0, scale: 0.8, filter: "blur(10px)", duration: 0.5 },
            0,
          );

          items.forEach((item, i) => {
            const angle = i * 2.4;
            const radiusBounds = isMobile ? [120, 250] : [250, 550];
            const radius = gsap.utils.random(radiusBounds[0], radiusBounds[1]);
            const zDepth = isMobile ? 600 : 800;

            gsap.set(item, {
              x: Math.cos(angle) * radius,
              y: Math.sin(angle) * radius,
              z: -1000 - i * zDepth,
              opacity: 0,
              filter: "blur(15px)",
              scale: 0.5,
            });

            const startTime = i * 0.5;
            const duration = 2.5;

            tl.to(
              item,
              {
                z: isMobile ? 300 : 800,
                scale: 1.5,
                ease: "none",
                duration: duration,
              },
              startTime,
            );

            tl.to(
              item,
              { opacity: 1, duration: 0.6, ease: "power2.out" },
              startTime,
            );
            tl.to(
              item,
              { opacity: 0, duration: 0.4, ease: "power2.in" },
              startTime + duration - 0.4,
            );

            tl.to(
              item,
              { filter: "blur(0px)", duration: 0.8, ease: "power2.out" },
              startTime + 0.4,
            );
            tl.to(
              item,
              { filter: "blur(20px)", duration: 0.5, ease: "power2.in" },
              startTime + duration - 0.5,
            );

            if (isDesktop) {
              tl.to(
                item.querySelector(".hud-bracket-left"),
                { x: -20, opacity: 1, duration: 1, ease: "back.out(2)" },
                startTime + 0.5,
              );
              tl.to(
                item.querySelector(".hud-bracket-right"),
                { x: 20, opacity: 1, duration: 1, ease: "back.out(2)" },
                startTime + 0.5,
              );
            }
          });
        },
      );

      return () => mm.revert();
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden flex items-center justify-center relative border-t border-slate-200 dark:border-slate-900 transition-colors duration-500"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.05)_0%,transparent_70%)]"></div>

      <div className="center-title absolute z-50 text-center pointer-events-none px-6 transition-colors duration-500">
        <div className="flex items-center justify-center gap-4 mb-4 opacity-50">
          <div className="w-8 h-[1px] bg-orange-500"></div>
          <div className="w-2 h-2 border border-orange-500 rounded-full"></div>
          <div className="w-8 h-[1px] bg-orange-500"></div>
        </div>
        <h2 className="text-xl sm:text-2xl uppercase tracking-[0.5em] text-orange-600 dark:text-orange-500 font-bold mb-4 drop-shadow-[0_0_15px_rgba(249,115,22,0.4)] dark:drop-shadow-[0_0_15px_rgba(249,115,22,0.8)] transition-colors duration-500">
          System Architecture
        </h2>
        <p className="text-slate-500 dark:text-slate-400 font-mono text-xs sm:text-sm tracking-widest uppercase transition-colors duration-500">
          Initializing Knowledge Graph
        </p>
        <div className="w-2 h-2 bg-orange-500 rounded-full mx-auto mt-6 animate-ping"></div>
      </div>

      <div className="relative w-full h-full flex items-center justify-center [transform-style:preserve-3d]">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="spatial-item absolute flex flex-col items-center justify-center pointer-events-none"
          >
            <div className="text-[8px] sm:text-[10px] font-mono text-orange-600/50 dark:text-orange-500/50 mb-1 tracking-widest uppercase transition-colors duration-500">
              NODE_0x{(index * 14).toString(16).padStart(4, "0")}
            </div>

            <div className="flex items-center gap-2 sm:gap-4 relative group">
              <span className="hud-bracket-left text-orange-600 dark:text-orange-500 font-light text-2xl sm:text-5xl opacity-0 hidden md:block transition-colors duration-500">
                [
              </span>

              <span className="text-2xl sm:text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-slate-900 via-slate-600 to-slate-400 dark:from-white dark:via-slate-200 dark:to-slate-600 whitespace-nowrap drop-shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_0_20px_rgba(255,255,255,0.1)] text-center transition-colors duration-500">
                {skill}
              </span>

              <span className="hud-bracket-right text-orange-600 dark:text-orange-500 font-light text-2xl sm:text-5xl opacity-0 hidden md:block transition-colors duration-500">
                ]
              </span>
            </div>

            <div className="w-full max-w-[100px] h-[1px] bg-gradient-to-r from-transparent via-orange-500/30 to-transparent mt-2"></div>
          </div>
        ))}
      </div>
    </section>
  );
}
