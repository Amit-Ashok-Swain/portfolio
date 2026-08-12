import React, { useRef } from "react";
import { useSelector } from "react-redux";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { audio } from "../utils/audio";

gsap.registerPlugin(ScrollTrigger);

export default function Trajectory() {
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  const trajectory = useSelector((state) => state.portfolio.trajectory);

  useGSAP(
    () => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 50%",
            end: "bottom 80%",
            scrub: true,
          },
        },
      );

      const nodes = gsap.utils.toArray(".trajectory-node");
      nodes.forEach((node) => {
        gsap.from(node, {
          opacity: 0,
          x: node.classList.contains("left-node") ? -50 : 50,
          duration: 0.8,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: node,
            start: "top 70%",
            toggleActions: "play none none reverse",
            onEnter: () => audio.playMilestone(),
          },
        });
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="py-32 px-6 sm:px-16 bg-slate-50 dark:bg-slate-950 relative overflow-hidden border-t border-slate-200 dark:border-slate-900 transition-colors duration-500"
    >
      <div className="max-w-4xl mx-auto relative">
        <div className="text-center mb-24">
          <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-slate-900 dark:text-white transition-colors duration-500">
            Operational{" "}
            <span className="text-orange-600 dark:text-orange-500 transition-colors duration-500">
              Trajectory.
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-4 font-medium transition-colors duration-500">
            Academic foundations & field execution.
          </p>
        </div>

        <div className="absolute left-4 md:left-1/2 top-48 bottom-0 w-[2px] bg-slate-200 dark:bg-slate-800 -translate-x-1/2 rounded-full transition-colors duration-500"></div>

        <div
          ref={lineRef}
          className="absolute left-4 md:left-1/2 top-48 bottom-0 w-[4px] bg-gradient-to-b from-orange-500 to-orange-600 dark:from-orange-400 dark:to-orange-600 -translate-x-1/2 origin-top rounded-full shadow-[0_0_15px_rgba(249,115,22,0.4)] dark:shadow-[0_0_15px_rgba(249,115,22,0.8)]"
        ></div>

        <div className="space-y-16 relative z-10">
          {trajectory.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={index}
                className={`trajectory-node flex flex-col md:flex-row items-start md:items-center w-full ${isEven ? "md:justify-start left-node" : "md:justify-end right-node"} relative pl-12 md:pl-0`}
              >
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-orange-600 dark:bg-orange-500 -translate-x-1/2 border-4 border-slate-50 dark:border-slate-950 shadow-[0_0_10px_rgba(249,115,22,0.5)] dark:shadow-[0_0_10px_rgba(249,115,22,1)] mt-2 md:mt-0 group-hover:scale-150 transition-all duration-500"></div>

                <div
                  className={`w-full md:w-[45%] bg-white dark:bg-slate-900 border ${item.type === "education" ? "border-slate-200 dark:border-slate-700" : "border-orange-500/20 dark:border-orange-500/30"} p-8 rounded-3xl shadow-md hover:shadow-lg dark:shadow-xl hover:-translate-y-2 transition-all duration-500 cursor-pointer`}
                  onMouseEnter={() => audio.playClick()}
                >
                  <div className="text-orange-600 dark:text-orange-500 font-bold tracking-widest text-xs mb-2 uppercase transition-colors duration-500">
                    {item.year}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1 transition-colors duration-500">
                    {item.title}
                  </h3>
                  <h4 className="text-slate-700 dark:text-slate-400 font-medium mb-4 transition-colors duration-500">
                    {item.institution}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-500 text-sm leading-relaxed transition-colors duration-500">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
