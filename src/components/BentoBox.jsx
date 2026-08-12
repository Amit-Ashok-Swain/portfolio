import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function BentoBox() {
  const container = useRef(null);

  useGSAP(
    () => {
      gsap.from(".bento-item", {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: container },
  );

  return (
    <section className="min-h-screen bg-slate-50 dark:bg-slate-950 py-24 px-6 sm:px-16 flex flex-col justify-center border-t border-slate-200 dark:border-slate-900 relative z-10 transition-colors duration-500">
      <div className="max-w-6xl mx-auto w-full">
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-12 transition-colors duration-500">
          Execution & <span className="text-orange-500">Impact Metrics</span>
        </h2>

        <div
          ref={container}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]"
        >
          <div className="bento-item md:col-span-2 bg-white dark:bg-gradient-to-br dark:from-slate-900 dark:to-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 flex flex-col justify-center shadow-xl relative overflow-hidden group transition-colors duration-500">
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/10 blur-[80px] rounded-full group-hover:bg-orange-500/20 transition-colors duration-700"></div>
            <h3 className="text-orange-600 dark:text-orange-500 font-bold uppercase tracking-widest text-sm mb-4">
              Strategic Execution
            </h3>
            <p className="text-2xl sm:text-3xl text-slate-700 dark:text-slate-200 font-semibold leading-snug relative z-10 transition-colors duration-500">
              Leading cross-functional teams to architect and ship{" "}
              <span className="text-slate-900 dark:text-white font-bold">
                AI platforms
              </span>
              , scale{" "}
              <span className="text-slate-900 dark:text-white font-bold">
                backend systems
              </span>
              , and drive{" "}
              <span className="text-slate-900 dark:text-white font-bold">
                agile roadmaps
              </span>
              .
            </p>
          </div>

          <div className="bento-item bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-xl transition-colors duration-500">
            <h3 className="text-6xl font-black text-green-600 dark:text-green-500 mb-2">
              57%
            </h3>
            <p className="text-slate-600 dark:text-slate-400 font-medium transition-colors duration-500">
              Increase in Operational Efficiency
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-600 mt-2 transition-colors duration-500">
              Error reduction by 87%
            </p>
          </div>

          <div className="bento-item bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-xl transition-colors duration-500">
            <h3 className="text-6xl font-black text-orange-600 dark:text-orange-500 mb-2">
              40+
            </h3>
            <p className="text-slate-600 dark:text-slate-400 font-medium transition-colors duration-500">
              Enterprise & Web3 Projects Managed
            </p>
          </div>

          <div className="bento-item md:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-center shadow-xl transition-colors duration-500">
            <h3 className="text-orange-600 dark:text-orange-500 font-bold uppercase tracking-widest text-sm mb-6">
              Delivery Acceleration
            </h3>
            <h3 className="text-5xl font-black text-slate-900 dark:text-white mb-2 transition-colors duration-500">
              100%
            </h3>
            <p className="text-slate-600 dark:text-slate-400 font-medium text-lg mb-4 transition-colors duration-500">
              Improvement in project timelines at GSK.
            </p>
            <p className="text-slate-500 dark:text-slate-500 text-xs sm:text-sm border-l-2 border-orange-500 pl-4 leading-relaxed pr-2 transition-colors duration-500">
              Streamlined approvals and reduced execution times by 35% through
              enhanced quality control, JIRA, and Agile methodologies.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
