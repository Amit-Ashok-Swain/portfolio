import React, { useRef } from "react";
import { useSelector } from "react-redux";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function TechMatrix() {
  const container = useRef(null);
  const matrix = useSelector((state) => state.portfolio.techMatrix);

  useGSAP(
    () => {
      gsap.fromTo(
        ".matrix-card",
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top 80%",
          },
        },
      );
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="py-24 px-6 sm:px-16 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 relative z-10 transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-slate-900 dark:text-white mb-16 text-center transition-colors duration-500">
          Domain{" "}
          <span className="text-orange-600 dark:text-orange-500 transition-colors duration-500">
            Expertise.
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matrix?.map((block, i) => (
            <div
              key={i}
              className="matrix-card bg-white/80 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-3xl p-8 hover:border-orange-500/50 dark:hover:border-orange-500/50 shadow-sm hover:shadow-md dark:shadow-none transition-all duration-500 group"
            >
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3 transition-colors duration-500">
                <span className="w-2 h-2 rounded-full bg-orange-600 dark:bg-orange-500 group-hover:scale-150 transition-all duration-500"></span>
                {block.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {block.items.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-lg border border-slate-200 dark:border-slate-800 shadow-inner group-hover:text-orange-600 dark:group-hover:text-orange-100 transition-colors duration-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
