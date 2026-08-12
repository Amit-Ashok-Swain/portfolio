import React, { useRef } from "react";
import { useSelector } from "react-redux";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Certifications() {
  const container = useRef(null);
  const certifications = useSelector((state) => state.portfolio.certifications);

  useGSAP(
    () => {
      gsap.from(".cert-card", {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 85%",
        },
      });
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="py-24 px-6 sm:px-16 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 relative z-10 transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-slate-900 dark:text-white mb-4 text-center transition-colors duration-500">
          Professional <span className="text-orange-500">Authority.</span>
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-center mb-16 transition-colors duration-500">
          Industry-recognized certifications and methodologies.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, i) => (
            <div
              key={i}
              className="cert-card group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 overflow-hidden flex items-center gap-4 hover:border-orange-500/50 transition-colors duration-500 shadow-sm dark:shadow-none"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 to-orange-500/0 group-hover:from-orange-500/5 transition-colors duration-500"></div>

              <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-center shrink-0 group-hover:scale-110 transition-all duration-300">
                <svg
                  className="w-5 h-5 text-orange-600 dark:text-orange-500 transition-colors duration-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  ></path>
                </svg>
              </div>

              <div className="relative z-10">
                <h4 className="text-slate-900 dark:text-white font-bold text-sm leading-snug mb-1 transition-colors duration-500">
                  {cert.title}
                </h4>
                <p className="text-orange-600 dark:text-orange-400 text-xs font-semibold tracking-wider uppercase transition-colors duration-500">
                  {cert.issuer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
