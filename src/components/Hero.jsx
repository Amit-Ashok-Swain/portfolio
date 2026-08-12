import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { audio } from "../utils/audio";

export default function Hero() {
  const container = useRef(null);
  const nameRef = useRef(null);
  const cursorRef = useRef(null);
  const imageRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const scannerRef = useRef(null);
  const rolesRef = useRef([]);

  const [vimMode, setVimMode] = useState("-- INSERT --");
  const profile = useSelector((state) => state.portfolio.profile);

  const { contextSafe } = useGSAP({ scope: container });

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.fromTo(
        imageWrapperRef.current,
        { clipPath: "inset(100% 0% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 2, ease: "power3.inOut" },
      );

      tl.fromTo(
        scannerRef.current,
        { top: "0%", opacity: 1 },
        { top: "100%", opacity: 0, duration: 2, ease: "power3.inOut" },
        "<",
      );

      tl.fromTo(
        ".hero-image",
        { scale: 1.2, filter: "grayscale(100%) blur(10px)" },
        {
          scale: 1,
          filter: "grayscale(30%) blur(0px)",
          duration: 2.5,
          ease: "power3.out",
        },
        "-=1.8",
      );

      gsap.fromTo(
        ".orbital-card",
        { opacity: 0, scale: 0.8, y: 50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.5,
          stagger: 0.2,
          ease: "back.out(1.5)",
        },
        "-=1",
      );

      gsap.to(".orbital-card", {
        y: "-=15",
        rotationZ: "random(-2, 2)",
        duration: "random(2, 4)",
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        stagger: 0.3,
      });

      tl.add(() => {
        gsap.to(cursorRef.current, {
          opacity: 0,
          duration: 0.4,
          repeat: -1,
          yoyo: true,
          ease: "steps(1)",
        });

        const writeText = (text, baseSpeed = 70) =>
          new Promise((resolve) => {
            let i = 0;
            const interval = setInterval(
              () => {
                if (!nameRef.current) {
                  clearInterval(interval);
                  return resolve();
                }

                nameRef.current.innerText = text.substring(0, i + 1);
                if (Math.random() > 0.3) audio.playClick();

                i++;
                if (i === text.length) {
                  clearInterval(interval);
                  resolve();
                }
              },
              baseSpeed + Math.random() * 40,
            );
          });

        const deleteText = (text, speed = 30) =>
          new Promise((resolve) => {
            let i = text.length;
            const interval = setInterval(() => {
              if (!nameRef.current) {
                clearInterval(interval);
                return resolve();
              }

              nameRef.current.innerText = text.substring(0, i - 1);
              i--;
              if (i === 0) {
                clearInterval(interval);
                resolve();
              }
            }, speed);
          });

        const phrases = [
          profile.name,
          "System Architect",
          "AI Product Builder",
          "0→1 Specialist",
        ];

        (async () => {
          let currentIndex = 0;
          while (true) {
            if (!nameRef.current) break;

            const text = phrases[currentIndex % phrases.length];
            setVimMode("-- INSERT --");

            await writeText(text);

            setVimMode("NORMAL");
            await new Promise((r) => setTimeout(r, 2500));

            setVimMode("-- INSERT --");
            await deleteText(text);
            await new Promise((r) => setTimeout(r, 500));

            currentIndex++;
          }
        })();
      }, "-=1.5");

      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>[]{}";
      rolesRef.current.forEach((roleEl, index) => {
        const originalText = profile.roles[index];
        tl.to(
          roleEl,
          {
            duration: 1.5,
            onUpdate: function () {
              const progress = this.progress();
              const revealCount = Math.floor(progress * originalText.length);
              let scrambled = "";
              for (let i = 0; i < originalText.length; i++) {
                if (i < revealCount) scrambled += originalText[i];
                else
                  scrambled += chars[Math.floor(Math.random() * chars.length)];
              }
              if (roleEl) roleEl.innerText = scrambled;
            },
          },
          "-=1",
        );
      });

      tl.from(".hero-desc", { opacity: 0, y: 20, duration: 1 }, "-=0.5").from(
        ".social-link",
        { y: 20, opacity: 0, duration: 0.5, stagger: 0.1 },
        "-=0.5",
      );
    },
    { scope: container },
  );

  const handleMouseMove = contextSafe((e) => {
    if (!container.current) return;
    const rect = container.current.getBoundingClientRect();
    const localX = e.clientX - rect.left;
    const localY = e.clientY - rect.top;

    container.current.style.setProperty("--mouse-x", `${localX}px`);
    container.current.style.setProperty("--mouse-y", `${localY}px`);

    if (!imageWrapperRef.current) return;
    const x = (localX - rect.width / 2) / (rect.width / 2);
    const y = (localY - rect.height / 2) / (rect.height / 2);

    gsap.to(imageWrapperRef.current, {
      rotateY: x * 10,
      rotateX: -y * 10,
      x: x * 30,
      y: y * 30,
      ease: "power3.out",
      duration: 0.8,
      force3D: true,
    });
    gsap.to(".orbital-card", {
      x: x * -60,
      y: y * -60,
      ease: "power3.out",
      duration: 1.2,
    });
  });

  const handleMouseLeave = contextSafe(() => {
    gsap.to([imageWrapperRef.current, ".orbital-card"], {
      rotateY: 0,
      rotateX: 0,
      x: 0,
      y: 0,
      ease: "elastic.out(1, 0.3)",
      duration: 1.5,
    });
  });

  const handleAvatarHover = contextSafe(() => {
    audio.playClick();
    gsap.to(imageRef.current, {
      x: () => gsap.utils.random(-5, 5),
      filter: "grayscale(0%) contrast(150%) hue-rotate(90deg)",
      duration: 0.1,
      yoyo: true,
      repeat: 3,
      onComplete: () => {
        gsap.to(imageRef.current, {
          x: 0,
          filter: "grayscale(30%) contrast(100%) hue-rotate(0deg)",
          duration: 0.2,
        });
      },
    });
  });

  return (
    <section
      ref={container}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex min-h-screen items-center overflow-hidden px-4 sm:px-8 pt-16 lg:pt-8 pb-16 lg:pb-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-500"
      style={{
        backgroundImage:
          "radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(249,115,22,0.08), transparent 40%)",
      }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none -z-10 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)] transition-colors duration-500"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-[auto_auto] gap-8 lg:gap-16 items-center">
        <div className="flex z-20 lg:col-start-1 lg:row-start-1">
          <div className="hidden sm:flex flex-col text-slate-400 dark:text-slate-700 font-mono text-xs sm:text-lg mr-3 select-none pt-2 text-right w-5 transition-colors duration-500">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span className="text-orange-500/50 mt-3">~</span>
            <span className="text-orange-500/50">~</span>
          </div>

          <div className="flex-1 w-full overflow-hidden">
            <div className="hero-badge mb-4 inline-flex items-center rounded-full border border-orange-500/20 dark:border-orange-500/30 bg-orange-500/5 dark:bg-orange-500/10 px-3 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-orange-600 dark:text-orange-400 backdrop-blur-md transition-colors duration-500">
              <span className="mr-2 flex h-2 w-2 rounded-full bg-orange-500 animate-pulse"></span>
              {vimMode === ":wq" ? "SYSTEM SAVED" : "SYSTEM ONLINE"}
            </div>

            <div className="flex items-center mb-4 drop-shadow-2xl max-w-full">
              <span className="text-orange-500 text-xl sm:text-3xl xl:text-5xl mr-2 font-mono select-none">
                &gt;
              </span>
              <h1 className="text-xl sm:text-3xl xl:text-5xl font-black tracking-tighter text-slate-900 dark:text-white uppercase whitespace-nowrap transition-colors duration-500">
                <span ref={nameRef}></span>
                <span
                  ref={cursorRef}
                  className="inline-block w-2 sm:w-4 h-5 sm:h-10 bg-orange-500 ml-1 align-middle shadow-[0_0_15px_rgba(249,115,22,0.8)]"
                ></span>
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-2 text-xs sm:text-base font-bold font-mono text-emerald-600 dark:text-emerald-400 transition-colors duration-500">
              {profile.roles.map((role, index) => (
                <div key={index} className="flex items-center">
                  <span
                    ref={(el) => (rolesRef.current[index] = el)}
                    className="tracking-tight drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]"
                  ></span>
                  {index !== profile.roles.length - 1 && (
                    <span className="mx-2 text-slate-400 dark:text-slate-600 hidden sm:block">
                      /
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-20 [perspective:1500px] lg:col-start-2 lg:row-start-1 lg:row-span-2 my-2 lg:my-0">
          <div className="hidden sm:flex orbital-card absolute -left-6 sm:-left-10 top-6 z-30 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border border-orange-500/20 dark:border-orange-500/30 p-3 rounded-xl shadow-xl dark:shadow-[0_0_20px_rgba(249,115,22,0.15)] flex-col items-center pointer-events-none transition-colors duration-500">
            <span className="text-orange-600 dark:text-orange-500 font-mono text-[9px] mb-1">
              01 // EXECUTION
            </span>
            <span className="text-slate-900 dark:text-white font-bold text-xs">
              AI Product Builder
            </span>
          </div>

          <div className="hidden sm:flex orbital-card absolute -right-4 sm:-right-6 top-1/2 z-30 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border border-emerald-500/20 dark:border-emerald-500/30 p-3 rounded-xl shadow-xl dark:shadow-[0_0_20px_rgba(16,185,129,0.15)] flex-col items-center pointer-events-none transition-colors duration-500">
            <span className="text-emerald-600 dark:text-emerald-500 font-mono text-[9px] mb-1">
              02 // ARCHITECTURE
            </span>
            <span className="text-slate-900 dark:text-white font-bold text-xs">
              Java & Spring Boot
            </span>
          </div>

          <div className="hidden sm:flex orbital-card absolute left-8 -bottom-4 z-30 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border border-blue-500/20 dark:border-blue-500/30 p-3 rounded-xl shadow-xl dark:shadow-[0_0_20px_rgba(59,130,246,0.15)] flex-col items-center pointer-events-none transition-colors duration-500">
            <span className="text-blue-600 dark:text-blue-500 font-mono text-[9px] mb-1">
              03 // SCALE
            </span>
            <span className="text-slate-900 dark:text-white font-bold text-xs">
              AWS Cloud Ops
            </span>
          </div>

          <div
            ref={imageWrapperRef}
            onMouseEnter={handleAvatarHover}
            className="overflow-hidden rounded-[2rem] border border-slate-300 dark:border-slate-700 shadow-xl dark:shadow-[0_0_60px_rgba(0,0,0,0.8)] h-[400px] sm:h-[500px] lg:h-[620px] w-full relative z-20 bg-slate-100 dark:bg-black cursor-crosshair [transform-style:preserve-3d] transition-colors duration-500"
          >
            <div
              ref={scannerRef}
              className="absolute left-0 right-0 h-1 bg-orange-500 shadow-[0_0_20px_rgba(249,115,22,1)] z-50 pointer-events-none"
            ></div>
            <img
              ref={imageRef}
              src={profile.avatar}
              alt={profile.name}
              className="hero-image h-full w-full object-cover object-center will-change-transform"
            />
          </div>
        </div>

        <div className="flex flex-col z-20 lg:col-start-1 lg:row-start-2">
          <p className="hero-desc text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6 max-w-xl transition-colors duration-500">
            {profile.about}
          </p>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between border-t border-slate-200 dark:border-slate-800 pt-4 gap-4 transition-colors duration-500">
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              {profile.socials.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="social-link text-slate-700 dark:text-slate-300 font-bold uppercase tracking-wider text-[10px] sm:text-xs hover:text-orange-600 dark:hover:text-orange-500 transition-colors whitespace-nowrap"
                >
                  [{social.name}]
                </a>
              ))}
            </div>

            <div className="font-mono text-[10px] sm:text-xs tracking-widest text-slate-500 flex items-center justify-between lg:justify-start gap-4 bg-slate-200/80 dark:bg-slate-900/50 lg:bg-transparent dark:lg:bg-transparent px-3 py-2 lg:p-0 rounded border border-slate-300 dark:border-slate-800 lg:border-none transition-colors duration-500">
              <span className="w-28 inline-block text-left font-bold transition-colors duration-300 whitespace-nowrap">
                <span
                  className={
                    vimMode === "-- INSERT --"
                      ? "text-green-600 dark:text-green-500"
                      : vimMode === "NORMAL"
                        ? "text-blue-600 dark:text-blue-500"
                        : "text-orange-600 dark:text-orange-500"
                  }
                >
                  {vimMode}
                </span>
              </span>
              <span className="opacity-70 whitespace-nowrap">src/App.jsx</span>
              <span className="opacity-70 whitespace-nowrap">utf-8</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
