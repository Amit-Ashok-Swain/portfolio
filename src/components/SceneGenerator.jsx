import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function SceneGenerator() {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const bgTextRefs = useRef([]);

  const scenes = [
    {
      step: "01 // INTERACTIVE CLI",
      title: "Generative Prompt Engine",
      desc: "Go ahead, execute a command. This terminal simulates the real-time websocket connections and neural processing layers I architect for AI video generation pipelines.",
      tech: ["WebSockets", "Node.js", "AI Transformers"],
      bgText: "PROMPT // 01",
      visual: (
        <div className="w-full h-full border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#0d1117] rounded-xl flex flex-col font-mono relative overflow-hidden shadow-xl dark:shadow-[0_0_40px_rgba(0,0,0,0.8)] transition-colors duration-500">
          <div className="flex items-center gap-2 bg-slate-200/80 dark:bg-slate-900/80 px-4 py-3 border-b border-slate-300 dark:border-slate-800 transition-colors duration-500">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            <span className="ml-4 text-slate-500 text-[10px] tracking-widest">
              bash - ai-engine
            </span>
          </div>

          <div
            className="flex-1 overflow-y-auto p-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400 space-y-2 scrollbar-hide transition-colors duration-500"
            id="terminal-output"
          >
            <div>
              <span className="text-emerald-600 dark:text-emerald-500 font-bold">
                amit@ai-engine:~$
              </span>{" "}
              connection established.
            </div>
            <div>
              <span className="text-emerald-600 dark:text-emerald-500 font-bold">
                amit@ai-engine:~$
              </span>{" "}
              awaiting generation parameters...
            </div>
            <div className="mt-4 text-orange-500/70 dark:text-orange-400/50 italic text-[10px] sm:text-xs">
              // Try executing a scene render request below
            </div>
          </div>

          <div className="relative border-t border-slate-300 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 transition-colors duration-500">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-600 dark:text-orange-500 font-bold">
              &gt;
            </span>
            <input
              type="text"
              placeholder="Start generating video for scene 1"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const target = e.currentTarget;
                  const val =
                    target.value.trim() || "Start generating video for scene 1";
                  target.value = "";

                  const output = document.getElementById("terminal-output");
                  if (!output) return;

                  output.innerHTML += `<div class="text-slate-900 dark:text-white mt-4 transition-colors"><span class="text-orange-600 dark:text-orange-500">&gt;</span> Executing: ${val}</div>`;
                  output.scrollTop = output.scrollHeight;

                  setTimeout(() => {
                    output.innerHTML += `<div class="text-slate-500 animate-pulse">Initializing neural pathways...</div>`;
                    output.scrollTop = output.scrollHeight;
                  }, 400);
                  setTimeout(() => {
                    output.innerHTML += `<div class="text-blue-600 dark:text-blue-400">Allocating GPU VRAM [████████░░] 80%</div>`;
                    output.scrollTop = output.scrollHeight;
                  }, 1200);
                  setTimeout(() => {
                    output.innerHTML += `<div class="text-emerald-600 dark:text-emerald-500 font-bold">✔ Video scene generation successful. Stream ready.</div>`;
                    output.scrollTop = output.scrollHeight;
                  }, 2200);
                }
              }}
              className="w-full bg-transparent py-4 pl-8 pr-4 text-slate-900 dark:text-white text-xs sm:text-sm outline-none placeholder:text-slate-400 dark:placeholder:text-slate-600 transition-colors focus:bg-slate-100 dark:focus:bg-slate-800/50"
            />
          </div>
        </div>
      ),
    },
    {
      step: "02 // SYSTEM ARCHITECTURE",
      title: "Backend & Microservices",
      desc: "Transitioning from design to logic. I architect robust Java/Spring Boot backends, configure MySQL schemas, and design the API gateways required for real-time AI generation.",
      tech: ["Spring Boot", "MySQL", "API Gateway"],
      bgText: "ARCHITECTURE // 02",
      visual: (
        <div className="w-full h-full bg-white dark:bg-[#1e1e1e] border border-slate-300 dark:border-slate-700 rounded-xl font-mono text-[10px] sm:text-xs text-slate-700 dark:text-slate-300 overflow-hidden flex flex-col relative shadow-xl dark:shadow-[0_0_40px_rgba(59,130,246,0.1)] transition-colors duration-500">
          <div className="bg-slate-100 dark:bg-[#2d2d2d] px-4 py-2 border-b border-slate-300 dark:border-black flex items-center gap-2 transition-colors duration-500">
            <span className="text-blue-500 dark:text-blue-400">⚛</span>{" "}
            <span className="text-slate-600 dark:text-slate-400">
              AIController.java
            </span>
          </div>
          <div className="flex-1 p-4 overflow-hidden relative flex">
            <div className="flex flex-col text-slate-400 dark:text-slate-600 text-right pr-4 select-none border-r border-slate-200 dark:border-slate-700 transition-colors duration-500">
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
              <span>6</span>
              <span>7</span>
              <span>8</span>
              <span>9</span>
              <span>10</span>
              <span>11</span>
            </div>
            <pre className="pl-4 overflow-hidden leading-relaxed">
              <span className="text-pink-600 dark:text-pink-500">
                @RestController
              </span>
              <br />
              <span className="text-pink-600 dark:text-pink-500">
                @RequestMapping
              </span>
              (
              <span className="text-orange-600 dark:text-orange-300">
                "/api/v1"
              </span>
              )<br />
              <span className="text-blue-600 dark:text-blue-400">
                public class
              </span>{" "}
              <span className="text-emerald-600 dark:text-emerald-300">
                AIController
              </span>{" "}
              {"{"}
              <br />
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <span className="text-pink-600 dark:text-pink-500">
                @Autowired
              </span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <span className="text-blue-600 dark:text-blue-400">
                private
              </span>{" "}
              <span className="text-emerald-600 dark:text-emerald-300">
                AIService
              </span>{" "}
              aiService;
              <br />
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <span className="text-pink-600 dark:text-pink-500">
                @PostMapping
              </span>
              (
              <span className="text-orange-600 dark:text-orange-300">
                "/video"
              </span>
              )<br />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <span className="text-blue-600 dark:text-blue-400">
                public
              </span>{" "}
              ResponseEntity&lt;?&gt; create(
              <span className="text-pink-600 dark:text-pink-500">
                @RequestBody
              </span>{" "}
              Prompt req) {"{"}
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span className="text-blue-600 dark:text-blue-400">
                return
              </span>{" "}
              ResponseEntity.ok(aiService.process(req));
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;{"}"}
              <br />
              {"}"}
            </pre>
            <div className="absolute top-[160px] left-12 right-0 h-4 bg-blue-500/10 dark:bg-blue-500/20 border-l-2 border-blue-500 dark:border-blue-400 animate-pulse pointer-events-none"></div>
          </div>
        </div>
      ),
    },
    {
      step: "03 // DEPLOYMENT & SCALE",
      title: "AWS & Production Execution",
      desc: "Shipping to production. Implementing CI/CD pipelines via GitHub Actions, containerizing via Docker, and deploying onto highly available AWS EC2 instances.",
      tech: ["AWS EC2", "Docker", "CI/CD"],
      bgText: "DEPLOYMENT // 03",
      visual: (
        <div className="w-full h-full border border-orange-500/20 dark:border-orange-500/30 bg-slate-100 dark:bg-slate-900 rounded-xl flex flex-col items-center justify-center relative overflow-hidden shadow-xl dark:shadow-[0_0_50px_rgba(249,115,22,0.15)] transition-colors duration-500">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(249,115,22,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.1)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(249,115,22,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.05)_1px,transparent_1px)] bg-[size:20px_20px] transition-colors duration-500"></div>

          <div className="relative z-10 w-24 h-24 rounded-full border border-orange-500/50 bg-orange-500/10 flex items-center justify-center backdrop-blur-sm">
            <div className="w-12 h-12 rounded-full bg-orange-500 shadow-[0_0_30px_rgba(249,115,22,0.6)] dark:shadow-[0_0_30px_rgba(249,115,22,1)] animate-pulse"></div>
            <div className="absolute inset-0 rounded-full border border-orange-500/30 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
            <div className="absolute -inset-4 rounded-full border border-orange-500/20 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite_1s]"></div>
          </div>

          <div className="absolute bottom-4 left-4 right-4 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border border-slate-300 dark:border-slate-700 rounded-lg p-3 flex justify-between items-center z-20 transition-colors duration-500">
            <div className="flex flex-col">
              <span className="text-[8px] text-slate-500 uppercase tracking-widest">
                Network Status
              </span>
              <span className="text-orange-600 dark:text-orange-400 font-mono text-xs font-bold transition-colors">
                ALL NODES ACTIVE
              </span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[8px] text-slate-500 uppercase tracking-widest">
                Latency
              </span>
              <span className="text-green-600 dark:text-green-400 font-mono text-xs font-bold transition-colors">
                12ms
              </span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  useGSAP(
    () => {
      if (!containerRef.current || !wrapperRef.current) return;

      let mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const getScrollAmount = () => {
          const wrapperWidth = wrapperRef.current
            ? wrapperRef.current.scrollWidth
            : 0;
          return Math.max(0, wrapperWidth - window.innerWidth);
        };

        const tween = gsap.to(wrapperRef.current, {
          x: () => -getScrollAmount(),
          ease: "none",
        });

        ScrollTrigger.create({
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${getScrollAmount()}`,
          animation: tween,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        });

        bgTextRefs.current.forEach((textRef) => {
          gsap.to(textRef, {
            x: 200,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              scrub: 1,
              start: "top top",
              end: () => `+=${getScrollAmount()}`,
            },
          });
        });
      });

      return () => mm.revert();
    },
    { scope: containerRef },
  );

  return (
    <section
      id="system-section"
      ref={containerRef}
      className="h-auto lg:h-screen w-full bg-slate-50 dark:bg-slate-950 overflow-hidden relative border-t border-slate-200 dark:border-slate-900 py-24 lg:py-0 transition-colors duration-500"
    >
      <div
        ref={wrapperRef}
        className="flex flex-col lg:flex-row h-full w-full lg:w-max gap-32 lg:gap-0"
      >
        {scenes.map((scene, index) => (
          <div
            key={index}
            className="w-full lg:w-screen h-auto lg:h-full flex flex-col lg:flex-row items-center justify-center px-6 sm:px-16 gap-12 lg:gap-24 relative overflow-hidden"
          >
            <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none z-0">
              <h2
                ref={(el) => (bgTextRefs.current[index] = el)}
                className="text-[14vw] font-black text-slate-200 dark:text-slate-800/20 whitespace-nowrap tracking-tighter select-none will-change-transform transition-colors duration-500"
              >
                {scene.bgText}
              </h2>
            </div>

            <div className="w-full lg:w-1/2 max-w-xl relative z-10">
              <div className="text-orange-600 dark:text-orange-500 font-mono font-bold tracking-widest text-xs sm:text-sm mb-4 transition-colors duration-500">
                {scene.step}
              </div>
              <h3 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-tight tracking-tighter transition-colors duration-500">
                {scene.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-lg leading-relaxed mb-8 transition-colors duration-500">
                {scene.desc}
              </p>

              <div className="flex gap-2 sm:gap-3 flex-wrap">
                {scene.tech.map((t, i) => (
                  <span
                    key={i}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-full text-slate-700 dark:text-slate-300 text-[10px] sm:text-xs font-medium shadow-sm dark:shadow-lg hover:border-orange-500/50 dark:hover:border-orange-500/50 transition-colors duration-500"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="w-full lg:w-[500px] h-[350px] lg:h-[450px] shrink-0 relative z-10">
              {scene.visual}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
